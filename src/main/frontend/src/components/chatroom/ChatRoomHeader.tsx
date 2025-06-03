import styled from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {setEmpty} from "../../store/contentDetailSlice";
import {RootState} from "../../store";

const StyledChatRoomHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    height: 5%;
`;

const StyledChatRoomParticipantItemWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ParticipantProfileNickName = styled.span`
    font-weight: bold;
    font-size: 12px;
`;

export const ParticipantProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const ChatRoomButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ChatRoomParticipants = () => {
    return (
        <ChatRoomParticipantItem/>
    )
}

const ChatRoomParticipantItem = () => {
    const chatRoom = useSelector((state: RootState) => state.detailContent.payload);
    const chatRoom2 = useSelector((state:RootState) => state.chatRooms.chatRooms.find(room => room.chatRoomId === chatRoom.chatRoomId));
    // const chatRoomName = chatRoom?.chatRoomName || chatRoom?.nickName || "알수 없음";
    console.log("Redux에서 가져온 chatRoom:", chatRoom);

    if (!chatRoom2) return null;

    const chatRoomName = chatRoom2.chatRoomName
        ? chatRoom2.chatRoomName // 채팅방 이름이 설정되어 있으면 그대로 사용
        : chatRoom2.participants.map(participant => participant.nickname).join(", "); // 참여자들 이름 합치기

    return (
        <StyledChatRoomParticipantItemWrapper>
            <ParticipantProfileImage src={chatRoom.chatRoomImageUrl}/>
            <ParticipantProfileNickName>{chatRoomName}</ParticipantProfileNickName>
        </StyledChatRoomParticipantItemWrapper>
    )
}

const ChatRoomActions = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setEmpty());
    }

    return (
        <ChatRoomButtonWrapper>
            <IconButton iconName={ChatRoomSearchIcon} alt={"검색"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomExitIcon} alt={"채팅방 나가기"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomCloseIcon} alt={"채팅방 닫기"} bgColor="transparent" hoverBgColor="#F2F2F2" onClick={handleClose}/>
        </ChatRoomButtonWrapper>
    )
}

const ChatRoomHeader = () => {
    return (
        <StyledChatRoomHeaderWrapper>
            <ChatRoomParticipants/>
            <ChatRoomActions/>
        </StyledChatRoomHeaderWrapper>
    )
}

export default ChatRoomHeader;