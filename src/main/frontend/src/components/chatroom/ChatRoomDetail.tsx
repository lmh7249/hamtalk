import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomBody from "./ChatRoomBody";
import ChatRoomFooter from "./ChatRoomFooter";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const StyledChatRoomDetailWrapper = styled.div`
    //border: 2px solid black;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 3px;
`;

const ChatRoomDetail = () => {
    const chatRoomData = useSelector((state: RootState) => state.detailContent.payload);
    return (
        <StyledChatRoomDetailWrapper>
            <ChatRoomHeader/>
            {chatRoomData.chatRoomId}
            <ChatRoomBody/>
            <ChatRoomFooter/>
        </StyledChatRoomDetailWrapper>
    )
}

export default ChatRoomDetail