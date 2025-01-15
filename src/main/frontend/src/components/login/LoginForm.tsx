import React, {useState} from "react";
import Button from "../common/Button";
import styled from "styled-components";
import {LoginInput} from "../common/LoginInput";

const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 타입스크립트는 이벤트 객체의 정확한 타입을 알아야함.
    // FormEvent는 form 제출 시 발생하는 이벤트 타입
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("아이디: ", email);
        console.log("비밀번호: ", password);
    }

    return (
        <StyledLoginForm onSubmit={handleSubmit}>
            <LoginInput type="text" placeholder="이메일을 입력해주세요." value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            <LoginInput type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
            }}/>
            <Button type = "LOGIN">로그인</Button>
        </StyledLoginForm>
    )
}
export default LoginForm