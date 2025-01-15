import TextInput from "../common/TextInput";
import NumberInput from "../common/NumberInput";
import Select from "../common/Select";
import styled from "styled-components";
import {useState} from "react";

const SignupNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;      // 절대 위치
    right: 40px;
    gap: 30px;
    max-width: 350px; /* 폼 최대 크기 제한 */
    width: 100%; /* 부모에 맞게 반응형으로 */
`

const StyledBirthday = styled.div`
    display: flex;
    gap: 15px;
    width: 100%;  // 부모 컨테이너에 맞추기
    justify-content: space-between;
    & > * { /* 자식 요소 크기 제한 */
        flex: 1; /* 모든 요소가 동일한 비율로 크기 조정 */
        min-width: 70px; /* 최소 크기 */
    }
`
const SignupNameStep = () => {
    const maxYear = 2000;
    const [month, setMonth] = useState("");
    return (
        <SignupNameWrapper>
            <TextInput placeholder="이름"></TextInput>
            <StyledBirthday>
                <NumberInput placeholder="연"  ></NumberInput>
                <Select placeholder="월" ></Select>
                <NumberInput placeholder="일" ></NumberInput>
            </StyledBirthday>
            <Select placeholder="성별"></Select>
        </SignupNameWrapper>
    )
}

export default SignupNameStep