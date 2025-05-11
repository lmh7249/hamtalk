import loginImage from "../../assets/images/hamtalk-logo.png";
import styled from "styled-components";

const LoginHeaderWrapper = styled.div ` 
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
`

const LoginHeader = () => {
    return (
        <LoginHeaderWrapper>
            <img src={loginImage}  alt="로그인 이미지" style={{
                maxWidth: '50%',
                height: 'auto',
                objectFit: 'contain'
            }}></img>
        </LoginHeaderWrapper>
    )
}

export default LoginHeader