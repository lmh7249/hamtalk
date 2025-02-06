import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import styled from "styled-components";
import UserInfoText from "./UserInfoText";

const StyledFriendProfile = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
`

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border: 1px black solid;
    border-radius: 50%;
    width: 60px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 60px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
    padding: 3px;
`

interface FriendProfileProps {
    nickName: string;
    statusMessage: string;
    email: string;
}

const FriendProfile = ({nickName, statusMessage, email}: FriendProfileProps) => {
    return (
        <StyledFriendProfile>
            <StyledImage src={UserDefaultImage} alt="유저이미지"/>
            <UserInfoText nickName={nickName} statusMessage={statusMessage} email={email} isMe={false}/>
        </StyledFriendProfile>
    )
}

export default FriendProfile