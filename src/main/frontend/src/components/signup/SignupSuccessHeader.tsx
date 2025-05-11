import styled from "styled-components";
import signupSuccess from "../../assets/images/signup-success-image.png";


const LoginHeaderWrapper = styled.div ` 
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
`

const SignupSuccessHeader = () => {

    return (
        <LoginHeaderWrapper>
            <img src={signupSuccess} alt="로그인 이미지" style={{
                maxWidth: '50%',
                height: 'auto',
                objectFit: 'contain'
            }}></img>

        </LoginHeaderWrapper>

    )

}

export default SignupSuccessHeader