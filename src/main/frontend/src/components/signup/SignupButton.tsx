import {useNavigate} from "react-router-dom";
import Button from "../common/Button";
import styled from "styled-components";
import {FormData} from "./SignupForm";

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 30px;       // 아래에서 20px
    right: 40px;        // 오른쪽에서 20px
    display: flex;
    gap: 30px;
`;

interface SignupButtonProps{
    currentStep: number;
    questionLength: number;
    formData: FormData;
    onNextStep: () => void;
    onPrevStep: () => void;
    isStepValid: boolean;
}

const SignupButton = ({currentStep, questionLength, formData, onNextStep, onPrevStep, isStepValid}: SignupButtonProps) => {
    const isLast = (questionLength - 1 === currentStep);
    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault(); // 폼 제출 방지
        if (isStepValid) {
            onNextStep(); // 유효성 검사를 통과하면 다음 스텝으로 이동
        } else {
            // 유효성 검사 실패 시 처리
            alert("유효성 검사를 통과하지 못했습니다. 다시 확인해주세요.");
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