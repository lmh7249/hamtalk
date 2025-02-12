import styled from "styled-components";

interface IconButtonProps {
    iconName: string;
    alt: string;
    bgColor: string;
    hoverBgColor: string;
}

interface StyledButtonProps {
    bgColor: string;
    hoverBgColor: string;
}

const StyledButton = styled.button<StyledButtonProps>`
    cursor: pointer;
    background-color: ${({bgColor}) => bgColor};
    border: none;
    border-radius: 10px;
    padding: 5px;
    &:hover{
        background-color: ${({hoverBgColor}) => hoverBgColor};
    }
`;

const StyledIconImage = styled.img`
    width: 20px;
    height: 20px;
    padding: 5px;
    align-items: center;
`;

const IconButton = ({iconName, alt, bgColor, hoverBgColor}: IconButtonProps) => {
    return (
        <StyledButton bgColor={bgColor} hoverBgColor={hoverBgColor}>
            <StyledIconImage src={iconName} alt={alt}/>
        </StyledButton>
    )
}

export default IconButton;