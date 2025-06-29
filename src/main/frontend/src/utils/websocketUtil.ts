import SockJS from 'sockjs-client';
import {Client} from "@stomp/stompjs";
import {ChatNotificationPayload} from "../pages/ChatMainPage";

let stompClient: Client | null = null;
const heartbeatInterval = Number(process.env.REACT_APP_WEBSOCKET_HEARTBEAT) || 10000;

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
            Authorization: `Bearer ${token}`
        },

        // 디버그 로그
        debug: () => {
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
        },

        // 서버가 ERROR Frame 보낼 때
        onStompError: (frame) => {
            console.error('STOMP Error Frame:', frame);
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
export const subscribeToChatRoom = (chatRoomId: number, callback: (message: any) => void) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. 채팅방 구독 실패");
        return;
    }
    const subscription = stompClient.subscribe(`/topic/chat/${chatRoomId}`, (message: any) => {
        const receivedMessage = JSON.parse(message.body);
        callback(receivedMessage);
        console.log("새로운 메시지:", receivedMessage);
    });
    console.log(`구독 시작: /topic/chat/${chatRoomId}`);
    return subscription;
}

// 3. 채팅방 구독 해제 함수
export const unsubscribeFromChatRoom = (subscription: any) => {
    if (subscription) {
        subscription.unsubscribe();
        console.log('채팅방 구독 해제 완료');
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

export const enterChatRoom = (chatRoomId: number, nickname: string) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. enterChatRoom 호출 실패");
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

export const exitChatRoom = (chatRoomId: number, nickname: string) => {
    if (!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. exitChatRoom 호출 실패");
        return;
    }
    const enterRequest = {
        nickname: nickname
    };

    stompClient.publish({
        destination: `/app/chat/${chatRoomId}/exit`,
        headers: {},
        body: JSON.stringify(enterRequest)
    });
}
