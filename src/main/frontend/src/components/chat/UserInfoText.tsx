import styled from "styled-components";

const StyledUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StyledUserNickName = styled.div<UserInfoProps>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.isMe ? "#fff" : "#000")};
`;

const StyledUserStatusMessage = styled.div<UserInfoProps>`
    font-size: 14px;
    color: ${(props) => (props.isMe ? "rgba(255, 255, 255, 0.7)" : "#555")};
`;

const StyledUserEmail = styled.div<UserInfoProps>`
    font-size: 12px;
    color: ${(props) => (props.isMe ? "rgba(255, 255, 255, 0.5)" : "#777")};
`;

interface UserInfoTextProps extends UserInfoProps{
    nickName: string;
    statusMessage: string;
    email: string;
}

interface UserInfoProps {
    isMe: boolean;
}

const UserInfoText = ({nickName, statusMessage, email, isMe}: UserInfoTextProps) => {
    return (
        <StyledUserInfo>
            <StyledUserNickName isMe={isMe}>{nickName}</StyledUserNickName>
            <StyledUserStatusMessage isMe={isMe}>{statusMessage}</StyledUserStatusMessage>
            <StyledUserEmail isMe={isMe}>{email}</StyledUserEmail>
        </StyledUserInfo>
    )
}

export default UserInfoText