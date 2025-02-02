import styled from "styled-components";
import {useLocation} from "react-router-dom";

const Title =styled.h2`
    margin: 0;

`

const WelcomeMessage =styled.p`
    margin: 0;
    font-size: 18px;
    
`

const DescriptionText =styled.p`
    margin: 8px 0;
    font-size: 16px;
    color: #333;  
`


const SignupSuccessMain = () => {
    const location = useLocation();
    const name = location.state?.name;
    return (
        <>
            <Title> 회원가입 완료🎉 </Title>
            <WelcomeMessage>
                {name ? `${name}님, ` : ''}
                환영합니다!
            </WelcomeMessage>
            <DescriptionText>로그인 후 햄톡의 다양한 채팅 서비스를 즐겨보세요.</DescriptionText>
        </>
    )
}
export default SignupSuccessMain