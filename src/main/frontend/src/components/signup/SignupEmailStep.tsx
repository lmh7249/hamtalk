import styled from "styled-components";
import FloatingInput from "./FloatingInput";

const SignupEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    width: 350px;
    
`

const SignupEmailStep = ({formData, handleInputChange}: {formData : any, handleInputChange: any}) => {
    return (
        <SignupEmailWrapper>
            <FloatingInput type="email" placeholder="이메일 주소" name="email" value={formData.value} onChange={handleInputChange}></FloatingInput>
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep