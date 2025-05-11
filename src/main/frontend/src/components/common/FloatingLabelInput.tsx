import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
    height: 30px;
  padding: 12px 10px;
  font-size: 16px;
  border: 1px solid #86868b;
  border-radius: 12px;
  outline: none;
  background: #fffc;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 10px;
    font-size: 12px;
    color: #000;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-55%);
  font-size: 16px;
  color: #888;
  transition: all 0.3s ease;
  pointer-events: none;
`;

//TODO: 아래 CSS 참고.
// 유효성검사 통과 못할 경우
// 해당 인풋 태그 색상
// background-color: #fff2f4;
// border-color: #e30000;
// border-radius: 12px

//TODO: 추후 회원가입 필드 해당 컴포넌트로 변경하는 리팩토링 진행.

const FloatingLabelInput: React.FC = () => {
    const [value, setValue] = useState("");

    return (
        <InputContainer>
            <InputField
                type="text"
                id="name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder=" " // placeholder를 비워놔야 label이 정상적으로 동작함
            />
            <InputLabel htmlFor="name">이름</InputLabel>
        </InputContainer>
    );
};





export default FloatingLabelInput;
