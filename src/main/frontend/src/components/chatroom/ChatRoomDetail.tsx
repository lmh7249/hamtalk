import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomBody from "./ChatRoomBody";
import ChatRoomFooter from "./ChatRoomFooter";
import styled from "styled-components";

const StyledChatRoomDetailWrapper = styled.div`
    //border: 2px solid black;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 3px;

`

const ChatRoomDetail = () => {
    return (
        <StyledChatRoomDetailWrapper>
            <ChatRoomHeader/>
            <ChatRoomBody/>
            <ChatRoomFooter/>
        </StyledChatRoomDetailWrapper>
    )
}

export default ChatRoomDetail