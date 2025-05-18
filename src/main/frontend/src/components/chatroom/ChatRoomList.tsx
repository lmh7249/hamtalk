import styled from "styled-components";
import ChatRoomItem from "./ChatRoomItem";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import {ChatRoom} from "../chat/ContentList";
import React, {useEffect, useState} from "react";
import {getUnreadMessageCount} from "../../services/chat-service";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface ChatRoomListProps {
    chatRooms: ChatRoom[];
}


const ChatRoomList: React.FC<ChatRoomListProps> = ({chatRooms}) => {
    const [unreadCounts, setUnreadCounts] = useState<{ [chatRoomId: number]: number }>({});

    useEffect(() => {
        const fetchUnreadCounts = async () => {
            const counts: { [chatRoomId: number]: number } = {};

            await Promise.all(chatRooms.map(async (chatRoom) => {
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

        if (chatRooms.length > 0) {
            fetchUnreadCounts();
        }

    }, [chatRooms]);


    return (
        <StyledChattingRoomListWrapper>
            {chatRooms.length > 0 ?
                chatRooms.map((chatRoom) => {
                    // 채팅방 이름이 설정되어 있으면 그대로 사용하고, 설정되어 있지 않으면 참여자들의 이름을 합침
                    const chatRoomName = chatRoom.chatRoomName
                        ? chatRoom.chatRoomName // 채팅방 이름이 설정되어 있으면 그대로 사용
                        : chatRoom.participants.map(participant => participant.nickname).join(", "); // 참여자들 이름 합치기

                    return (
                        <ChatRoomItem
                            key={chatRoom.chatRoomId}
                            chatRoomId ={chatRoom.chatRoomId}
                            chatRoomName={chatRoomName}  // 수정된 채팅방 이름 사용
                            creatorId={chatRoom.creatorId}
                            profileImage={chatRoom.participants[0].profileImageUrl}
                            lastMessage={chatRoom.lastMessage}
                            lastMessageTime={chatRoom.lastMessageTime}
                            unreadCount={unreadCounts[chatRoom.chatRoomId] ?? 0}
                            participantIds={chatRoom.participants.map(participant => participant.userId)}
                        />
                    );
                })
                : <p>채팅을 시작해보세요.</p>
            }
        </StyledChattingRoomListWrapper>
    )
}
export default ChatRoomList