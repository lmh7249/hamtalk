import styled from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {setEmpty} from "../../store/contentDetailSlice";
import {RootState} from "../../store";
import testImage from "../../assets/images/UserDefaultImage.png";

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

const ChatRoomParticipants = () => {
    return (
        <ChatRoomParticipantItem/>
    )
}

const ParticipantProfileNickName = styled.span`
    font-weight: bold;
    font-size: 12px;
`;

const ChatRoomParticipantItem = () => {
    const chatRoom = useSelector((state: RootState) => state.detailContent.payload);
    const chatRoomName = chatRoom?.chatRoomName || chatRoom?.nickName || "알수 없음";
    console.log("Redux에서 가져온 chatRoom:", chatRoom);
    return (
        <StyledChatRoomParticipantItemWrapper>
            <ParticipantProfileImage src={testImage}/>
            <ParticipantProfileNickName>{chatRoomName}</ParticipantProfileNickName>
        </StyledChatRoomParticipantItemWrapper>
    )
}

export const ParticipantProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const ChatRoomButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;



const ChatRoomActions = () => {
    let dispatch = useDispatch();

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