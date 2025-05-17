import {AuthPageLayouts} from "../styles/layouts/PageLayouts";
import SignupContainer from "../containers/SignupContainer";
import ProgressIndicator from "../components/signup/ProgressIndicator";
import React, {useState} from "react";
import {BarLoader} from "react-spinners";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../store";

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

    const questions = [
        { title: '기본 정보 입력', desc: '이름, 생년월일, 성별을 입력해주세요.' },
        { title: '이메일 입력', desc: '사용하실 이메일을 입력해주세요.' },
        { title: '이메일 인증', desc: '발송된 인증번호를 입력해주세요.' },
        { title: '비밀번호 설정', desc: '비밀번호를 입력하고 확인해주세요.' }
    ];

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
                             questions={questions}
            />
        </AuthPageLayouts>
    )
}

export default SignupPage