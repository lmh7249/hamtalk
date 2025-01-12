import styled from "styled-components";

const ButtonStyle = styled.button `
    background-color: #ffb6c1;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        //background-color: #ff5252;
        background-color: #ff527a;
    }
`


const Button = ({type, text}) => {
    return (
        <ButtonStyle type={type}>
            {text}
        </ButtonStyle>
    )
}
export default Button;