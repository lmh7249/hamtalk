import UserDefaultImage from "../../assets/images/UserDefaultImage.png";
import styled from "styled-components";
import UserInfoText from "./UserInfoText";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

import {openChatRoom, openUserProfile} from "../../store/contentDetailSlice";
import {findDirectChatRoom} from "../../services/chat-service";
import {useMyFriendsQuery} from "../../hooks/useMyFriendsQuery";
import {CurrentChatRoom, setCurrentChatRoom} from "../../store/chatRoomsSlice";

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
}

const FriendItem = ({userId}: FriendProfileProps) => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const isFriendsTab = selectedMenu.key === "friends";
    const {data: friends = [], isLoading, error} = useMyFriendsQuery(isFriendsTab);
    //TODO: Map으로 미리 변환해두면 더 빠름 (예: id -> friend)
    const friend = friends.find(friend => friend.toUserId === userId);
    const myProfile = useSelector((state: RootState) => state.user);
    if (!friend) return null;

    const handleProfileDoubleClick = async () => {
        if (!myProfile.id) {
            // 내 ID가 null이거나 유효하지 않으면 아무 작업도 하지 않고 함수를 종료
            console.error("사용자 정보가 올바르지 않아 채팅방을 열 수 없습니다.");
            return;
        }
        const participantsPayload = [
            { // 내 정보
                userId: myProfile.id,
                nickname: myProfile.nickname ?? '이름없음',
                profileImageUrl: myProfile.profileImageUrl,
            },
            { // 친구 정보
                userId: friend.toUserId,
                nickname: friend.nickname ?? '알 수 없는 친구',
                profileImageUrl: friend.profileImageUrl,
            }
        ];
        const response = await findDirectChatRoom(userId);
        let chatRoomToSet: CurrentChatRoom;
        if (response === undefined || response === null) {
            dispatch(openChatRoom(null));
            chatRoomToSet = {
                chatRoomId: null,
                chatRoomName: friend.nickname,
                creatorId: null,
                participants: participantsPayload,
                chatRoomImageUrl: friend.profileImageUrl,
            };
        } else {
            dispatch(openChatRoom(response.chatRoomId));
            //TODO: 여기도 dispatch로 이동할 채팅방 데이터 세팅하기.
            chatRoomToSet = {
                chatRoomId: response.chatRoomId,
                chatRoomName: response.chatRoomName,
                creatorId: response.creatorId,
                participants: participantsPayload,
                chatRoomImageUrl: friend.profileImageUrl,
            };
        }
        dispatch(setCurrentChatRoom(chatRoomToSet));
    }

    const handleImageClick = (e: React.MouseEvent, userId: number) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        dispatch(openUserProfile(userId));
    }

    return (
        <StyledFriendProfile onDoubleClick={() => handleProfileDoubleClick()}>
            <ImageWrapper onClick={(e: React.MouseEvent) => handleImageClick(e, userId)}>
                <StyledImage src={friend.profileImageUrl} alt="유저이미지"/>
            </ImageWrapper>
            <UserInfoText nickName={friend.nickname} statusMessage={friend.statusMessage} email={friend.email}
                          $isMe={false} statusLength={23}/>
        </StyledFriendProfile>
    )
}

export default FriendItem