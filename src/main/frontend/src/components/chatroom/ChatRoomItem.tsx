import styled from "styled-components";
import React from "react";
import {findDirectChatRoom} from "../../services/chat-service";
import {setChatRoom, setUserProfile} from "../../store/contentDetailSlice";
import {useDispatch, useSelector} from "react-redux";
import {formatLastMessageTime} from "../../utils/formatTime";
import {RootState} from "../../store";

const StyledChattingRoomItem = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px 10px 0;
    // 드래그 방지
    user-select: none;
    justify-content: space-between;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border-radius: 50%;
    width: 60px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 60px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
`;

const ChatMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-overflow: ellipsis; // 잘린 부분에 ... 표시
    
    white-space: nowrap; // 텍스트를 줄바꿈하지 않게 만듦 (한 줄로 고정)
    max-width: 180px;
`;

const MessageMetaInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

`;

const ChatRoomName = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const LastMessage = styled.span`
    font-size: 14px;
    color: #666;
`;

const LastMessageTime = styled.span`
    font-size: 12px;
    color: #999;
`;

const UnreadCount = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    font-size: 12px;
    font-weight: bold;
    color: white;
    width: 18px;
    border-radius: 50%;
`;

const ImageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px black solid;
    border-radius: 50%;
    height: 60px;
`;

interface ChattingRoomItemProps {
    chatRoomId: number;
}

const ChatRoomItem = ({chatRoomId}: ChattingRoomItemProps) => {
    const dispatch = useDispatch();
    const chatRoom = useSelector((state: RootState) => state.chatRooms.chatRooms.find(room => room.chatRoomId === chatRoomId));
    const maxLength: number = 14;

    if (!chatRoom) return null;

    // 채팅방 이름이 설정되어 있으면 그대로 사용하고, 설정되어 있지 않으면 참여자들의 이름을 합침
    const chatRoomName = chatRoom.chatRoomName
        ? chatRoom.chatRoomName // 채팅방 이름이 설정되어 있으면 그대로 사용
        : chatRoom.participants.map(participant => participant.nickname).join(", "); // 참여자들 이름 합치기



    const displayLastMessage = chatRoom.lastMessage && chatRoom.lastMessage.length > maxLength
        ? `${chatRoom.lastMessage.slice(0, maxLength)}...`
        : chatRoom.lastMessage ?? "";

    const handleChatRoomDoubleClick = async () => {
        dispatch(setChatRoom({
            chatRoomId: chatRoomId,
            creatorId: chatRoom.creatorId,
            //TODO: null or undefined일 경우, 오른쪽 값 반환.
            chatRoomName: chatRoom.chatRoomName,
            friendId: chatRoom.participants[0].userId,
            chatRoomImageUrl: chatRoom.participants[0].profileImageUrl,
        }));
    }
    //TODO: userId가 배열로 들어올 때를 대비한 코드가 필요함.
    const handleProfileImageClick = (e: React.MouseEvent) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        // alert(participantIds);
        dispatch(setUserProfile({userId: chatRoom.participants[0].userId}));
    }

    return (

        <StyledChattingRoomItem
            onDoubleClick={() => handleChatRoomDoubleClick()}>
            <div style={{display: "flex", gap: "10px"}}>
                <ImageWrapper onClick={(e: React.MouseEvent) => handleProfileImageClick(e)}>
                    <StyledImage src={chatRoom.participants[0].profileImageUrl ?? undefined} alt={"채팅방 이미지"}></StyledImage>
                </ImageWrapper>

                <ChatMainInfo>
                    <ChatRoomName>{chatRoomName}</ChatRoomName>
                    <LastMessage>{displayLastMessage}</LastMessage>
                </ChatMainInfo>
            </div>

            <MessageMetaInfo>
                <LastMessageTime> {chatRoom.lastMessageTime ? formatLastMessageTime(chatRoom.lastMessageTime) : ""}</LastMessageTime>
                {/*{unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}*/}
            </MessageMetaInfo>

        </StyledChattingRoomItem>
    )
}


export default ChatRoomItem