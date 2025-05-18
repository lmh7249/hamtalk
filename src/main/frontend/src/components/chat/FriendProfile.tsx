import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import styled from "styled-components";
import UserInfoText from "./UserInfoText";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ChatRoomPayload, setChatRoom, setUserProfile} from "../../store/contentDetailSlice";
import {findDirectChatRoomApi} from "../../api/chat";
import {findDirectChatRoom} from "../../services/chat-service";
import {subscribeToChatRoom} from "../../utils/websocketUtil";
import testImg from "../../assets/images/img.png"

const StyledFriendProfile = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px 10px 0;
    // 드래그 방지
    user-select: none;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const ImageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px black solid;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    overflow: hidden; 
    box-sizing: border-box;
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

    const handleProfileDoubleClick = async () => {
        //TODO: profileImageUrl 함께 반환하기.
        const response = await findDirectChatRoom(userId);
        if (response === undefined || response === null) {
            dispatch(setChatRoom({userId, nickName}));
            return;
        }
        dispatch(setChatRoom({
            chatRoomId: response.chatRoomId,
            creatorId: response.creatorId,
            //TODO: null or undefined일 경우, 오른쪽 값 반환.
            chatRoomName: response.chatRoomName ?? nickName,
            friendId: response.friendId
        }));


    }

    const handleImageClick = (e: React.MouseEvent, userId: number) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        dispatch(setUserProfile({userId: userId}));
    }

    return (
        <StyledFriendProfile onDoubleClick={() => handleProfileDoubleClick()}>
            <ImageWrapper onClick={(e: React.MouseEvent) => handleImageClick(e, userId)}>
                <StyledImage src={profileImageUrl} alt="유저이미지"/>
            </ImageWrapper>
            <UserInfoText nickName={nickName} statusMessage={statusMessage} email={email} isMe={false}/>
        </StyledFriendProfile>
    )
}

export default FriendProfile