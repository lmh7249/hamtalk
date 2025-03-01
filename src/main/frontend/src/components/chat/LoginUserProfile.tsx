import styled from "styled-components";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import UserInfoText from "./UserInfoText";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const StyledUserProfile = styled.div`
    height: 200px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* 연한 테두리 */
`
const StyledUserProfileDetail = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    align-items: center;
`

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border: 2px solid rgba(255, 255, 255, 0.5); /* 연한 테두리 */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 3px;
`

const StyledUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: white;
`

const ProfileTitle = styled.h3`
    padding: 10px 10px 10px 20px;
    margin-bottom: 0;
`

const StyledUserNickName = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`
const StyledUserStatusMessage = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7); /* 상태 메시지는 연한 색상 */
`;

const StyledUserEmail = styled.div`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
`;

const LoginUserProfile = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <StyledUserProfile>
            <ProfileTitle>
                내 프로필
            </ProfileTitle>
            <StyledUserProfileDetail>
                <StyledImage src={UserDefaultImage} alt="유저이미지"/>
                <UserInfoText nickName={"임성규"} statusMessage={"연락하지마세요."} email={user.email} isMe={true}/>
            </StyledUserProfileDetail>
        </StyledUserProfile>
    )
}

export default LoginUserProfile