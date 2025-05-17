import styled from "styled-components";
import Title from "../common/Title";
import Desc from "../common/Desc";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const StyledSignupGuide = styled.div`
    min-width: 300px;
    display: flex;
    flex-direction: column;
`;

interface SignupGuideProps {
    title: string;
    desc: string;
    currentStep: number;
}

const EmailBox = styled.div`
  margin-top: 12px;
  padding: 12px 16px;
  background-color: #f1f8ff;
  border: 1px solid #d0e3ff;
  border-radius: 12px;
`;

const Label = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const EmailText = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #0077cc;
  word-break: break-word;
`;


const SignupGuide = ({title, desc, currentStep}: SignupGuideProps) => {
    const email = useSelector((state:RootState) => state.signup.email);

    return (
        <StyledSignupGuide>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            {currentStep === 2 && (
                <EmailBox>
                    <Label>입력한 이메일</Label>
                    <EmailText>{email}</EmailText>
                </EmailBox>
            )}

            {currentStep === 3 && (
                <EmailBox>
                    <Label>비밀번호 조합</Label>
                    <EmailText>영문, 숫자, 특수문자 조합 (8~16자)</EmailText>
                </EmailBox>
            )}


        </StyledSignupGuide>
    )
}

export default SignupGuide
