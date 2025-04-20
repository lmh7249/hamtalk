import styled from "styled-components";
import React from "react";

// ({type, placeholder, value}) 중괄호 안넣으면
// props.type 이런식으로 값 받아야 함.

const StyledInput = styled.input`
    padding: 15px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 18px;
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
    &::placeholder {
        color: #a6a6a6;
    }
`

interface NumberInputProps {
    placeholder: string;
    // value: number;
    // onChange: React.ChangeEvent<HTMLInputElement>;
    // min: number;
    // max: number;
    //  value, onChange, min, max 추후 추가 아래
}

const NumberInput = ({placeholder}: NumberInputProps) => {
    return (
        <StyledInput
            type="number"
            placeholder={placeholder}
        />
    )
}

export default NumberInput