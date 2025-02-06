import styled from "styled-components";
import FriendProfile from "../chat/FriendProfile";

const StyledFriendListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const FriendList = () => {
    return (
        <StyledFriendListWrapper>
            {/*친구 목록 DB에서 꺼내와서 반복. */}
            <FriendProfile nickName={"임성규"} statusMessage={"상메 ㅎㅎ"} email={"lsk@naa.com"}/>
            <FriendProfile nickName={"홍길동"} statusMessage={"반갑습니다."} email={"hgd@naa.com"}/>
        </StyledFriendListWrapper>
    )

}

export default FriendList