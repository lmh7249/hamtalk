import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import React from "react";
import {StyledErrorText} from "../common/ErrorText";

const SignupEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
`
const SignupEmailStep = ({formData, handleInputChange, errorMessage}: {formData : any, handleInputChange: any, errorMessage: {[key:string]: string}}) => {
    return (
        <SignupEmailWrapper>
            <FloatingInput type="email" placeholder="이메일 주소" name="email" value={formData.value} onChange={handleInputChange}></FloatingInput>
            {errorMessage && errorMessage.email && <StyledErrorText>{errorMessage.email}</StyledErrorText>}
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep