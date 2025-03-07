import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import styled from "styled-components";
import UserInfoText from "./UserInfoText";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setChatRoom, setUserProfile} from "../../store/contentDetailSlice";

const StyledFriendProfile = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    // 드래그 방지
    user-select: none; 
    &:hover {
        background-color: #f1f1f1;
    }
`;

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    width: 60px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 60px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
`;

const ImageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px black solid;
    border-radius: 50%;
    padding: 3px;
`;


interface FriendProfileProps {
    userId: number;
    nickName: string;
    statusMessage: string;
    email: string;
    profileImageUrl: string;
}

const FriendProfile = ({userId, nickName, statusMessage, email, profileImageUrl}: FriendProfileProps) => {
    const dispatch = useDispatch();

    const handleProfileClick = () => {
        let chatRoomId =0;
        dispatch(setChatRoom({chatRoomId}));
        alert("채팅방 컴포넌트 on");
    }
    const handleImageClick = (e: React.MouseEvent, userId: number) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        alert(userId);
        dispatch(setUserProfile({userId: userId}));
    }

    return (
        <StyledFriendProfile onDoubleClick={() => handleProfileClick()}>
            <ImageWrapper onClick={(e: React.MouseEvent) => handleImageClick(e, userId)}>
                <StyledImage src={UserDefaultImage} alt="유저이미지"/>
                </ImageWrapper>
                <UserInfoText nickName={nickName} statusMessage={statusMessage} email={email} isMe={false}/>
        </StyledFriendProfile>
    )
}

export default FriendProfile