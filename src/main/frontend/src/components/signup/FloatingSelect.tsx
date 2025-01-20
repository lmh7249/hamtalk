import styled from "styled-components";
import {InputProps} from "../../models/InputProps";
import React, {useState} from "react";

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
    min-width: 0; // 추가
`;

const StyledSelect = styled.select<{ isFocused: boolean, value: string }>`
    padding: ${({isFocused}) => (isFocused ? '25px 15px 5px' : '15px')}; /* 라벨이 보이거나 포커스 되면 padding 변경 */
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 18px;
    width: 100%;

    /* placeholder 색상 제어를 위한 특별한 선택자 */
    &.placeholder {
        color: #a6a6a6;
    }
    
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }
`;

const FloatingLabel = styled.label<{ isFocus: boolean }>`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #a6a6a6;
    pointer-events: none;
    transition: 0.2s ease all;
    visibility: ${({isFocus}) => (isFocus ? "visible" : "hidden")}; /* 라벨이 없을 때는 숨김 */
    ${({isFocus}) =>
            isFocus &&
            `
        top: 8px;
        left: 15px;
        font-size: 14px;
        color: #ff527a;
    `}
`;

interface SelectProps {
    placeholder: string;
    value: string;
    options: Array<{ value: string; label: string }> | string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; //TODO : input 아니고 select 메모.
    onFocus?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FloatingSelect = ({placeholder, value, options, onChange, onFocus}: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };
    const handleBlur = () => {
// 포커스를 잃을 때는 isFocused만 false로 설정
        if (!value) { // 선택된 값이 없으면만 isFocused를 false로 설정
            setIsFocused(false);
        }
    };

    return (
        <SelectContainer>
            <StyledSelect
                value={value || ""}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocused}
                className={(!value || value === "default") ? "placeholder" : ""}>
                {!isFocused ?
                    <option value="default" hidden selected>{placeholder}</option>
                    :
                    <option value="default" hidden>{""}</option>
                }
                {/* options의 타입에 따라 다르게 처리 */}
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
            </StyledSelect>
            <FloatingLabel isFocus={isFocused}>{placeholder}</FloatingLabel>
        </SelectContainer>
    );
}

export default FloatingSelect;