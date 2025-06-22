import styled from "styled-components";
import ChatRoomItem from "./ChatRoomItem";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useUnreadCountsQuery} from "../../hooks/useUnreadCountsQuery";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ChatRoomList = () => {
    const chatRoomList = useSelector((state: RootState) => state.chatRooms.chatRooms);
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const {data: unreadCounts = [], isLoading, error} = useUnreadCountsQuery();
    const currentChatRoomId = useSelector((state: RootState) => state.detailContent.chatRoomId); // 추가

    const filteredChatRooms = chatRoomList.filter(chatRoom => {
        const roomName = chatRoom.chatRoomName || "";
        const participants = (chatRoom.participants || [])
            .map(p => p.nickname || "") // 닉네임만 추출
            .join(", ");
        const target = (roomName + participants).toLowerCase();
        return target.includes(keyword.toLowerCase());
    });

    const unreadMap = useMemo(() => {
        const map = new Map();
       unreadCounts?.forEach(item => {
           const unreadCount = item.chatRoomId === currentChatRoomId ? 0 : item.unreadCount;
           map.set(item.chatRoomId, unreadCount);
       });
       return map;
    }, [unreadCounts, currentChatRoomId]);

    return (
        <>
            <div> 채팅방 {filteredChatRooms.length} </div>
            <StyledChattingRoomListWrapper>
                {filteredChatRooms.length > 0 ?
                    filteredChatRooms.map((chatRoom) => {
                        return (
                            <ChatRoomItem
                                key={chatRoom.chatRoomId}
                                chatRoomId={chatRoom.chatRoomId}
                                unreadCount={unreadMap.get(chatRoom.chatRoomId) || 0}
                            />
                        );
                    })
                    : <p>채팅을 시작해보세요.</p>
                }
            </StyledChattingRoomListWrapper>
        </>
    )
}
export default ChatRoomList