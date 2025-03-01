import styled from "styled-components";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import UserInfoText from "./UserInfoText";
import {useEffect, useState} from "react";
import {getMyProfile} from "../../services/user-service";

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
`;

const ProfileTitle = styled.h3`
    padding: 10px 10px 10px 20px;
    margin-bottom: 0;
`;

interface MyProfile {
    nickname: string;
    stateMessage: string;
    email: string;
}

//TODO: 로그인 한 유저의 프로필 정보 api 호출, 추후 Redux로 관리할지, 이대로 사용할지 고민해보기.
// TODO: 유저 프로필 이미지 가져오기 수정해야함. -> 추후에 AWS S3에서 기본 이미지 or 유저프로필 이미지 링크 불러와서 삽입
const LoginUserProfile = () => {
    const [myProfile, setMyProfile] = useState<MyProfile|null>(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let myProfile = await getMyProfile(); // 비동기 호출
                if (myProfile && myProfile.data) {
                    setMyProfile(myProfile.data);
                }
            } catch (error) {
                console.error("프로필 로딩 실패:", error);
            }
        };
        fetchProfile(); // 비동기 함수 호출
    }, []);
    return (
        <StyledUserProfile>
            <ProfileTitle>
                내 프로필
            </ProfileTitle>
            {myProfile ?
                <StyledUserProfileDetail>
                    <StyledImage src={UserDefaultImage} alt="유저이미지"/>
                    <UserInfoText nickName={myProfile.nickname} statusMessage={myProfile.stateMessage}
                                  email={myProfile.email} isMe={true}/>
                </StyledUserProfileDetail>
                :
                <div>프로필 불러오기 실패</div>
            }
        </StyledUserProfile>
    )
}

export default LoginUserProfile