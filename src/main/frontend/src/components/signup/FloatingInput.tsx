import styled from "styled-components";
import { InputProps } from "../../models/InputProps";

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    min-width: 0; // 추가
`;

const StyledTextInput = styled.input`
    padding: 15px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    font-size: 18px;
    width: 100%;
    box-sizing: border-box; //TODO: 중요한 css, 패딩값까지 계산해서 너비를 지정하니 요소간 영역이 겹칠 경우 사용.
    
    &:focus {
        border-color: #ffb6c1;
        outline: none;
    }

    /* placeholder를 투명하게 만들어 라벨과 겹치지 않게 함 */
    &::placeholder {
        color: transparent;
    }

    /* input에 값이 있거나 focus 됐을 때는 padding-top을 늘려서 텍스트가 아래로 내려가게 함 */
    &:not(:placeholder-shown),
    &:focus {
        padding-top: 25px;
        padding-bottom: 5px;
    }
`;

const FloatingLabel = styled.label`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #a6a6a6;
    pointer-events: none;
    transition: 0.2s ease all;

    /* input에 값이 있거나 focus 됐을 때 라벨 스타일 */
    ${StyledTextInput}:focus ~ &,
    ${StyledTextInput}:not(:placeholder-shown) ~ & {
        top: 8px;
        left: 15px;
        font-size: 14px;
        color: #ff527a;
    }
`;

const FloatingInput = ({type, placeholder, name, value, onChange, onFocus }: InputProps) => {
    return (
        <InputContainer>
            <StyledTextInput
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
            />
            <FloatingLabel>{placeholder}</FloatingLabel>
        </InputContainer>
    );
}

export default FloatingInput;