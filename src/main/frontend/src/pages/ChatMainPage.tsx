import {ChatPageLayout} from "../styles/layouts/ChatPageLayout";
import ChatMainContainer from "../containers/ChatMainContainer";
import {useEffect} from "react";
import {connectWebSocket, disconnectWebSocket} from "../utils/websocketUtil";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {updateLastMessage} from "../store/chatRoomsSlice";

export type ChatNotificationPayload = {
    chatRoomId: number;
    createdAt: string; // ISO 문자열
    message: string;
    messageId: string;
    profileImageUrl: string;
    receiverId: number;
    senderId: number;
    senderNickName: string;
};

const ChatMainPage = () => {
    const webSocketConnectUrl = process.env.REACT_APP_WS_URL;
    const accessToken = localStorage.getItem("accessToken");
    const loginUserId = useSelector((state:RootState) => state.user.id);
    const dispatch = useDispatch();

    const dispatchChatListUpdate = (notificationData: ChatNotificationPayload) => {
        dispatch(updateLastMessage({
            chatRoomId: notificationData.chatRoomId,
            lastMessage: notificationData.message,
            lastMessageTime: notificationData.createdAt,
        }));
    }

    // 로그인 성공 시, 웹소켓 최초 연결
    useEffect(() => {
        if (webSocketConnectUrl && accessToken) {
            if(loginUserId == null) {
                // 리덕스에 로그인 userId 값이 없을 경우 처리 로직.
                return;
            }
            connectWebSocket(webSocketConnectUrl, accessToken, loginUserId, dispatchChatListUpdate);
        }

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            disconnectWebSocket();
        }

    }, []);

    return (
        <ChatPageLayout>
            <ChatMainContainer/>
        </ChatPageLayout>
    )
}

export default ChatMainPage