import styled from "styled-components";
import ChattingRoomItem from "./ChattingRoomItem";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";

const StyledChattingRoomListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ChattingRoomList = () => {
    return (
        <StyledChattingRoomListWrapper>
            <ChattingRoomItem participants={"홍길동"} profileImage={UserDefaultImage} lastMessage={"마지막으로 보낸 메세지입니다."} lastMessageTime={"3시간 전"} unreadCount={2}/>
        </StyledChattingRoomListWrapper>
    )
}
export default ChattingRoomList