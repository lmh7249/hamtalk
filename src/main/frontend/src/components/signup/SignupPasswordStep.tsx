import PasswordInput from "../common/PasswordInput";
import styled from "styled-components";

const PasswordInputWrapper = styled.div`
    display: flex;
    flex-direction: column;  // 입력창들을 세로로 배치
    gap: 20px;              // 입력창 사이 간격
    position: absolute;      // 절대 위치
    right: 40px;
`;

const SignupPasswordStep = () => {
    return (
        <PasswordInputWrapper>
            <PasswordInput placeholder="비밀번호 입력"></PasswordInput>
            <PasswordInput placeholder="비밀번호 확인"></PasswordInput>
        </PasswordInputWrapper>
    )
}

export default SignupPasswordStep