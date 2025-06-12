import {ChatPageLayout} from "../styles/layouts/ChatPageLayout";
import ChatMainContainer from "../containers/ChatMainContainer";
import {useEffect, useRef} from "react";
import {connectWebSocket, disconnectWebSocket} from "../utils/websocketUtil";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {updateLastMessage} from "../store/chatRoomsSlice";
import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {UnreadCountType} from "../hooks/useUnreadCountsQuery";
import {store} from "../store";

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
    const selectedMenu = useSelector((state:RootState) => state.menu.selectedMenu);
    const isChatsTab = selectedMenu.key === "chats";
    const currentChatRoomId = useSelector((state:RootState) => state.detailContent.chatRoomId);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // ref로 최신 상태 저장
    const latestStateRef = useRef({
        selectedMenu,
        currentChatRoomId,
        isChatsTab
    });

    // 상태가 변경될 때마다 ref 업데이트
    useEffect(() => {
        latestStateRef.current = {
            selectedMenu,
            currentChatRoomId,
            isChatsTab
        };
    }, [selectedMenu, currentChatRoomId, isChatsTab]);

    const dispatchChatListUpdate = (notificationData: ChatNotificationPayload) => {
        const { selectedMenu, currentChatRoomId, isChatsTab } = latestStateRef.current;
        dispatch(updateLastMessage({
            chatRoomId: notificationData.chatRoomId,
            lastMessage: notificationData.message,
            lastMessageTime: notificationData.createdAt,
        }));
        console.log("지금 열려있는 2열 페이지는?:");
        console.log(selectedMenu);
        console.log("현채 열려있는 chatRoomId: " + currentChatRoomId);

        // 읽지 않은 메세지 실시간 업데이트
        // 조건: 내가 보낸 메세지가 아니면서 + 채팅 리스트 탭이 열려 있고 + 현재 채팅방 id가 아닌 경우만 실시간 업데이트
        if(notificationData.senderId !== loginUserId &&
            isChatsTab &&
            currentChatRoomId !== notificationData.chatRoomId) {
            queryClient.setQueryData<UnreadCountType[]>(['unreadCounts'], (old) => {
                if (!old) return [];
                return old.map((item) =>
                    item.chatRoomId === notificationData.chatRoomId
                        ? { ...item, unreadCount: item.unreadCount + 1 }
                        : item
                );
            });
        }
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