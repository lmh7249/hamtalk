import NumberInput from "../common/NumberInput";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";

const SignupEmailVerificationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
`

const SignupEmailVerificationStep = () => {
    return (
        <SignupEmailVerificationWrapper>
            <FloatingInput type="number" placeholder="인증번호"></FloatingInput>
        </SignupEmailVerificationWrapper>
    )
}
export default SignupEmailVerificationStep