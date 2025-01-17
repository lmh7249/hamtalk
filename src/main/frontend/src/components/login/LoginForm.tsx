import React, {useEffect, useState} from "react";
import Button from "../common/Button";
import styled from "styled-components";
import {LoginInput} from "../common/LoginInput";

const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`
const StyledEmailLabel = styled.label<{error?:boolean}>`
    font-weight: bold;
    color: ${(props) => (props.error ? "#f15746" : "black")};
`
const StyledPasswordLabel = styled.label<{error?:boolean}>`
    font-weight: bold;
    color: ${(props) => (props.error ? "#f15746" : "black")};
`
const StyledErrorText = styled.p`
    font-size: 13px;
    color: #f15746;
    margin: 0 0 5px 0;
    line-height: 1px;
`
const validateEmail = (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    if(!emailRegex.test(email)) {
        return "이메일 주소를 정확히 입력해주세요."
    }
    return null;
}
const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
        return "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16자)"
    }
    return null;
}
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string|null>("");
    const [passwordError, setPasswordError] =useState<string|null>("");
    const isFormValid = !emailError && !passwordError && email && password;
    // 이메일, 비밀번호 에러가 없고 둘 다 입력되어 있을 경우 true

    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(validatePassword(newPassword));
    }

    // 타입스크립트는 이벤트 객체의 정확한 타입을 알아야함.
    // FormEvent는 form 제출 시 발생하는 이벤트 타입
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("아이디: ", email);
        console.log("비밀번호: ", password);
    }

    return (
        <StyledLoginForm onSubmit={handleSubmit}>
            <StyledEmailLabel htmlFor="email" error = {!!emailError}>이메일 주소</StyledEmailLabel>
            <LoginInput id="email" type="email" placeholder="예) hamtalk@hamtalk.com" value={email} onChange={handleEmailChange}/>
            {emailError && <StyledErrorText>{emailError}</StyledErrorText>
            }

            <StyledPasswordLabel htmlFor="password"  error = {!!passwordError}>비밀번호</StyledPasswordLabel>
            <LoginInput id="password" type="password" placeholder="비밀번호를 입력해주세요." value={password}
                        onChange={handlePasswordChange}/>
            {passwordError && <StyledErrorText>{passwordError}</StyledErrorText>}
            <Button type="LOGIN" disabled={!isFormValid}>로그인</Button>
        </StyledLoginForm>
    )
}
export default LoginForm