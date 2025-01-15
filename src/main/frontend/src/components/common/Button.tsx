import styled from "styled-components";
import {NEXT, PREV, COMPLETE, LOGIN} from "../../constants/buttonstyle";
import {ButtonTypes} from "../../models/ButtonStyle";

const colorMap = {
    NEXT,
    PREV,
    COMPLETE,
    LOGIN
}

interface ButtonProps {
    type: ButtonTypes;  // "LOGIN" | "COMPLETE" | "NEXT" | "PREV" 중 하나만 가능!
    children: React.ReactNode;
}

const Button = styled.button<ButtonProps>`
    background-color: ${({type}) => colorMap[type].BUTTON.DEFAULT.BACKGROUND};
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: ${({type}) => colorMap[type].BUTTON.DEFAULT.COLOR};
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color:  ${({type}) => colorMap[type].BUTTON.HOVER.BACKGROUND};
    }

    &:active {
        background-color:  ${({type}) => colorMap[type].BUTTON.PRESSED.BACKGROUND};
    }
    
    &:disabled {
        background-color:  ${({type}) => colorMap[type].BUTTON.DISABLED.BACKGROUND};
    }
`
export default Button;