import React, {useState} from "react";
import styled from "styled-components";
import {InputProps} from "../../models/InputProps";

const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

const InputField = styled.input`
    width: 100%;
    font-size: 18px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    outline: none;
    background: #fffc;
    padding: 25px 15px 5px;
    box-sizing: border-box;

    &:focus + label,
    &:not(:placeholder-shown) + label {
        top: 10px;
        left: 15px;
        font-size: 14px;
        color: #ff527a;
    }
`;

const InputLabel = styled.label`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #888;
    transition: 0.2s ease all;
    pointer-events: none;
`;

const FloatingLabelInput = ({type, placeholder, name, value, min, max, onChange, onFocus, autoComplete }: InputProps) => {
    return (
        <InputContainer>
            <InputField
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                min = {min}
                max = {max}
                onFocus={onFocus}
                placeholder=""
                autoComplete={autoComplete}
                // placeholder를 비워놔야 label이 정상적으로 동작함
            />
            <InputLabel htmlFor="name" >{placeholder}</InputLabel>
        </InputContainer>
    );
};


export default FloatingLabelInput;
