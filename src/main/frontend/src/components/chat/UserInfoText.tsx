import styled from "styled-components";

const StyledUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 250px;
`;

const StyledUserNickName = styled.div<UserInfoProps>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.$isMe ? "#fff" : "#000")};
`;

const StyledUserStatusMessage = styled.div<UserInfoProps>`
    font-size: 14px;
    text-overflow: ellipsis; // 잘린 부분에 ... 표시
    overflow: hidden; // 넘치는 텍스트를 잘라냄
    white-space: nowrap; // 텍스트를 줄바꿈하지 않게 만듦 (한 줄로 고정)
    color: ${(props) => (props.$isMe ? "rgba(255, 255, 255, 0.7)" : "#555")};
`;

const StyledUserEmail = styled.div<UserInfoProps>`
    font-size: 12px;
    color: ${(props) => (props.$isMe ? "rgba(255, 255, 255, 0.5)" : "#777")};
`;

interface UserInfoTextProps extends UserInfoProps{
    nickName: string;
    statusMessage: string;
    email: string | null;
    statusLength: number;
}

interface UserInfoProps {
    $isMe: boolean;
}

const UserInfoText = ({nickName, statusMessage, email, $isMe, statusLength}: UserInfoTextProps) => {
    const maxLength: number = statusLength;

    const displayStatusMessage = statusMessage.length > maxLength
        ? `${statusMessage.slice(0, maxLength)}...`
        : statusMessage;

    return (
        <StyledUserInfo>
            <StyledUserNickName $isMe={$isMe}>{nickName}</StyledUserNickName>
            <StyledUserStatusMessage $isMe={$isMe}>{displayStatusMessage}</StyledUserStatusMessage>
            <StyledUserEmail $isMe={$isMe}>{email}</StyledUserEmail>
        </StyledUserInfo>
    )
}

export default UserInfoText