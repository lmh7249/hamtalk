import Button from "../common/Button";
import styled from "styled-components";
import {FormData} from "./SignupForm";
import {isValidEmail, isValidPassword} from "../../utils/signupValidation";
import React from "react";
import {checkDuplicateEmail} from "../../services/user-service";
import {sendEmailVerification, verifyEmailVerificationCode} from "../../services/auth-service";

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 30px; // 아래에서 20px
    right: 40px; // 오른쪽에서 20px
    display: flex;
    gap: 30px;
`;

interface SignupButtonProps {
    currentStep: number;
    questionLength: number;
    formData: FormData;
    onNextStep: () => void;
    onPrevStep: () => void;
    isStepValid: boolean;
    handleErrorMessages: (messages: { [key: string]: string }) => void;
    validateStep: (step: number) => { isValid: boolean; errorMessages: { [key: string]: string } };
    setIsLoading: (isLoading: boolean) => void;
}

const SignupButton = ({
                          currentStep,
                          questionLength,
                          formData,
                          onNextStep,
                          onPrevStep,
                          isStepValid,
                          handleErrorMessages,
                          validateStep,
                          setIsLoading
                      }: SignupButtonProps) => {
    const isLast = (questionLength - 1 === currentStep);

    const handleNext = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const validationResult = validateStep(currentStep);
        handleErrorMessages(validationResult.errorMessages);

        // 이메일 중복 체크 로직(SignupEmailStep 단계)
        if (currentStep === 1) {
            const email = formData.email;
            // 이메일 유효성 검사 먼저 하고. 만약 여기에
            if (!isValidEmail(email).isValid) {
                setIsLoading(false);
                return; // 유효하지 않으면 DB 접근 안하고 리턴
            }
            // 이메일 중복검사 api
        const isEmailAvailable =  await checkDuplicateEmail(email);
            if(!isEmailAvailable) {
                setIsLoading(false);
                return;
            }
            // 이메일 인증번호 전송 api
        const isEmailVerified  = await sendEmailVerification(email);
            if(!isEmailVerified ) {
                setIsLoading(false);
                return;
            }
        }

        if (currentStep === 2) {
            const email = formData.email;
            const verificationCode = formData.verificationCode;
            const isValid = await verifyEmailVerificationCode(email, verificationCode);
            if(!isValid.success) {
                console.log(isValid);
                handleErrorMessages({ verificationCode: isValid.errorMessage });
                // 인증번호 검증 실패 에러메세지 설정
                setIsLoading(false);
                return;
            }
        }
        // 유효성 검사를 통과하면 다음 스텝으로 이동
        if (isStepValid) {
            onNextStep();
        } else {
            // 유효성 검사 실패 시 처리
            console.log("유효성 검사를 통과하지 못했습니다. 다시 확인해주세요.");
            setIsLoading(false);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault(); // 폼 제출 방지
        onPrevStep(); // 이전 스텝으로 이동
    };

    return (
        <ButtonWrapper>
            {currentStep !== 0 && <Button type="PREV" onClick={handlePrev}>이전</Button>}
            {isLast ? <Button type="COMPLETE">가입하기</Button> :
                <Button type="NEXT" onClick={handleNext}>다음</Button>}
        </ButtonWrapper>
    )
}
export default SignupButton