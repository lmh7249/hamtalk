import styled from "styled-components";

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
`

const Input = ({type, placeholder, value, onChange}) => {
    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input