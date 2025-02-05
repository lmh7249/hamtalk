import styled from "styled-components";
import FriendPlus from "../../assets/icons/friend-plus.svg";
import FriendProfile from "./FriendProfile";

const StyledContentList = styled.div`
    border: solid 1px black;
    background-color: white;
    min-width: 350px;
`

const StyledContentListTopState = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SearchInput = styled.input`
    background-color: #DFDFDF;
    border: none;
`

const ContentList = () => {
    return (
        <StyledContentList>
            <StyledContentListTopState>
                <h3>친구 목록</h3>
                <img src={FriendPlus} alt="친구 추가" width={30} height={30}/>
            </StyledContentListTopState>
            <SearchInput type="text"></SearchInput>
            <div> 친구  200</div>
            <FriendProfile></FriendProfile>
        </StyledContentList>
    )
}

export default ContentList