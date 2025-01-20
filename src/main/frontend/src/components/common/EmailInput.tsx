import styled from "styled-components";
import React from "react";

// ({type, placeholder, value}) 중괄호 안넣으면
// props.type 이런식으로 값 받아야 함.

const StyledEmailInput = styled.input`
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
interface EmailContainerProps {
    placeholder: string;
    // value:string;
    // onChange:React.ChangeEventHandler<HTMLInputElement>;
    // , value, onChange 추후에 아래 추가
}

const EmailInput = ({placeholder}: EmailContainerProps) => {
    return (
        <StyledEmailInput
            type="email"
            placeholder={placeholder}
            // value={value}
            // onChange={onChange}
        />
    )
}

export default EmailInput