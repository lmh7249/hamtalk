import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import {StyledErrorText} from "../common/ErrorText";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {updateField} from "../../store/signupSlice";
import FloatingLabelInput from "../common/FloatingLabelInput";

const PasswordInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 15px;
    box-sizing: border-box;
    width: 350px;
`;


const SignupPasswordStep = ({errorMessage}: { errorMessage: { [key: string]: string } }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.signup);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        dispatch(updateField({field: name as keyof typeof formData, value}));
    };

    return (
        <PasswordInputWrapper>
            <input type="text" name="username" autoComplete="username" style={{display: 'none'}}/>
            {/*콘솔 경고로인해 숨겨놓기만 하기.*/}

            <FloatingLabelInput type="password" placeholder="비밀번호 생성" name="password" value={formData.password}
                                onChange={handleInputChange} autoComplete="new-password"/>
            <FloatingLabelInput type="password" placeholder="확인" name="confirmPassword" value={formData.confirmPassword}
                                onChange={handleInputChange} autoComplete="new-password"/>

            <StyledErrorText>
                {errorMessage && errorMessage.password ? errorMessage.password : " "}
            </StyledErrorText>
        </PasswordInputWrapper>
    )
}

export default SignupPasswordStep