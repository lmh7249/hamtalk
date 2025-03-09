import styled from "styled-components";
import {ParticipantProfileImage} from "./ChatRoomHeader";

const StyledChatRoomBodyWrapper = styled.div`
    flex-grow: 1;
`;

const StyledDateContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px 0;

    ::before, ::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        width: 40%;  
        height: 1px;
        background-color: rgb(114, 123, 131);
    }

    ::before {
        left: 10px;
        transform: translateY(-50%);
    }

    ::after {
        right: 10px;
        transform: translateY(-50%);
    }
`;

const StyledDateText = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #222222;
    padding: 6px 12px;
    background-color: white; /* 텍스트 배경을 흰색으로 설정해 선과 겹치지 않도록 */
    border-radius: 12px;
`;

const StyledChatMessageMineContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;

const StyledChatMessageOtherContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 5px;
`;

const StyledBubble = styled.div`
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.4;
    background-color: #FFFFFF;
    color: #222222;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledMessageInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTime = styled.span`
    font-size: 12px;            // 글자 크기
    color: #8e8e93;             // 회색 (가독성 좋은 색)
    font-weight: 500;           // 중간 굵기
`;

const StyledUnreadCount = styled.span`
    color: #444444;             // 글자색 (흰색)
    font-size: 10px;            // 글자 크기
    font-weight: bold;          // 굵은 글씨
    padding: 2px 6px;           // 내부 여백
    border-radius: 10px;        // 동그란 모양
    text-align: right;         // 중앙 정렬
`;

const StyledUsername = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #444444;
`;

const ChatDateDivider = () => {
    return (
        <StyledDateContainer>
            <StyledDateText>2025년 2월 12일</StyledDateText>
        </StyledDateContainer>
    )
}

const ChatMessageMine = () => {
    return (
        <StyledChatMessageMineContainer >
            <StyledMessageInfo>
                <StyledUnreadCount>1</StyledUnreadCount>
                <StyledTime>오후 12:00</StyledTime>
            </StyledMessageInfo>
            <StyledBubble>
                안녕 ㅎㅎ
            </StyledBubble>
        </StyledChatMessageMineContainer>
    )
}

const ChatMessageOther = () => {
    return (
        <StyledChatMessageOtherContainer>
            <ParticipantProfileImage/>
                <div>
                <StyledUsername>호날두</StyledUsername>
                <StyledBubble>안녕하세요?</StyledBubble>
                </div>
                <StyledMessageInfo>
                    <StyledUnreadCount>2</StyledUnreadCount>
                    <StyledTime>오후 12:51</StyledTime>
                </StyledMessageInfo>
        </StyledChatMessageOtherContainer>
    )
}

const ChatRoomBody = () => {
    return (
        <StyledChatRoomBodyWrapper>
            <ChatDateDivider/>
            <ChatMessageMine/>
            <ChatMessageOther/>
        </StyledChatRoomBodyWrapper>
    )
}
export default ChatRoomBody;