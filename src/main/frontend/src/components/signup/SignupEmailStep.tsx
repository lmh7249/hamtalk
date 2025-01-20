import EmailInput from "../common/EmailInput";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";

const SignupEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
    
`

const SignupEmailStep = () => {
    return (
        <SignupEmailWrapper>
            <FloatingInput type="email" placeholder="이메일 주소"></FloatingInput>
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep