import styled from "styled-components";

const StyledContentDetail = styled.div`
    border: solid 1px black;
    flex-grow: 1;
    
`

const ContentDetail = () => {
    return (
        <StyledContentDetail>
            중앙 우측 메인 메뉴2
            {/*(메뉴1에 있는 내용, 채팅창 클릭 등을하면 여기서 화면을 보여줌, 사용자는 주로 여기서*/}
            {/*채팅을 치거나 수정, 다른 유저의 프로필을 보거나 등등.*/}
        </StyledContentDetail>

    )
}

export default ContentDetail