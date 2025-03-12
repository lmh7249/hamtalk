import styled from "styled-components";
import ChatRoomItem from "./ChatRoomItem";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import {ChatRoom} from "../chat/ContentList";
import React from "react";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface ChatRoomListProps {
    chatRooms: ChatRoom[];
}


const ChatRoomList: React.FC<ChatRoomListProps> = ({chatRooms}) => {
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
                            chatRoomName={chatRoomName}  // 수정된 채팅방 이름 사용
                            profileImage={UserDefaultImage}
                            lastMessage={"마지막으로 보낸 메세지입니다."}
                            lastMessageTime={"3시간 전"}
                            unreadCount={2}
                        />
                    );
                })
                : <p>채팅을 시작해보세요.</p>
            }
        </StyledChattingRoomListWrapper>
    )
}
export default ChatRoomList