import SockJS from 'sockjs-client';
import {Client} from "@stomp/stompjs";
import {ChatNotificationPayload} from "../pages/ChatMainPage";
import {jwtDecode} from "jwt-decode";
import {refreshToken} from "./auth";

let stompClient: Client | null = null;
const heartbeatInterval = Number(process.env.REACT_APP_WEBSOCKET_HEARTBEAT) || 10000;

// 현재 구독 중인 채팅방 목록을 기억할 저장소
// 채팅방 ID(number)를 key로 해서 구독 정보(콜백 함수, 구독 객체)를 쉽게 저장
let activeChatRoomSubscriptions = new Map<number, { callback: (message: any) => void, subscription: any }>();

// 1. 웹소켓 연결
export const connectWebSocket = (url: string, token: string | null, userId: number, dispatchChatListUpdate: (notificationData: ChatNotificationPayload) => void) => {
    // 만약 이미 stompClient가 존재하고 활성화 상태(connected)라면,
    // 중복으로 연결을 시도하는 것을 막기 위해 함수를 바로 종료한다.
    if (stompClient && stompClient.connected) {
        console.log("이미 웹소켓이 연결되어 있습니다.");
        return;
    }

    stompClient = new Client({
        // SockJS 생성 팩토리
        webSocketFactory: () => new SockJS(url),

        // 헤더 설정
        connectHeaders: {
            // Authorization: `Bearer ${token}`
        },

        beforeConnect: async () => {
            console.log(" [WebSocket] 연결 시도 전, 토큰 유효성 검사...");
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                console.warn("❌ [WebSocket] 액세스 토큰이 없어 연결을 중단합니다.");
                stompClient?.deactivate();
                return;
            }
            try {
                const decodedToken: { exp: number } = jwtDecode(accessToken);
                console.log("디코딩한 jwt 유효기간: {}", decodedToken);
                const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

                if (isTokenExpired) {
                    console.log("⏳ [WebSocket] 액세스 토큰이 만료되어 재발급을 시도합니다.");
                    const newAccessToken = await refreshToken(); // 2단계에서 만든 함수 호출

                    if (newAccessToken && stompClient) {
                        stompClient.connectHeaders['Authorization'] = `Bearer ${newAccessToken}`;
                    } else {
                        console.error("❌ [WebSocket] 토큰 재발급 실패. 연결을 중단하고 로그아웃 처리합니다.");
                        stompClient?.deactivate();

                        // 기존 customFetch의 실패 로직과 동일하게 처리
                        localStorage.removeItem("accessToken");
                        alert("로그인이 만료되었어요. 다시 로그인해주세요.");
                        window.location.href = "/login";
                    }
                } else {
                    console.log("👍 [WebSocket] 토큰이 유효합니다. 연결을 계속합니다.");
                    if (stompClient) {
                        stompClient.connectHeaders['Authorization'] = `Bearer ${accessToken}`;
                    }
                }
            } catch (error) {
                console.error("❌ [WebSocket] 토큰 디코딩 중 에러 발생", error);
                stompClient?.deactivate();
            }
        },
        // 디버그 로그 -> 해당 코드가 없으면 하트비트 로그가 계속 찍힘.
        debug: (str) => {
            // 타임스탬프와 함께 찍으면 더 보기 좋아요.
            console.log(new Date(), str);
        },
        // 하트비트
        heartbeatIncoming: heartbeatInterval,
        heartbeatOutgoing: heartbeatInterval,

        // 자동 재연결 딜레이(ms)
        reconnectDelay: 5000,

        // 연결 성공
        onConnect: (frame) => {
            console.log('Connected: ', frame);

            // 구독
            subscribeToChatListNotifications(userId, (notificationData) => {
                dispatchChatListUpdate(notificationData);
            });
            // 👇 [추가] 저장된 채팅방 목록을 보고 자동으로 재구독합니다.
            console.log('🔌 재연결 성공. 이전 채팅방 구독 상태를 복원합니다...');
            activeChatRoomSubscriptions.forEach((subInfo, chatRoomId) => {
                const newSubscription = stompClient?.subscribe(`/topic/chat/${chatRoomId}`, (message: any) => {
                    const receivedMessage = JSON.parse(message.body);
                    // 이전에 사용했던 동일한 콜백 함수를 다시 사용합니다.
                    subInfo.callback(receivedMessage);
                });
                // 저장소의 구독 객체를 새로운 것으로 교체해줍니다.
                subInfo.subscription = newSubscription;
                console.log(`🔄 [재구독 완료] /topic/chat/${chatRoomId}`);
            });
        },
        // 서버가 ERROR Frame 보낼 때
        onStompError: (frame) => {
            console.error('🔴 STOMP 에러 발생! 서버가 보낸 메시지:', frame.headers['message']);
            console.error('🔴 전체 에러 헤더:', frame.headers);
            console.error('🔴 에러 프레임 전체 내용:', frame);
        },

        // 소켓 자체 오류
        onWebSocketError: (evt) => {
            console.error('WebSocket error:', evt);
        },

        // 소켓 끊겼을 때 (reconnectDelay 있으면 자동 재연결)
        onWebSocketClose: () => {
            console.warn('WebSocket closed');
        }
    });
    // 연결 시작
    stompClient.activate();
};

