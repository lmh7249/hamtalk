import styled from "styled-components";

const StyledChattingRoomItem = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;

    &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
`

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border: 1px black solid;
    border-radius: 50%;
    width: 60px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 60px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
    padding: 3px;
`

const ChattingRoomInfoText = styled.div`
    display: flex;

`

const ChatMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const MessageMetaInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    
`

const ParticipantName = styled.span`
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

interface ChattingRoomItemProps {
    participants: string;
    profileImage: string;
    lastMessage: string;
    lastMessageTime: string;
    //TODO: 추후에 Date로 바꿀지 고민
    unreadCount: number;
}

const ChatRoomItem = ({
                              participants,
                              profileImage,
                              lastMessage,
                              lastMessageTime,
                              unreadCount
                          }: ChattingRoomItemProps) => {
    return (
        <StyledChattingRoomItem>
            <StyledImage src={profileImage} alt={"채팅방 이미지"}></StyledImage>
            <ChattingRoomInfoText>
                <ChatMainInfo>
                    <ParticipantName>{participants}</ParticipantName>
                    <LastMessage>{lastMessage}</LastMessage>
                </ChatMainInfo>
                <MessageMetaInfo>
                    <LastMessageTime>{lastMessageTime}</LastMessageTime>
                    <UnreadCount>{unreadCount}</UnreadCount>
                </MessageMetaInfo>
            </ChattingRoomInfoText>
        </StyledChattingRoomItem>
    )
}


export default ChatRoomItem