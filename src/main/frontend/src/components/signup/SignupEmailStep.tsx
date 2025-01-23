import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import React from "react";

const SignupEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
    
`

const StyledErrorText = styled.p`
    font-size: 13px;
    color: #f15746;
    margin: 0 0 5px 0;
    line-height: 1px;
`

const SignupEmailStep = ({formData, handleInputChange}: {formData : any, handleInputChange: any}) => {
    return (
        <SignupEmailWrapper>
            <FloatingInput type="email" placeholder="이메일 주소" name="email" value={formData.value} onChange={handleInputChange}></FloatingInput>
            {<StyledErrorText>이미 사용중인 이메일입니다. 다른 이메일을 사용해주세요.</StyledErrorText>}
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep