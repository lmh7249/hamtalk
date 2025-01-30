import styled from "styled-components";
import LoginHeader from "../login/LoginHeader";
import LoginForm from "../login/LoginForm";
import LoginFooter from "../login/LoginFooter";
import SignupSuccessHeader from "./SignupSuccessHeader";
import SignupSuccessMain from "./SignupSuccessMain";
import SignupSuccessFooter from "./SignupSuccessFooter";

const SignupSuccessContainerWrapper = styled.div`
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

const SignupSuccessContainer = () => {

    return (
        <SignupSuccessContainerWrapper>
            <SignupSuccessHeader/>
            <SignupSuccessMain/>
            <SignupSuccessFooter/>
        </SignupSuccessContainerWrapper>
    )
}
export default SignupSuccessContainer