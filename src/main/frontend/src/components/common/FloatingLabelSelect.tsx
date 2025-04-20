import React, { useState } from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SelectField = styled.select<{ hasValue: boolean }>`
    width: 100%;
    height: 60px;
    padding: 0 10px; /* padding-top 대신 line-height 사용 */
    font-size: 16px;
    border: 1px solid #86868b;
    border-radius: 12px;
    outline: none;
    background: #fffc;
    appearance: none;
    cursor: pointer;
    color: ${({ hasValue }) => (hasValue ? "#000" : "#888")}; /* 선택 전 회색 */
    line-height: 60px; /* 기본값이 중앙에 정렬되도록 */
`;

const SelectLabel = styled.label<{ isActive: boolean }>`
    position: absolute;
    left: 10px;
    top: ${({ isActive }) => (isActive ? "1px" : "50%")};
    transform: translateY(${({ isActive }) => (isActive ? "0" : "-55%")});
    font-size: ${({ isActive }) => (isActive ? "12px" : "16px")};
    color: ${({ isActive }) => (isActive ? "#000" : "#888")};
    transition: all 0.3s ease;
    pointer-events: none;
`;

//TODO: 추후 회원가입 필드 해당 컴포넌트로 변경하는 리팩토링 진행.
const FloatingLabelSelect: React.FC = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        if (!value) setIsFocused(false);
    };

    return (
        <SelectContainer>
            <SelectLabel isActive={isFocused || !!value}>성별</SelectLabel>
            <SelectField
                value={value}
                hasValue={!!value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
            >
                {/* 빈 옵션을 항상 첫 번째로 두기 */}
                <option value="" disabled hidden></option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
            </SelectField>
        </SelectContainer>
    );
};

export default FloatingLabelSelect;
