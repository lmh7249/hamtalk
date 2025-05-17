import styled from "styled-components";
import React from "react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";
import {StyledErrorText} from "../common/ErrorText";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {updateField} from "../../store/signupSlice";
import FloatingLabelSelect from "../common/FloatingLabelSelect";
import FloatingLabelInput from "../common/FloatingLabelInput";

const SignupNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    max-width: 350px; /* 폼 최대 크기 제한 */
    box-sizing: border-box;
    gap: 15px;

`
const StyledBirthday = styled.div`
    display: flex;
    gap: 15px;
`

interface SignupNameStepProps {
    errorMessage: { [key: string]: string };
}


const genderOptions = [
    {value: "M", label: "남성"},
    {value: "F", label: "여성"},
    {value: "O", label: "기타"}];

const monthOptions = [
    {value: '01', label: '1월'},
    {value: '02', label: '2월'},
    {value: '03', label: '3월'},
    {value: '04', label: '4월'},
    {value: '05', label: '5월'},
    {value: '06', label: '6월'},
    {value: '07', label: '7월'},
    {value: '08', label: '8월'},
    {value: '09', label: '9월'},
    {value: '10', label: '10월'},
    {value: '11', label: '11월'},
    {value: '12', label: '12월'}
];

const SignupNameStep = ({errorMessage}: SignupNameStepProps) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.signup);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        dispatch(updateField({field: name as keyof typeof formData, value}));
    };

    return (
        <SignupNameWrapper>
            <FloatingLabelInput type="text" placeholder="이름" name="name" value={formData.name}
                                onChange={handleInputChange}/>
            <StyledErrorText>
                {errorMessage && errorMessage.name ? errorMessage.name : " "}
            </StyledErrorText>
            <StyledBirthday>
                <FloatingLabelInput type="number" placeholder="년(4자)" name="birthYear" value={formData.birthYear}
                                    min={1900}
                                    max={new Date().getFullYear()}
                                    onChange={handleInputChange}/>
                <FloatingLabelSelect options={monthOptions} placeholder="월" value={formData.birthMonth}
                                     name="birthMonth" onChange={handleInputChange}/>

                <FloatingLabelInput type="number" placeholder="일" value={formData.birthDay} name="birthDay" min={1}
                                    max={31}
                                    onChange={handleInputChange}/>
            </StyledBirthday>
            <StyledErrorText>
                {errorMessage && errorMessage.birthDate ? errorMessage.birthDate : " "}
            </StyledErrorText>
            <FloatingLabelSelect options={genderOptions} placeholder="성별" value={formData.gender} name="gender"
                                 onChange={handleInputChange}/>
            <StyledErrorText>
                {errorMessage && errorMessage.gender ? errorMessage.gender : " "}
            </StyledErrorText>
        </SignupNameWrapper>
    )
}

export default SignupNameStep