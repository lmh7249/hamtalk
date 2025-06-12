import styled from "styled-components";
import React from "react";
import {findDirectChatRoom} from "../../services/chat-service";
import {openChatRoom, openUserProfile} from "../../store/contentDetailSlice";
import {useDispatch, useSelector} from "react-redux";
import {formatLastMessageTime} from "../../utils/formatTime";
import {RootState} from "../../store";
import {CurrentChatRoom, setCurrentChatRoom} from "../../store/chatRoomsSlice";
import {useQueryClient} from "@tanstack/react-query";
import {UnreadCountType} from "../../hooks/useUnreadCountsQuery";

const StyledChattingRoomItem = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 10px 10px 0;
    // 드래그 방지
    user-select: none;
    justify-content: space-between;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const StyledImage = styled.img`
    object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 조정 */
    border-radius: 50%;
    width: 60px; /* 부모 요소의 너비를 초과하지 않도록 설정 */
    max-height: 60px; /* 부모 요소의 높이를 초과하지 않도록 설정 */
`;

const ChatMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-overflow: ellipsis; // 잘린 부분에 ... 표시
    
    white-space: nowrap; // 텍스트를 줄바꿈하지 않게 만듦 (한 줄로 고정)
    max-width: 180px;
`;

const MessageMetaInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

`;

const ChatRoomName = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const LastMessage = styled.span`
    font-size: 14px;
    color: #666;
`;

const LastMessageTime = styled.span`
    font-size: 12px;
    color: #999;
`;

const UnreadCount = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    font-size: 12px;
    font-weight: bold;
    color: white;
    width: 18px;
    border-radius: 50%;
`;

const ImageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px black solid;
    border-radius: 50%;
    height: 60px;
`;

interface ChattingRoomItemProps {
    chatRoomId: number;
    unreadCount: number;
}

const ChatRoomItem = ({chatRoomId, unreadCount}: ChattingRoomItemProps) => {
    const dispatch = useDispatch();
    const chatRoom = useSelector((state: RootState) => state.chatRooms.chatRooms.find(room => room.chatRoomId === chatRoomId));
    const maxLength: number = 14;
    const queryClient = useQueryClient();

    if (!chatRoom) return null;

    // 채팅방 이름이 설정되어 있으면 그대로 사용하고, 설정되어 있지 않으면 참여자들의 이름을 합침
    const chatRoomName = chatRoom.chatRoomName
        ? chatRoom.chatRoomName // 채팅방 이름이 설정되어 있으면 그대로 사용
        : chatRoom.participants.map(participant => participant.nickname).join(", "); // 참여자들 이름 합치기

    //TODO: 추후에 채팅방 이미지 추출 방식 변경하기.
    const chatRoomImageUrl = chatRoom.participants[0].profileImageUrl;

    const displayLastMessage = chatRoom.lastMessage && chatRoom.lastMessage.length > maxLength
        ? `${chatRoom.lastMessage.slice(0, maxLength)}...`
        : chatRoom.lastMessage ?? "";

    const handleChatRoomDoubleClick = async () => {
        dispatch(openChatRoom(chatRoomId));
        console.log("채팅방 오픈" + chatRoomId);
        const currentChatRoom: CurrentChatRoom = {
            chatRoomId: chatRoom.chatRoomId,
            chatRoomName: chatRoomName,
            creatorId: chatRoom.creatorId,
            participants: chatRoom.participants,
            chatRoomImageUrl: chatRoomImageUrl,
        }
        dispatch(setCurrentChatRoom(currentChatRoom));

        // React Query 캐시에서 해당 채팅방의 unreadCount를 0으로 설정
        queryClient.setQueryData<UnreadCountType[]>(['unreadCounts'], (old) => {
            if (!old) return [];
            return old.map((item) =>
                item.chatRoomId === chatRoomId
                    ? { ...item, unreadCount: 0 }
                    : item
            );
        });

    };

    //TODO: userId가 배열로 들어올 때를 대비한 코드가 필요함.
    const handleProfileImageClick = (e: React.MouseEvent) => {
        e.stopPropagation(); //TODO: 상위 이벤트 전파 방지(= 이벤트 버블링 방지)
        // alert(participantIds);
        dispatch(openUserProfile(chatRoom.participants[0].userId));
    }

    return (
        <StyledChattingRoomItem
            onDoubleClick={() => handleChatRoomDoubleClick()}>
            <div style={{display: "flex", gap: "10px"}}>
                <ImageWrapper onClick={(e: React.MouseEvent) => handleProfileImageClick(e)}>
                    <StyledImage src={chatRoom.participants[0].profileImageUrl ?? undefined} alt={"채팅방 이미지"}></StyledImage>
                </ImageWrapper>
                <ChatMainInfo>
                    <ChatRoomName>{chatRoomName}</ChatRoomName>
                    <LastMessage>{displayLastMessage}</LastMessage>
                </ChatMainInfo>
            </div>
            <MessageMetaInfo>
                <LastMessageTime> {chatRoom.lastMessageTime ? formatLastMessageTime(chatRoom.lastMessageTime) : ""}</LastMessageTime>
                {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
            </MessageMetaInfo>
        </StyledChattingRoomItem>
    )
}


export default ChatRoomItem