import styled from "styled-components";
import Title from "../common/Title";
import Desc from "../common/Desc";

const StyledSignupGuide = styled.div`
    min-width: 300px;
    display: flex;
    flex-direction: column;
`

interface SignupGuideProps {
    title: string;
    desc: string;
}


const SignupGuide = ({title, desc}: SignupGuideProps) => {
    return (
        <StyledSignupGuide>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
        </StyledSignupGuide>
    )
}

export default SignupGuide
