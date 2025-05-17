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
    $variant : ButtonTypes;  // "LOGIN" | "COMPLETE" | "NEXT" | "PREV" 중 하나만 가능!
    children: React.ReactNode;
}

const Button = styled.button<ButtonProps>`
    background-color: ${({$variant}) => colorMap[$variant].BUTTON.DEFAULT.BACKGROUND};
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: ${({$variant}) => colorMap[$variant].BUTTON.DEFAULT.COLOR};
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color:  ${({$variant}) => colorMap[$variant].BUTTON.HOVER.BACKGROUND};
    }

    &:active {
        background-color:  ${({$variant}) => colorMap[$variant].BUTTON.PRESSED.BACKGROUND};
    }
    
    &:disabled {
        background-color:  ${({$variant}) => colorMap[$variant].BUTTON.DISABLED.BACKGROUND};
        cursor: default;
    }
`;
export default Button;