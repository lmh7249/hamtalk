import styled from "styled-components";
import React, {useState} from "react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";

const SignupNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // 절대 위치
    gap: 30px;
    max-width: 350px; /* 폼 최대 크기 제한 */
    box-sizing: border-box; 
    
`
const StyledBirthday = styled.div`
    display: flex;
    gap: 15px;
`
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

const SignupNameStep = ({formData, handleInputChange}: {formData : any, handleInputChange: any}) => {
    return (
        <SignupNameWrapper>
            <FloatingInput type="text" placeholder="이름" name="name" value={formData.name} onChange={handleInputChange}/>
            <StyledBirthday>
                <FloatingInput type="number" placeholder="년(4자)" name="birthYear" value={formData.birthYear}
                               onChange={handleInputChange}/>
                <FloatingSelect placeholder="월" value={formData.birthMonth} name="birthMonth" options={monthOptions}
                                onChange={handleInputChange}/>
                <FloatingInput type="number" placeholder="일" value={formData.birthDay} name ="birthDay"
                               onChange={handleInputChange}/>
            </StyledBirthday>
            <FloatingSelect placeholder="성별" value={formData.gender} options={genderOptions} name="gender"
                            onChange={handleInputChange}/>
        </SignupNameWrapper>
    )
}

export default SignupNameStep