import styled from "styled-components";

interface ModalButtonProps {
    backgroundColor: string;
    color: string;
    hoverColor: string;
    onClick?: () => void;
}

const ModalButton = styled.button<ModalButtonProps>`
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: ${({color}) => color};
    background-color: ${({ backgroundColor }) => backgroundColor};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    
    &:hover {
        background-color: ${({ hoverColor }) => hoverColor};
        transform: translateY(-2px);
    }

    &:active {
        background-color: ${({ backgroundColor }) => backgroundColor};
        transform: translateY(0);
    }
`;

export default ModalButton;