// 2. 채팅방 구독 함수
export const subscribeToChatRoom = (chatRoomId: number, callback: (message: any) => void, onSubscribed?: () => void) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. 채팅방 구독 실패");
        return;
    }

    // 이미 구독 중이면 중복 실행 방지
    if (activeChatRoomSubscriptions.has(chatRoomId)) {
        console.log(`이미 구독 중인 채팅방입니다: ${chatRoomId}`);
        // 이미 구독 중이어도, 입장 처리를 위해 콜백을 실행해 줄 수 있다.
        if (onSubscribed) {
            onSubscribed();
        }
        return;
    }

    const subscription = stompClient.subscribe(`/topic/chat/${chatRoomId}`, (message: any) => {
            const receivedMessage = JSON.parse(message.body);
            callback(receivedMessage);
            console.log("새로운 메시지:", receivedMessage);
        });

    // 구독 정보를 저장소에 기억
    activeChatRoomSubscriptions.set(chatRoomId, {callback, subscription});
    console.log(`구독 시작: /topic/chat/${chatRoomId}`);
    if (onSubscribed) {
        onSubscribed();
    }
}

// 3. 채팅방 구독 해제 함수
export const unsubscribeFromChatRoom = (chatRoomId: number) => {
    // [수정] 저장소에서 구독 정보를 찾기
    if (activeChatRoomSubscriptions.has(chatRoomId)) {
        const subInfo = activeChatRoomSubscriptions.get(chatRoomId);
        subInfo?.subscription.unsubscribe(); // 실제 STOMP 구독 해제

        // 👇 [추가] 저장소에서 지우기.
        activeChatRoomSubscriptions.delete(chatRoomId);
        console.log(`✅ unsubscribeFromChatRoom 함수 호출: ${chatRoomId}`);
    }
};


// 4. 메세지 전송 함수
export const sendChatMessageViaSocket = (chatRoomId: number, message: string, receiverId: number) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. 채팅방 구독 실패");
        return;
    }

    // 서버가 기대하는 요청 형태(ChatMessageRequest DTO에 맞춤)
    const chatMessageRequest = {
        message: message,
        receiverId: receiverId
    };

    // 메시지 전송
    stompClient.publish({
        destination: `/app/chat/${chatRoomId}/sendMessage`, // 서버의 @MessageMapping("/chat/{chatRoomId}/sendMessage")와 일치해야 함
        headers: {}, // 필요한 경우 토큰을 헤더에 포함 가능
        body: JSON.stringify(chatMessageRequest) // 서버에서 처리 가능한 JSON 형태로 변환
    });
    console.log("메시지 전송:", chatMessageRequest);
}

// 5. 전역 알림 구독(상대방이 보낸 메세지를 채팅방 리스트에 마지막 메세지로 실시간 표출)
// connectWebSocket에서만 사용하기에,
const subscribeToChatListNotifications = (userId: number, callback: (data: any) => void) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결이 안되어있어요. 전역 알림 구독 실패");
        return;
    }
    const subscription = stompClient.subscribe(`/topic/user/${userId}/chat-notifications`, (message: any) => {
        const notificationData = JSON.parse(message.body);
        callback(notificationData);  // 예: { chatRoomId, message, timestamp }
        //console.log("채팅 리스트 알림 수신:", notificationData);
    });
    console.log(`전역 채팅방 리스트 알림 구독 시작: /topic/user/${userId}/chat-notifications`);
    return subscription;
};

// 6. 웹소켓 해제
export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate().then(() => {
            console.log('웹소켓 연결 해제 완료');
        });
    }
};

export const publishEnterMessage = (chatRoomId: number, nickname: string) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. publishEnterMessage 호출 실패");
        return;
    }
    const enterRequest = {
        nickname: nickname
    };

    stompClient.publish({
        destination: `/app/chat/${chatRoomId}/enter`,
        headers: {},
        body: JSON.stringify(enterRequest)
    });
}

export const publishExitMessage = (chatRoomId: number, nickname: string) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. exitChatRoom 호출 실패");
        return;
    }
    const exitRequest = {
        nickname: nickname
    };

    stompClient.publish({
        destination: `/app/chat/${chatRoomId}/exit`,
        headers: {},
        body: JSON.stringify(exitRequest)
    });
}
