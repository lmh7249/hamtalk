import styled from "styled-components";
import React, {ChangeEventHandler} from "react";

// ({type, placeholder, value}) 중괄호 안넣으면
// props.type 이런식으로 값 받아야 함.

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
    &::placeholder {
        color: #a6a6a6;
    }
`;

interface LoginInputProps{
    type: string;
    id: string;
    placeholder: string;
    value: string;
    maxLength: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    autoComplete: string;
}

export const LoginInput = ({type, id, placeholder, value, maxLength, onChange, autoComplete}: LoginInputProps) => {
    return (
        <StyledInput
            type={type}
            id = {id}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            autoComplete = {autoComplete}
        />
    );
};