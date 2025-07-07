import styled from "styled-components";

interface IconButtonProps {
    icon: React.ReactNode;
    alt: string;
    bgColor: string;
    hoverBgColor: string;
    onClick?: () => void;
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

    // 아이콘 컴포넌트의 스타일을 직접 제어하고 싶을 때 사용
    // react-icons의 크기나 색상
    & > svg {
        width: 20px;
        height: 20px;
        fill: #333; // 아이콘 색상 지정 예시
    }
`;

const IconButton2 = ({icon, alt, bgColor, hoverBgColor, onClick}: IconButtonProps) => {
    return (
        <StyledButton bgColor={bgColor} hoverBgColor={hoverBgColor} onClick={onClick} aria-label={alt}>
            {icon}
        </StyledButton>
    )
}

export default IconButton2;