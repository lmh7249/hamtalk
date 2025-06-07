
import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {ChatNotificationPayload} from "../pages/ChatMainPage";

let stompClient: any = null;

// 1. 웹소켓 연결
export const connectWebSocket = (url: string, token: string | null, userId: number, dispatchChatListUpdate: (notificationData: ChatNotificationPayload) => void) => {
    const socket = new SockJS(url); // 웹소켓 서버의 엔드포인트 설정
    stompClient = Stomp.over(socket);

    // stomp 연결 설정, stomp 단계에서만 액세스토큰을 헤더로 담고 있음(http로 넘기는게 아님).
    stompClient.connect(
        { Authorization: `Bearer ${token}` }, // 헤더에 Authorization 토큰 추가
        (frame: string) => {
            console.log('Connected: ' + frame);
            // 연결 성공 시 loginUserId로 전역 알림 구독
            subscribeToChatListNotifications(userId, (notificationData) => {
                dispatchChatListUpdate(notificationData);
                // console.log('알림 데이터 받았어요~:', notificationData);
            });
        },
        (error: string) => {
            console.error('웹소켓 연결 에러: ', error);
        }
    );
};

// 2. 채팅방 구독 함수
export const subscribeToChatRoom = (chatRoomId: number, callback: (message: any) => void) => {
  if(!stompClient || !stompClient.connected) {
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
export const sendChatMessageViaSocket  = (chatRoomId: number, message: string, receiverId: number) => {
    if(!stompClient || !stompClient.connected) {
        console.error("웹소켓 연결 안되어있어요. 채팅방 구독 실패");
        return;
    }

    // 서버가 기대하는 요청 형태(ChatMessageRequest DTO에 맞춤)
    const chatMessageRequest = {
        message: message,
        receiverId: receiverId
    };

    // 메시지 전송
    stompClient.send(
        `/app/chat/${chatRoomId}/sendMessage`, // 서버의 @MessageMapping("/chat/{chatRoomId}/sendMessage")와 일치해야 함
        {}, // 필요한 경우 토큰을 헤더에 포함 가능
        JSON.stringify(chatMessageRequest) // 서버에서 처리 가능한 JSON 형태로 변환
    );
    console.log("메시지 전송:", chatMessageRequest);
}

// 5. 전역 알림 구독(상대방이 보낸 메세지를 채팅방 리스트에 마지막 메세지로 실시간 표출)
// connectWebSocket에서만 사용하기에,
const subscribeToChatListNotifications = (userId: number, callback: (data:any) => void) => {
    if(!stompClient || !stompClient.connected) {
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
    if(stompClient) {
        stompClient.disconnect(() => {
            console.log('웹소켓 연결 해제');
        })
    }
};