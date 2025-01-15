import SignupForm from "../components/signup/SignupForm";
import SignupGuide from "../components/signup/SignupGuide";
import styled from "styled-components";
import SignupButton from "../components/signup/SignupButton";
import ProgressIndicator from "../components/signup/ProgressIndicator";

const SignupContainerWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 100px;
    padding: 30px 40px;
    width: 750px;
    height: 300px;
    background-color: #ffffff; /* 흰색 배경 */
    border: 1px solid #dcdfe3; /* 연한 회색 테두리 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    border-radius: 20px;
`

interface SignupContainerProps {
    step: number;
}

const SignupContainer = ({step}: SignupContainerProps) => {
    const questions = [{
        title: "회원가입1",
        desc: "이름, 성별, 생년월일을 입력해주세요.",
    },
        {
            title: "회원가입2",
            desc: "사용하실 이메일을 입력해주세요."
        },
        {
            title: "이메일 주소 인증",
            desc: "{이메일}님에게 전송된 인증번호를 입력하세요." +
                "\n인증번호가 보이지 않으면 스팸 폴더를 확인하세요."
        },
        {
            title: "회원가입3",
            desc: "비밀번호를 입력해주세요. (가입버튼)"
        }];

    return (
        <SignupContainerWrapper>
            <SignupGuide title={questions[step].title} desc={questions[step].desc}/>
            <SignupForm step={step} questionLength={questions.length}/>
        </SignupContainerWrapper>
    )
}

export default SignupContainer