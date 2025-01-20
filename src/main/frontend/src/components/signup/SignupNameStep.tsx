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
const genderOptions = ["남성", "여성", "기타"];
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

const SignupNameStep = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: ''
    });

    // 입력 필드 업데이트를 위한 공통 핸들러
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const newValue = e.target.value; //TODO: 현재 입력된 값, 디버깅용 -> 삭제하기
        setFormData(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
        console.log("Updated formData:", {...formData, [field]: newValue}); // 업데이트된 상태 출력
    };

    return (
        <SignupNameWrapper>
            <FloatingInput type="text" placeholder="이름" value={formData.name} onChange={handleChange('name')}/>
            <StyledBirthday>
                <FloatingInput type="number" placeholder="년(4자)" value={formData.birthYear}
                               onChange={handleChange('birthYear')}/>
                <FloatingSelect placeholder="월" value={formData.birthMonth} options={monthOptions}
                                onChange={handleChange('birthMonth')}/>
                <FloatingInput type="number" placeholder="일" value={formData.birthDay}
                               onChange={handleChange('birthDay')}/>
            </StyledBirthday>
            <FloatingSelect placeholder="성별" value={formData.gender} options={genderOptions}
                            onChange={handleChange('gender')}/>
        </SignupNameWrapper>
    )
}

export default SignupNameStep