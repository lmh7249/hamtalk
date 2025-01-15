import NumberInput from "../common/NumberInput";
import styled from "styled-components";

const SignupEmailVerificationWrapper = styled.div`
    position: absolute;      // 절대 위치
    right: 40px;
    gap: 30px;
`

const SignupEmailVerificationStep = () => {
    return (
        <SignupEmailVerificationWrapper>
            <NumberInput placeholder="인증번호 입력" ></NumberInput>
        </SignupEmailVerificationWrapper>
    )
}
export default SignupEmailVerificationStep