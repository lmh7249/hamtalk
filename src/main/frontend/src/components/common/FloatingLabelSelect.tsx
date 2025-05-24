import React, { useState } from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SelectField = styled.select<{ $hasValue: boolean }>`
    width: 100%;
    height: 56px;
    padding: 25px 15px 5px; /* Floating input과 동일하게 */
    font-size: 18px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    outline: none;
    background: #fffc;
    appearance: none;
    cursor: pointer;
    box-sizing: border-box;
    
    color: ${({ $hasValue }) => ($hasValue ? "#000" : "#888")}; /* 선택 전 회색 */
    //line-height: 60px; /* 기본값이 중앙에 정렬되도록 */
  
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
`;

const SelectLabel = styled.label<{ $isActive: boolean }>`
    position: absolute;
    left: 15px;
    top: ${({ $isActive }) => ($isActive ? "1px" : "50%")};
    transform: translateY(${({ $isActive }) => ($isActive ? "1px" : "-50%")});
    font-size: ${({ $isActive }) => ($isActive ? "14px" : "18px")};
    color: ${({ $isActive }) => ($isActive ? "#ff527a" : "#888")};
    transition: 0.2s ease all;
    pointer-events: none;
    
`;

interface SelectProps {
    options: Array<{ value: string; label: string }> | string[];
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; //TODO : input 아니고 select 메모.
}

const FloatingLabelSelect = ({options, placeholder, name, value, onChange} : SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        if (!value) setIsFocused(false);
    };

    return (
        <SelectContainer>
            <SelectLabel $isActive={isFocused || !!value}>{placeholder}</SelectLabel>
            <SelectField
                value={value}
                $hasValue={!!value}
                name={name}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
            >
                {/* 빈 옵션을 항상 첫 번째로 두기 */}
                <option value="" disabled hidden></option>
                {options.map((option, index) => (
                    typeof option === 'string' ? (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ) : (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    )
                ))}
            </SelectField>
        </SelectContainer>
    );
};

export default FloatingLabelSelect;
