import styled from "styled-components";
import FriendPlusIcon from "../../assets/icons/friend-plus.svg";
import ChattingRoomPlusIcon from "../../assets/icons/chatting-room-plus.svg";
import FriendList from "../friends/FriendList";
import SearchIcon from "../../assets/icons/search.svg"
import ChattingRoomList from "../chattingroom/ChattingRoomList";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {MenuState} from "../../store/menuSlice";

const StyledContentList = styled.div`
    min-width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledContentListTopState = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ContentListTopState = ({selectedMenu}:MenuState) => {
    return (
        <StyledContentListTopState>
            <h3>{selectedMenu.label}</h3>
            {selectedMenu.key === "friends" && <img src={FriendPlusIcon} alt="친구 추가" width={30} height={30}/>}
            {selectedMenu.key === "chats" && <img src={ChattingRoomPlusIcon} alt="채팅방 생성" width={30} height={30}/>}
        </StyledContentListTopState>
    )
}

const SearchInput = styled.input`
    background-color: #DFDFDF;
    border: none;
    background-image: url(${SearchIcon});
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding: 10px 40px 10px 10px;
    background-size: 20px 20px;
    border-radius: 5px;
`

const ContentList = () => {
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);

    return (
        <StyledContentList>
            <ContentListTopState selectedMenu={selectedMenu}/>
            {selectedMenu.key === "friends" && <SearchInput type="text" placeholder="이름 또는 이메일을 입력하세요."/>}
            {selectedMenu.key === "chats" && <SearchInput type="text" placeholder="참여자 또는 채팅방명을 검색하세요."/>}
            {selectedMenu.key === "friends" && <div> 친구 200</div>}
            {selectedMenu.key === "chats" && <div> 채팅방 200</div>}
            {selectedMenu.key === "friends" && <FriendList/>}
            {selectedMenu.key === "chats" && <ChattingRoomList/>}
            {/*{selectedMenu === "settings" && <ChattingRoomList/>}*/}
        </StyledContentList>
    )
}

export default ContentList