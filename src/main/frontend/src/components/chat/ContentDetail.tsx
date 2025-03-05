import styled from "styled-components";
import EmptyContentDetail from "./EmptyContentDetail";
import UserProfileDetail from "../profile/UserProfileDetail";
import ChatRoomItem from "../chatroom/ChatRoomItem";
import ChatRoomDetail from "../chatroom/ChatRoomDetail";

const StyledContentDetail = styled.div`
    flex-grow: 1;
    background-color: #F5F6F7;
    
`;

const ContentDetail = () => {
    return (
        <StyledContentDetail>
            {/*<EmptyContentDetail/>*/}
            <UserProfileDetail/>
            {/*<ChatRoomDetail/>*/}
        </StyledContentDetail>
    )
}

export default ContentDetail