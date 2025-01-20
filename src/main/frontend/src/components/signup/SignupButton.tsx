import {useNavigate} from "react-router-dom";
import Button from "../common/Button";
import styled from "styled-components";

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 30px;       // 아래에서 20px
    right: 40px;        // 오른쪽에서 20px
    display: flex;
    gap: 30px;
`;

interface SignupButtonProps {
    step: number;
    questionLength: number;
}

const SignupButton = ({step, questionLength}: SignupButtonProps) => {
    const isLast = (questionLength - 1 === step);
    const navigate = useNavigate();

    return (
        <ButtonWrapper>
            {step !== 0 ? <Button type="PREV" onClick={(e) => {
                e.preventDefault();
                navigate(`${step-1}`)}}>이전</Button> : null}
            {isLast ? <Button type="COMPLETE">가입하기</Button> :
                <Button type="NEXT" onClick={(e) => {
                e.preventDefault();
                console.log("다음");
                console.log(step);
                navigate(`${step+1}`)}}>다음</Button>}
        {/*  navigate(`${step+1}`) -> url은 문자열이라 숫자에서 문자로 바꿔줘야 정상 작동.  */}
        </ButtonWrapper>
    )
}

export default SignupButton