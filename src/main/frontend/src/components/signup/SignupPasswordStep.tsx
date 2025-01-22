import styled from "styled-components";
import FloatingInput from "./FloatingInput";

const PasswordInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    box-sizing: border-box;
    width: 350px;
`;

const SignupPasswordStep = ({formData, handleInputChange}: {formData : any, handleInputChange: any}) => {
    return (
        <PasswordInputWrapper>
            <FloatingInput type="password" placeholder="비밀번호 생성" name="password" value={formData.value} onChange={handleInputChange}></FloatingInput>
            <FloatingInput type="password" placeholder="확인" name="confirmPassword" value={formData.value} onChange={handleInputChange}></FloatingInput>
        </PasswordInputWrapper>
    )
}

export default SignupPasswordStep