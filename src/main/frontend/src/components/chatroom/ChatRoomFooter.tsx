import styled from "styled-components";
import SendMessageIcon from "../../assets/icons/paper-plane.svg";
import React, {useState} from "react";
import ImageUploadIcon from "../../assets/icons/image-upload.svg";
import IconButton from "../common/IconButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {sendChatMessage} from "../../services/chat-service";

const StyledChatRoomFooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    height: 10%;
    align-items: center;
    background-color: white;

`

const ChatRoomTextArea = styled.textarea`
    flex-grow: 1;
    padding: 15px 45px 0 10px;
    border: transparent;
    background-color: #F2F2F2;
    outline: none;
    resize: none;
    font-size: 16px;
    border-radius: 10px;
    margin-left: 20px;
`;

const StyledTextAreaWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
`;

const IconAbsoluteWrapper = styled.div`
    display: flex;
    position: absolute;
    right: 15px;
`;

const SendIconWrapper = styled.div`
margin-right: 20px;
`;



const ChatRoomFooter = () => {
    const chatRoomData = useSelector((state:RootState) => state.detailContent.payload);
    const chatRoomId = chatRoomData.chatRoomId;
    const friendId = chatRoomData.friendId;
    const [message, setMessage] = useState<string>("");

    // 메세지 전송
    const sendMessage = async () => {
        // TODO: 만약 채팅방이 없다면, 채팅방 id를 먼저 생성(내 id와 친구 id), 채팅방id를 통해 값 삽입.
        if(!message.trim()) return;
        const response = await sendChatMessage(chatRoomId, message);
        setMessage("");
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    return (
        <StyledChatRoomFooterWrapper>
            <StyledTextAreaWrapper>
                <ChatRoomTextArea placeholder={"메시지를 입력해주세요."} onChange={handleMessageChange} value ={message}/>
                <IconAbsoluteWrapper>
                    <IconButton iconName={ImageUploadIcon} alt={"이미지 전송"} bgColor={"transparent"}
                                hoverBgColor={"#F2F2F2"}/>
                </IconAbsoluteWrapper>
            </StyledTextAreaWrapper>
            <SendIconWrapper>
                <IconButton iconName={SendMessageIcon} alt={"메세지 전송"} bgColor={"#2C2D31"} hoverBgColor={"#3A3B40"} onClick={sendMessage}/>
            </SendIconWrapper>
        </StyledChatRoomFooterWrapper>
    )
}

export default ChatRoomFooter;