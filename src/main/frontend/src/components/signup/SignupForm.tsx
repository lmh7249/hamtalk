import styled from "styled-components";
import SignupButton from "./SignupButton";
import SignupNameStep from "./SignupNameStep";
import SignupEmailStep from "./SignupEmailStep";
import SignupPasswordStep from "./SignupPasswordStep";
import SignupEmailVerificationStep from "./SignupEmailVerificationStep";
import {useEffect, useState} from "react";

const StyledSignupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
`

interface SignupFormProps {
    step: number;
    questionLength: number;
}

export interface FormData {
    name: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    gender: string;
    email: string;
    verificationCode: number;
    password: string;
    confirmPassword: string;
}


const SignupForm = ({step, questionLength}: SignupFormProps) => {
    // 1~4단계 모든 데이터 관리
    const [formData, setFormData] = useState<FormData>({
        name: '',
        birthYear: 0,
        birthMonth: 0,
        birthDay: 0,
        gender: '',
        // 1단계
        email: '',
        // 2단계
        verificationCode: 0,
        // 3단계
        password: '',
        confirmPassword: ''
        // 4단계
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    }

    // 최신 formData를 콘솔에 찍기 위해 useEffect 사용
    useEffect(() => {
        console.log(formData);
    }, [formData]);  // formData가 변경될 때마다 실행

    return (
        <StyledSignupForm>
            {step === 0 ? <SignupNameStep formData={formData} handleInputChange = {handleInputChange}/> : null}
            {step === 1 ? <SignupEmailStep formData={formData} handleInputChange = {handleInputChange}/> : null}
            {step === 2 ? <SignupEmailVerificationStep formData={formData} handleInputChange = {handleInputChange}/> : null}
            {step === 3 ? <SignupPasswordStep formData={formData} handleInputChange = {handleInputChange}/> : null}
            <SignupButton step={step} questionLength={questionLength} formData={formData}/>
        </StyledSignupForm>
    )
}

export default SignupForm