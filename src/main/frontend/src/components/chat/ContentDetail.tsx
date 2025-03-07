import styled from "styled-components";
import EmptyContentDetail from "./EmptyContentDetail";
import UserProfileDetail from "../profile/UserProfileDetail";
import ChatRoomItem from "../chatroom/ChatRoomItem";
import ChatRoomDetail from "../chatroom/ChatRoomDetail";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {OpenModalProps} from "./MainContent";

const StyledContentDetail = styled.div`
    flex-grow: 1;
    background-color: #F5F6F7;
    
`;

const ContentDetail = () => {
   const contentDetailType = useSelector((state: RootState) => state.detailContent.type);

    return (
        <StyledContentDetail>
            {/*기본 값 = empty */}
            {contentDetailType === "empty" && <EmptyContentDetail/>}
            {contentDetailType === "userProfile" && <UserProfileDetail/>}
            {contentDetailType === "chatRoom" && <ChatRoomDetail/>}
        </StyledContentDetail>
    )
}

export default ContentDetail