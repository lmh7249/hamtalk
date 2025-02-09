import styled from "styled-components";
import ChatRoomItem from "./ChatRoomItem";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ChatRoomList = () => {
    return (
        <StyledChattingRoomListWrapper>
            <ChatRoomItem participants={"홍길동"} profileImage={UserDefaultImage} lastMessage={"마지막으로 보낸 메세지입니다."} lastMessageTime={"3시간 전"} unreadCount={2}/>
        </StyledChattingRoomListWrapper>
    )
}
export default ChatRoomList