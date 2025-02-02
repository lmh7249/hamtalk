import NumberInput from "../common/NumberInput";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import {StyledErrorText} from "../common/ErrorText";
import React from "react";

const SignupEmailVerificationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
`

const SignupEmailVerificationStep = ({formData, handleInputChange, errorMessage}: {formData : any, handleInputChange: any, errorMessage: {[key:string]: string}}) => {
    return (
        <SignupEmailVerificationWrapper>
            <FloatingInput type="number" placeholder="인증번호" name="verificationCode" value={formData.value} onChange={handleInputChange}></FloatingInput>
            {errorMessage && errorMessage.verificationCode && <StyledErrorText>{errorMessage.verificationCode}</StyledErrorText>}
        </SignupEmailVerificationWrapper>
    )
}
export default SignupEmailVerificationStep