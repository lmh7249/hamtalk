import {AuthPageLayouts} from "../styles/layouts/PageLayouts";
import SignupContainer from "../containers/SignupContainer";
import ProgressIndicator from "../components/signup/ProgressIndicator";
import questions from '../data/signupQuestions.json'
import React, {useState} from "react";
import {BarLoader} from "react-spinners";
import styled from "styled-components";

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4px; // BarLoader의 height와 동일하게 설정
    width: 100%;
`;


const SignupPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const maxSteps = questions.length;

    // 현재 step이 유효하지 않으면 0 리셋
    if (currentStep < 0 || currentStep > maxSteps) {
        setCurrentStep(0);
    }

    // 단계를 변경하는 함수
    const handleNextStep = () => {
        setIsLoading(true);
        if (currentStep < maxSteps - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
        setIsLoading(false);
    };

    const handlePrevStep = () => {
        setIsLoading(true);
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
        setIsLoading(false);
    };


    return (
        <AuthPageLayouts>
            <ProgressIndicator currentStep={currentStep} totalSteps={maxSteps}/>
            <LoaderContainer>
                {isLoading && <BarLoader width={780} color={'#36d7b7'}/>}
            </LoaderContainer>

            <SignupContainer currentStep={currentStep}
                             onNextStep={handleNextStep}
                             onPrevStep={handlePrevStep}
                             setIsLoading={setIsLoading}
            />
        </AuthPageLayouts>
    )
}

export default SignupPage