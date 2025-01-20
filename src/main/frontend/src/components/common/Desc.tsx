import styled from "styled-components";

const StyledDesc = styled.div`
    font-size: 18px;
    white-space: pre-line;  
    line-height: 2;    // 줄 간격 설정
`

const Desc = ({children}:LoginGuideProps) => {
    return (
        <StyledDesc>{children}</StyledDesc>
    )
}

export default Desc