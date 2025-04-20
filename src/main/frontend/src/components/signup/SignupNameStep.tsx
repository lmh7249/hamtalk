import styled from "styled-components";
import React from "react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";
import {StyledErrorText} from "../common/ErrorText";

const SignupNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    max-width: 350px; /* 폼 최대 크기 제한 */
    box-sizing: border-box; 
    gap:30px;
    
`
const StyledBirthday = styled.div`
    display: flex;
    gap: 15px;
`

interface SignupNameStepProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errorMessage: {[key:string]: string};
}

interface FormData {
    name: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
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

const SignupNameStep = ({formData, handleInputChange, errorMessage}: SignupNameStepProps) => {

    return (
        <SignupNameWrapper>
            <FloatingInput type="text" placeholder="이름" name="name" value={formData.name} onChange={handleInputChange}/>
            {errorMessage && errorMessage.name && <StyledErrorText>{errorMessage.name}</StyledErrorText>}
                    <StyledBirthday>
                <FloatingInput type="number" placeholder="년(4자)" name="birthYear" value={formData.birthYear} min={1900} max={new Date().getFullYear()}
                               onChange={handleInputChange}/>
                <FloatingSelect placeholder="월" value={formData.birthMonth} name="birthMonth" options={monthOptions}
                                onChange={handleInputChange}/>
                        <FloatingInput type="number" placeholder="일" value={formData.birthDay} name ="birthDay" min={1} max={31}
                               onChange={handleInputChange}/>
                    </StyledBirthday>
            {errorMessage && errorMessage.birthDate && <StyledErrorText>{errorMessage.birthDate}</StyledErrorText>}
            <FloatingSelect placeholder="성별" value={formData.gender} options={genderOptions} name="gender"
                            onChange={handleInputChange}/>
            {errorMessage && errorMessage.gender && <StyledErrorText>{errorMessage.gender}</StyledErrorText>}
        </SignupNameWrapper>
    )
}

export default SignupNameStep