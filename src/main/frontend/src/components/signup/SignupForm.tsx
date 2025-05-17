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
} from "../../utils/signupValidation";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {signupUser} from "../../services/user-service";
import toast from "react-hot-toast";
import {resetForm} from "../../store/signupSlice";

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
    setIsLoading: (isLoading: boolean) => void;
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

const SignupForm = ({currentStep, questionLength, onNextStep, onPrevStep, setIsLoading}: SignupFormProps) => {
    // 1~4단계 모든 데이터 관리
    const navigate = useNavigate();
    const [isStepValid, setIsStepValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
    const handleErrorMessages = (messages: { [key: string]: string }) => {
        setErrorMessages(messages);
    };
    const formData = useSelector((state:RootState) => state.signup);
    const dispatch = useDispatch();


    const validateStep = (step: number) => {
        const errorMessages: { [key: string]: string } = {};

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
            case 3: {
                // 비밀번호 유효성 검사
                const passwordValidation = isValidPassword(formData.password, formData.confirmPassword);
                if (!passwordValidation.isValid) {
                    errorMessages.password = passwordValidation.errorMessage;
                }
                break;
            }
            default:
                return {isValid: true, errorMessages: {}}; // 유효성 검사 통과
        }
        // 유효성 검사 후 errorMessages가 비어 있으면 isValid는 true, 아니면 false
        return {isValid: Object.keys(errorMessages).length === 0, errorMessages};
    };

    useEffect(() => {
        const validationResult = validateStep(currentStep);
        setIsStepValid(validationResult.isValid);
    }, [formData, currentStep]);  // formData가 변경될 때마다 실행

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const passwordValidation = isValidPassword(formData.password, formData.confirmPassword);
        if (!passwordValidation.isValid) {
            handleErrorMessages({password: passwordValidation.errorMessage});
        } else {
            const birthDate = new Date(
                Number(formData.birthYear),
                Number(formData.birthMonth) - 1, // 월은 0부터 시작 (0 = 1월)
                Number(formData.birthDay)
            ).toISOString().split("T")[0]; // ISO 8601 형식 중 날짜 부분만 추출 (YYYY-MM-DD)
            const signupData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                birthDate: birthDate,
                gender: formData.gender
            }

            try {
                //TODO: 여기에 회원가입 api 호출
                const userName = await signupUser(signupData);
                dispatch(resetForm());
                // 회원가입 성공 시, 성공 페이지로 이동.
                navigate("/signup-success", {state: {name: userName}});
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("알 수 없는 오류가 발생했어요.");
                }
            }
        }
    }

    return (
        <StyledSignupForm method="post" onSubmit={handleSubmit}>
            {currentStep === 0 && <SignupNameStep errorMessage={errorMessages}/>}
            {currentStep === 1 && <SignupEmailStep errorMessage={errorMessages}/>}
            {currentStep === 2 && <SignupEmailVerificationStep errorMessage={errorMessages}/>}
            {currentStep === 3 && <SignupPasswordStep errorMessage={errorMessages}/>}
            <SignupButton currentStep={currentStep}
                          questionLength={questionLength}
                          onNextStep={onNextStep}
                          onPrevStep={onPrevStep}
                          isStepValid={isStepValid}
                          handleErrorMessages={handleErrorMessages}
                          validateStep={validateStep}
                          setIsLoading = {setIsLoading}
            />
        </StyledSignupForm>
    )
}

export default SignupForm