import styled from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";

const StyledChatRoomHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    //border: solid 1px red;
    background-color: white;
    width: 100%;
    height: 5%;
`

const StyledChatRoomParticipantItemWrapper = styled.div`
    //border: 1px solid green;
    display: flex;
    align-items: center;
    gap: 5px;
`

const ChatRoomParticipants = () => {
    return (
        <ChatRoomParticipantItem/>
    )
}

const ParticipantProfileNickName = styled.span`
    font-weight: bold;
    font-size: 12px;
`

const ChatRoomParticipantItem = () => {
    return (
        <StyledChatRoomParticipantItemWrapper>
            <ParticipantProfileImage/>
            <ParticipantProfileNickName>참여자닉네임1</ParticipantProfileNickName>
        </StyledChatRoomParticipantItemWrapper>
    )
}

export const ParticipantProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid magenta;
`

const ChatRoomButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ChatRoomActions = () => {
    return (
        <ChatRoomButtonWrapper>
            <IconButton iconName={ChatRoomSearchIcon} alt={"검색"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomExitIcon} alt={"채팅방 나가기"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomCloseIcon} alt={"채팅방 닫기"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
        </ChatRoomButtonWrapper>
    )
}



const ChatRoomHeader = () => {
    return (
        <StyledChatRoomHeaderWrapper>
            <ChatRoomParticipants/>
            <ChatRoomActions/>
            {/*상단바: 검색 채팅방 닫기, 나가기 아이콘 등 넣기*/}
        </StyledChatRoomHeaderWrapper>

    )

}

export default ChatRoomHeader;