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
    const navigate = useNavigate();
    const [isStepValid, setIsStepValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
    const handleErrorMessages = (messages: { [key: string]: string }) => {
        setErrorMessages(messages);
    };


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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
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

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const passwordValidation = isValidPassword(formData.password, formData.confirmPassword);
        if (!passwordValidation.isValid) {
            alert(passwordValidation.errorMessage);
            console.log("핸들서브밋 함수 호출");
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
            fetch("api/users", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(signupData)
                // json 문자열로 변환해서 body에 전송할 데이터 포함.
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("회원가입 요청 실패");
                }
                return response.json();
                // 다음 then 블록으로 결과 전달.
            })
                .then((data) => {
                    console.log("회원가입 성공: ", data);
                    // 성공페이지로 이동 예정.
                    navigate("/signup-success", {state: {name: data.data}});

                })
                .catch((error) => {
                    console.error("에러 발생: ", error);
                })
        }
    }

    return (
        <StyledSignupForm method="post" onSubmit={handleSubmit}>
            {currentStep === 0 && <SignupNameStep formData={formData} handleInputChange={handleInputChange}
                                                  errorMessage={errorMessages}/>}
            {currentStep === 1 && <SignupEmailStep formData={formData} handleInputChange={handleInputChange}
                                                   errorMessage={errorMessages}/>}
            {currentStep === 2 && <SignupEmailVerificationStep formData={formData} handleInputChange={handleInputChange}
                                                               errorMessage={errorMessages}/>}
            {currentStep === 3 && <SignupPasswordStep formData={formData} handleInputChange={handleInputChange}
                                                      errorMessage={errorMessages}/>}
            <SignupButton currentStep={currentStep}
                          questionLength={questionLength}
                          formData={formData}
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