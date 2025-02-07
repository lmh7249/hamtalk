import styled from "styled-components";
import EmptyContentDetail from "./EmptyContentDetail";

const StyledContentDetail = styled.div`
    flex-grow: 1;
    background-color: #F5F6F7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`

const ContentDetail = () => {
    return (
        <StyledContentDetail>
            <EmptyContentDetail/>
            {/*(메뉴1에 있는 내용, 채팅창 클릭 등을하면 여기서 화면을 보여줌, 사용자는 주로 여기서*/}
            {/*채팅을 치거나 수정, 다른 유저의 프로필을 보거나 등등.*/}
        </StyledContentDetail>

    )
}

export default ContentDetail