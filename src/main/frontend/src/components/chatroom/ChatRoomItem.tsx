import styled from "styled-components";
import React from "react";
import {findDirectChatRoom} from "../../services/chat-service";
import {setChatRoom, setUserProfile} from "../../store/contentDetailSlice";
import {useDispatch} from "react-redux";
import {formatLastMessageTime} from "../../utils/formatTime";

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
`

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border-radius: 50%;
    width: 50px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 50px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
    padding: 3px;
`;

const ChatMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    padding: 3px;
    height: 50px;
`;

interface ChattingRoomItemProps {
    chatRoomName: string;
    chatRoomId: number;
    creatorId: number;
    profileImage: string | null;
    lastMessage: string;
    lastMessageTime: string;
    //TODO: 추후에 Date로 바꿀지 고민
    unreadCount: number;
    participantIds: number[];
}

const ChatRoomItem = ({
                          chatRoomName,
                          chatRoomId,
                          creatorId,
                          profileImage,
                          lastMessage,
                          lastMessageTime,
                          unreadCount,
                          participantIds
                      }: ChattingRoomItemProps) => {
    const dispatch = useDispatch();

    const handleChatRoomDoubleClick = async (chatRoomId: number, chatRoomName: string, participantIds: number[], creatorId: number) => {

        alert(chatRoomId);

        dispatch(setChatRoom({
            chatRoomId: chatRoomId,
            creatorId: creatorId,
            //TODO: null or undefined일 경우, 오른쪽 값 반환.
            chatRoomName: chatRoomName,
            friendId: participantIds[0]
        }));
    }

    //TODO: userId가 배열로 들어올 때를 대비한 코드가 필요함.
    const handleProfileImageClick = (e: React.MouseEvent, participantIds: number) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        alert(participantIds);
        dispatch(setUserProfile({userId: participantIds}));
    }

    return (
        <StyledChattingRoomItem onDoubleClick={() => handleChatRoomDoubleClick(chatRoomId, chatRoomName, participantIds, creatorId)}>
            <div style={{display: "flex", gap: "5px"}}>
            <ImageWrapper onClick={(e: React.MouseEvent) => handleProfileImageClick(e, participantIds[0])}>
                <StyledImage src={profileImage} alt={"채팅방 이미지"}></StyledImage>
            </ImageWrapper>
                <ChatMainInfo>
                    <ChatRoomName>{chatRoomName}</ChatRoomName>
                    <LastMessage>{lastMessage}</LastMessage>
                </ChatMainInfo>
            </div>

                <MessageMetaInfo>
                    <LastMessageTime>{formatLastMessageTime(lastMessageTime)}</LastMessageTime>
                    {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
                </MessageMetaInfo>

        </StyledChattingRoomItem>
    )
}


export default ChatRoomItem