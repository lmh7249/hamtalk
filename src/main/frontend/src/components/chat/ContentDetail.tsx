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
    // TODO: 채팅방에 메세지가 길어질 경우, 전체 가로축 스크롤바가 생김. 이를 방지하기 위해 임의로 width 설정 -> 더 좋은 방법 있는지 확인하기. 
    
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