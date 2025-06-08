import styled from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {closeDetail} from "../../store/contentDetailSlice";
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
    const currentChatRoomId = useSelector((state: RootState) => state.detailContent.chatRoomId);
    const currentChatRoom = useSelector((state:RootState) => state.chatRooms.currentChatRoom);
    const chatRoomName = currentChatRoom?.chatRoomName
        ?? currentChatRoom?.participants?.map(p => p.nickname).join(", ")
        ?? "알 수 없음";

    const imageUrl = currentChatRoom?.chatRoomImageUrl || currentChatRoom?.participants[0].profileImageUrl || "알수 없음";
    console.log("Redux에서 가져온 chatRoomId:", currentChatRoomId);

    return (
        <StyledChatRoomParticipantItemWrapper>
            <ParticipantProfileImage src={imageUrl}/>
            <ParticipantProfileNickName>{chatRoomName}</ParticipantProfileNickName>
        </StyledChatRoomParticipantItemWrapper>
    )
}

const ChatRoomActions = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeDetail());
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