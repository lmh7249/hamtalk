import SignupForm from "../components/signup/SignupForm";
import SignupGuide from "../components/signup/SignupGuide";
import styled from "styled-components";
import questions from '../data/signupQuestions.json'
import React from "react";
import {isValidPassword} from "../utils/signupValidation";

const SignupContainerWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 100px;
    padding: 30px 40px 100px 40px;
    width: 750px;
    height: 300px;
    background-color: #ffffff; /* 흰색 배경 */
    border: 1px solid #dcdfe3; /* 연한 회색 테두리 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    border-radius: 20px;
`

interface SignupContainerProps {
    currentStep: number;
    onNextStep: () => void;  // 단계 변경 함수
    onPrevStep: () => void;
}

const SignupContainer = ({currentStep, onNextStep, onPrevStep}: SignupContainerProps) => {
    return (
        <SignupContainerWrapper>
            <SignupGuide title={questions[currentStep].title} desc={questions[currentStep].desc}/>
            <SignupForm currentStep={currentStep} questionLength={questions.length} onNextStep={onNextStep} onPrevStep={onPrevStep}/>
        </SignupContainerWrapper>
    )
}
export default SignupContainer