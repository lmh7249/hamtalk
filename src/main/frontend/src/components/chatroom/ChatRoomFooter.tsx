import styled from "styled-components";
import SendMessageIcon from "../../assets/icons/paper-plane.svg";
import React from "react";
import ImageUploadIcon from "../../assets/icons/image-upload.svg";
import IconButton from "../common/IconButton";

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

`

const ChatRoomFooter = () => {
    return (
        <StyledChatRoomFooterWrapper>
            <StyledTextAreaWrapper>
                <ChatRoomTextArea placeholder={"메시지를 입력해주세요."}/>
                <IconAbsoluteWrapper>
                    <IconButton iconName={ImageUploadIcon} alt={"이미지 전송"} bgColor={"transparent"}
                                hoverBgColor={"#F2F2F2"}/>
                </IconAbsoluteWrapper>
            </StyledTextAreaWrapper>
            <SendIconWrapper>
                <IconButton iconName={SendMessageIcon} alt={"메세지 전송"} bgColor={"#2C2D31"} hoverBgColor={"#3A3B40"}/>
            </SendIconWrapper>
        </StyledChatRoomFooterWrapper>
    )
}

export default ChatRoomFooter;