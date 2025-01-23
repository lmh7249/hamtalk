import styled from "styled-components";
import SignupButton from "./SignupButton";
import SignupNameStep from "./SignupNameStep";
import SignupEmailStep from "./SignupEmailStep";
import SignupPasswordStep from "./SignupPasswordStep";
import SignupEmailVerificationStep from "./SignupEmailVerificationStep";
import {useEffect, useState} from "react";
import {
    isValidDay,
    isValidEmail,
    isValidGender,
    isValidMonth,
    isValidName,
    isValidPassword,
    isValidVerificationCode,
    isValidYear
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

    const validateStep = (step: number) => {
        switch (step) {
            case 0: {
                return (
                    isValidName(formData.name) &&
                    isValidYear(formData.birthYear) &&
                    isValidMonth(formData.birthMonth) &&
                    isValidDay(formData.birthDay, formData.birthMonth, formData.birthYear) &&
                    isValidGender(formData.gender)
                );
            }
            case 1: {
                return isValidEmail(formData.email);

            }
            case 2: {
                return isValidVerificationCode(formData.verificationCode);

            }
            case 3: {
                return isValidPassword(formData.password, formData.confirmPassword);

            }
            default:
                return true;
        }
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
        setIsStepValid(validationResult);
        console.log(formData); // 최신 formData를 출력
    }, [formData, currentStep]);  // formData가 변경될 때마다 실행

    return (
        <StyledSignupForm method="post">
            {currentStep === 0 && <SignupNameStep formData={formData} handleInputChange = {handleInputChange}/>}
            {currentStep === 1 && <SignupEmailStep formData={formData} handleInputChange = {handleInputChange} />}
            {currentStep === 2 && <SignupEmailVerificationStep formData={formData} handleInputChange = {handleInputChange}/>}
            {currentStep === 3 && <SignupPasswordStep formData={formData} handleInputChange = {handleInputChange}/>}
            <SignupButton currentStep={currentStep} questionLength={questionLength} formData={formData} onNextStep={onNextStep} onPrevStep={onPrevStep}  isStepValid={isStepValid}/>
        </StyledSignupForm>
    )
}

export default SignupForm