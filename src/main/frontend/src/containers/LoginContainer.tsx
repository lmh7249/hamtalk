import LoginForm from "../components/login/LoginForm";
import LoginFooter from "../components/login/LoginFooter";
import LoginHeader from "../components/login/LoginHeader";
import styled from "styled-components";

const LoginContainerWrapper = styled.div`
    display: flex;
    justify-content: flex-start; // 이거 플렉스일때만 쓸수 있는거? 
    flex-direction: column;
    align-items: center; // 이거 플렉스일때만 쓸수 있는거?
    gap: 10px;
    padding: 30px 40px;
    width: 100%;  /* 전체 화면에 맞게 100% */
    max-width: 350px; /* 최대 너비를 설정하여 너무 커지지 않도록 제한 */
    height: auto; 
    min-width: 300px; /* 최소 너비를 설정하여 너무 작아지지 않도록 제한 */
    background-color: #ffffff; /* 흰색 배경 */
    border: 1px solid #dcdfe3; /* 연한 회색 테두리 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    border-radius: 20px;

`

const LoginContainer = () => {
    return (
        <LoginContainerWrapper>
            <LoginHeader/>
            <LoginForm/>
            <LoginFooter/>
        </LoginContainerWrapper>
    )
}

export default LoginContainer