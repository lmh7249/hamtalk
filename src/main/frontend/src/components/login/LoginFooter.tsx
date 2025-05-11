import {Link} from "react-router-dom";
import styled from "styled-components";

const SignUpLink = styled(Link)`
    color: #495057; /* 버튼 색상과 동일하게 설정 */
    font-size: 16px; /* 적당한 텍스트 크기 */
    text-decoration: none; /* 기본 밑줄 제거 */
    border-radius: 5px; /* 테두리 둥글게 */
    transition: color 0.3s ease, text-decoration 0.3s ease; /* 호버 효과 추가 */
    &:hover {
        color: black;
        text-decoration: underline;
    }
    

`

const LoginFooter = () => {
    return (
        <>
            <SignUpLink to="/signup">회원가입</SignUpLink>
        </>
    )
}

export default LoginFooter