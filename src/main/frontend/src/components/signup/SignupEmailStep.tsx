import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import React from "react";
import {StyledErrorText} from "../common/ErrorText";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {updateField} from "../../store/signupSlice";
import FloatingLabelInput from "../common/FloatingLabelInput";

const SignupEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 15px;
    width: 350px;
`;
const SignupEmailStep = ({errorMessage}: { errorMessage: { [key: string]: string } }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.signup);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        dispatch(updateField({field: name as keyof typeof formData, value}));
    };

    return (
        <SignupEmailWrapper>
            <FloatingLabelInput type="email" placeholder="이메일 주소" name="email" value={formData.email}
                                onChange={handleInputChange}/>

            <StyledErrorText>
                {errorMessage && errorMessage.email ? errorMessage.email : " "}
            </StyledErrorText>
        </SignupEmailWrapper>
    )
}
export default SignupEmailStep