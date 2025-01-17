import styled from "styled-components";
import SignupButton from "./SignupButton";
import SignupNameStep from "./SignupNameStep";
import SignupEmailStep from "./SignupEmailStep";
import SignupPasswordStep from "./SignupPasswordStep";
import SignupEmailVerificationStep from "./SignupEmailVerificationStep";

const StyledSignupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
interface SignupFormProps {
    step: number;
    questionLength: number;
}
const signupForm = {
    name: "",
    birth : {
        year: "",
        month: "",
        day: "",
        sex: ""
    },
    email: "",
    VerificationNumber: "",
    password:"",
}

const SignupForm = ({step, questionLength} : SignupFormProps) => {


    return (
        <StyledSignupForm>
            {step === 0 ? <SignupNameStep/> : null}
            {step === 1 ? <SignupEmailStep/> : null}
            {step === 2 ? <SignupEmailVerificationStep/> : null}
            {step === 3 ? <SignupPasswordStep/> : null}
            <SignupButton step={step} questionLength={questionLength}/>
        </StyledSignupForm>
    )
}

export default SignupForm