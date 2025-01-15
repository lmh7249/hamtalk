import styled from "styled-components";
import React from "react";

const StyledSelect = styled.select`
    padding: 15px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 18px;
    color: ${props => props.value ? '#000000' : '#a6a6a6'}; // 선택 여부에 따른 색상
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
`
export interface SelectProps {
    placeholder: string;
    // value: string;
    // onChange: React.ChangeEventHandler<HTMLSelectElement>;
}


const Select = ({placeholder} : SelectProps) => {
    return (
        <StyledSelect  defaultValue="">
            <option value="" disabled hidden>
                {placeholder}
            </option>
            <option value="1">1월</option>
            <option value="1">2월</option>
            <option value="1">3월</option>
        </StyledSelect>
    )
}
export default Select