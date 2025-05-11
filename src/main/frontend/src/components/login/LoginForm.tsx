import React, {useEffect, useState} from "react";
import Button from "../common/Button";
import styled from "styled-components";
import {LoginInput} from "../common/LoginInput";
import {userLogin} from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {login} from "../../store/userSlice";


const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    margin: 5px 0 5px 0;
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
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToast = toast.loading('로그인 중...');

        try {
        const userData = await userLogin({email, password});
            if(userData) {
                toast.success('로그인 성공!', {
                    id: loadingToast,
                    duration: 2000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                dispatch(
                    login({
                        id: userData.id,
                        email: userData.email,
                        roleId: userData.roleId,
                    })
                );
                console.log("로그인 한 유저 정보: ", userData.id, userData.email, userData.roleId);
                navigate("/chat");
            } else {
                toast.error('이메일 또는 비밀번호를 다시 확인해주세요.', {
                    id: loadingToast,
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            toast.error('로그인 중 오류가 발생했습니다.', {
                id: loadingToast,
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

    return (
        <StyledLoginForm onSubmit={handleSubmit}>
            <StyledEmailLabel htmlFor="email">이메일 주소 CI/CD</StyledEmailLabel>
            <LoginInput id="email" type="email" placeholder="예) hamtalk@hamtalk.com" value={email} maxLength={255} onChange={handleEmailChange}/>
            <StyledErrorText>{emailError || "\u00A0"}</StyledErrorText>

            <StyledPasswordLabel htmlFor="password">비밀번호</StyledPasswordLabel>
            <LoginInput id="password" type="password" placeholder="비밀번호를 입력해주세요." value={password} maxLength={16}
                        onChange={handlePasswordChange}/>
            <StyledErrorText>{passwordError || "\u00A0"}</StyledErrorText>
            <Button type="LOGIN" disabled={!isFormValid}>로그인</Button>
        </StyledLoginForm>
    )
}
export default LoginForm