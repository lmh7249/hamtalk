import styled from "styled-components";
import FriendPlus from "../../assets/icons/friend-plus.svg";
import FriendList from "../friends/FriendList";
import SearchIcon from "../../assets/icons/search.svg"
import ChattingRoomList from "../chattingroom/ChattingRoomList";

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
    return (
        <StyledContentList>
            <StyledContentListTopState>
                <h3>친구 목록</h3>
                <img src={FriendPlus} alt="친구 추가" width={30} height={30}/>
            </StyledContentListTopState>
            <SearchInput type="text" placeholder="이름 또는 이메일을 입력하세요."></SearchInput>
            <div> 친구 200</div>
                {/*<FriendList/>*/}
                <ChattingRoomList/>
        </StyledContentList>
    )
}

export default ContentList