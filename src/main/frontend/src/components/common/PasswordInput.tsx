import styled from "styled-components";
import {InputProps} from "../../models/InputProps";

// ({type, placeholder, value}) 중괄호 안넣으면
// props.type 이런식으로 값 받아야 함.

const StyledPasswordInput = styled.input`
    padding: 15px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 18px;
    width: 306.677px;
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
    &::placeholder {
        color: #a6a6a6;
    }
`



const PasswordInput = ({placeholder, onChange}: InputProps) => {
    return (
        <StyledPasswordInput
            type="password"
            placeholder={placeholder}
            onChange={onChange}
            // value={value}
            // onChange={onChange}
        />
    )
}

export default PasswordInput