import styled from "styled-components";
import ChatRoomItem from "./ChatRoomItem";
import {ChatRoom} from "../chat/ContentList";
import React, {useEffect, useState} from "react";
import {getUnreadMessageCount} from "../../services/chat-service";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ChatRoomList = () => {
    const [unreadCounts, setUnreadCounts] = useState<{ [chatRoomId: number]: number }>({});
    const chatRoomList = useSelector((state: RootState) => state.chatRooms.chatRooms);
    const keyword = useSelector((state: RootState) => state.search.keyword);

    const filteredChatRooms = chatRoomList.filter(chatRoom => {
        const roomName = chatRoom.chatRoomName || "";
        const participants = (chatRoom.participants || [])
            .map(p => p.nickname || "") // 닉네임만 추출
            .join(", ");
        const target = (roomName + participants).toLowerCase();
        return target.includes(keyword.toLowerCase());
    });

    useEffect(() => {
        const fetchUnreadCounts = async () => {
            const counts: { [chatRoomId: number]: number } = {};

            await Promise.all(chatRoomList.map(async (chatRoom) => {
                try {
                    const response = await getUnreadMessageCount(chatRoom.chatRoomId);
                    counts[chatRoom.chatRoomId] = response ?? 0;
                } catch (error) {
                    console.error("읽지 않은 메시지 수 불러오기 실패", error);
                    counts[chatRoom.chatRoomId] = 0; // 실패 시 0으로 처리
                }
            }));
            setUnreadCounts(counts);
        };

        if (chatRoomList.length > 0) {
            fetchUnreadCounts();
        }
    }, [chatRoomList]);

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