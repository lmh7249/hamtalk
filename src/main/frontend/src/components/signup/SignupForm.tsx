import styled from "styled-components";
import SignupButton from "./SignupButton";
import SignupNameStep from "./SignupNameStep";
import SignupEmailStep from "./SignupEmailStep";
import SignupPasswordStep from "./SignupPasswordStep";
import SignupEmailVerificationStep from "./SignupEmailVerificationStep";
import React, {useEffect, useState} from "react";
import {
    isValidBirthDate,
    isValidEmail,
    isValidGender,
    isValidName,
    isValidPassword,
    isValidVerificationCode,
} from "../../utils/signupValidation";

const StyledSignupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
`

interface SignupFormProps {
    currentStep: number;
    questionLength: number;
    onNextStep: () => void;
    onPrevStep: () => void;
}

export interface FormData {
    name: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
    email: string;
    verificationCode: string;
    password: string;
    confirmPassword: string;
}

const SignupForm = ({currentStep, questionLength, onNextStep, onPrevStep}: SignupFormProps) => {
    // 1~4단계 모든 데이터 관리
    const [formData, setFormData] = useState<FormData>({
        name: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
        // 1단계
        email: '',
        // 2단계
        verificationCode: '',
        // 3단계
        password: '',
        confirmPassword: ''
        // 4단계
    });

    const [isStepValid, setIsStepValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState<{[key:string]: string}>({});
    const handleErrorMessages = (messages: { [key: string]: string }) => {
        setErrorMessages(messages);
    };



    const validateStep = (step: number) => {
        const errorMessages : {[key: string]: string} = {};

        switch (step) {
            case 0: {
                // 이름 유효성 검사
                const nameValidation = isValidName(formData.name);
                if (!nameValidation.isValid) {
                    errorMessages.name = nameValidation.errorMessage;
                }

                // 생년월일 유효성 검사
                const birthDateValidation = isValidBirthDate(
                    formData.birthYear,
                    formData.birthMonth,
                    formData.birthDay
                );
                if (!birthDateValidation.isValid) {
                    errorMessages.birthDate = birthDateValidation.errorMessage;
                }

                // 성별 유효성 검사
                const isGenderValid = isValidGender(formData.gender);
                if (!isGenderValid.isValid) {
                    errorMessages.gender = isGenderValid.errorMessage;
                }
                break;
            }
            case 1: {
                // 이메일 유효성 검사
                const emailValidation = isValidEmail(formData.email);
                if (!emailValidation.isValid) {
                    errorMessages.email = emailValidation.errorMessage;
                }
                break;
            }
            case 2: {
                // 인증 코드 유효성 검사
                const verificationCodeValidation = isValidVerificationCode(formData.verificationCode);
                if (!verificationCodeValidation.isValid) {
                    errorMessages.verificationCode = verificationCodeValidation.errorMessage;
                }
                break;
            }
            case 3: {
                // 비밀번호 유효성 검사
                const passwordValidation = isValidPassword(formData.password, formData.confirmPassword);
                if (!passwordValidation.isValid) {
                    errorMessages.password = passwordValidation.errorMessage;
                }
                break;
            }
            default:
                return { isValid: true, errorMessages: {} }; // 유효성 검사 통과
        }
        // 유효성 검사 후 errorMessages가 비어 있으면 isValid는 true, 아니면 false
        return { isValid: Object.keys(errorMessages).length === 0, errorMessages };
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // e.target의 타입을 명확히 처리
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        const validationResult = validateStep(currentStep);
        setIsStepValid(validationResult.isValid);
        console.log(formData); // 최신 formData를 출력
        console.log("useEffect 유효성 검사중 ...", validationResult.isValid);
        console.log("에러 메시지:", validationResult.errorMessages);
    }, [formData, currentStep]);  // formData가 변경될 때마다 실행

    const handleSubmit = (e :React.FormEvent) : void => {
        e.preventDefault();
        const passwordValidation = isValidPassword(formData.password, formData.confirmPassword);
        if(!passwordValidation.isValid) {
            alert(passwordValidation.errorMessage);
            console.log("핸들서브밋 함수 호출");
            handleErrorMessages({ password: passwordValidation.errorMessage });
        } else {
            fetch("api/users", {
                method:"post",

            })
        }
    }

    return (
        <StyledSignupForm method="post" onSubmit={handleSubmit}>
            {currentStep === 0 && <SignupNameStep formData={formData} handleInputChange = {handleInputChange} errorMessage = {errorMessages}/>}
            {currentStep === 1 && <SignupEmailStep formData={formData} handleInputChange = {handleInputChange} errorMessage = {errorMessages}/>}
            {currentStep === 2 && <SignupEmailVerificationStep formData={formData} handleInputChange = {handleInputChange} errorMessage = {errorMessages}/>}
            {currentStep === 3 && <SignupPasswordStep formData={formData} handleInputChange = {handleInputChange} errorMessage = {errorMessages}/>}
            <SignupButton currentStep={currentStep}
                          questionLength={questionLength}
                          formData={formData}
                          onNextStep={onNextStep}
                          onPrevStep={onPrevStep}
                          isStepValid={isStepValid}
                          handleErrorMessages = {handleErrorMessages}
                          validateStep={validateStep}/>
        </StyledSignupForm>
    )
}

export default SignupForm