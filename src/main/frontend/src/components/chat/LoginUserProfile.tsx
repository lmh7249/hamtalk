import styled from "styled-components";
import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import UserInfoText from "./UserInfoText";
import {useEffect, useState} from "react";
import {getMyProfile} from "../../services/user-service";
import testImage from "../../assets/images/img.png";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {updateProfile} from "../../store/userSlice";

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
    profileImageUrl: string;
}

const LoginUserProfile = () => {
    const myProfile = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let response  = await getMyProfile(); // 비동기 호출
                if (response  && response.data) {
                    dispatch(updateProfile({
                        nickname : response.data.nickname,
                        profileImageUrl: response.data.profileImageUrl,
                        stateMessage: response.data.stateMessage
                    }))
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
                    <StyledImage src={myProfile.profileImageUrl ?? ''} alt="유저이미지"/>
                    <UserInfoText nickName={myProfile.nickname ?? ''} statusMessage={myProfile.stateMessage ?? ''}
                                  email={myProfile.email} isMe={true}/>
                </StyledUserProfileDetail>
                :
                <div>프로필 불러오기 실패</div>
            }
        </StyledUserProfile>
    )
}

export default LoginUserProfile