import {AuthPageLayouts} from "../styles/layouts/PageLayouts";
import SignupContainer from "../containers/SignupContainer";
import ProgressIndicator from "../components/signup/ProgressIndicator";
import questions from '../data/signupQuestions.json'
import {useState} from "react";

const SignupPage = () => {
    const [currentStep, setCurrentStep]= useState(0);
    const maxSteps = questions.length;

    // 현재 step이 유효하지 않으면 0 리셋
    if(currentStep < 0 || currentStep > maxSteps) {
        setCurrentStep(0);
    }

    // 단계를 변경하는 함수
    const handleNextStep = () => {
        if (currentStep < maxSteps - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };


    return (
        <AuthPageLayouts>
            <ProgressIndicator currentStep={currentStep} totalSteps = {maxSteps}/>
            <SignupContainer currentStep={currentStep}
                             onNextStep={handleNextStep}
                             onPrevStep={handlePrevStep}
            />
        </AuthPageLayouts>
    )
}

export default SignupPage