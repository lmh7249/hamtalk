import EmailInput from "../common/EmailInput";
import styled from "styled-components";

const SignupEmailWrapper = styled.div`
    display: flex;
    position: absolute;      // 절대 위치
    right: 40px;
`

const SignupEmailStep = () => {
    return (
        <SignupEmailWrapper>
            <EmailInput placeholder="이메일 입력"></EmailInput>
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep