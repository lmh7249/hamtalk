import styled from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {closeDetail} from "../../store/contentDetailSlice";
import {RootState} from "../../store";
import {FaUsers} from "react-icons/fa6";
import IconButton2 from "../common/IconButton2";
import { useRef, useState} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const StyledChatRoomHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    height: 5%;
`;

const StyledChatRoomParticipantItemWrapper = styled.div`
    position: relative; // 팝오버의 기준점
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

// 아이콘 버튼을 감싸서 Ref를 달아줄 컨테이너
const IconWrapper = styled.div`

`;

// 팝오버 '빈 창' 스타일
const StyledPopoverContainer = styled.div`
    position: absolute;
    top: calc(100% + 8px); // 버튼 바로 아래에서 8px 떨어진 위치
    right: 0;
    left: 50%;
    width: 250px;
    background-color: white;
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    z-index: 100;
    padding: 8px;
`;

const ChatRoomParticipants = () => {
    return (
        <ChatRoomParticipantItem/>
    )
}

const ChatRoomParticipantItem = () => {
    const currentChatRoomId = useSelector((state: RootState) => state.detailContent.chatRoomId);
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);
    const currentParticipants = currentChatRoom?.participants;
    const chatRoomName = currentChatRoom?.chatRoomName
        ?? currentChatRoom?.participants?.map(p => p.nickname).join(", ")
        ?? "알 수 없음";
    const imageUrl = currentChatRoom?.chatRoomImageUrl || currentChatRoom?.participants[0].profileImageUrl || "알수 없음";
    console.log("Redux에서 가져온 chatRoomId:", currentChatRoomId);
    // 1. 팝어보 열림/닫힘 상태 관리
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    // 2. 팝오버와 버튼 영역을 참조할 Ref 생성
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);


    // 3. 바깥 영역 클릭 감지를 위한 useEffect
    // "popoverRef 바깥을 클릭하면, 팝오버를 닫아줘!" 라는 의미.
    // 예외 처리할 영역인 popoverRef와 triggerRef를 배열로 묶어서 전달
    useOnClickOutside([popoverRef, triggerRef], () => setIsPopoverOpen(false));
    return (
        <StyledChatRoomParticipantItemWrapper>
            <ParticipantProfileImage src={imageUrl}/>
            <ParticipantProfileNickName>{chatRoomName}</ParticipantProfileNickName>
            <IconWrapper ref={triggerRef}>
                <IconButton2 icon={<FaUsers/>} alt={"참여자 목록 보기"} bgColor="transparent" hoverBgColor="#F2F2F2"  onClick={() => setIsPopoverOpen(!isPopoverOpen)}/>
            </IconWrapper>
            {isPopoverOpen && (
                <StyledPopoverContainer ref={popoverRef}>
                    <p style={{ textAlign: 'center', color: '#888' }}>참여자 목록</p>
                    {currentParticipants && currentParticipants.map(participant => (
                        <div key={participant.userId}>
                            {/*<img src={participant.profileImageUrl}/>*/}
                            <p>{participant.nickname}</p>
                            <p>{participant.userId}</p>
                        </div>


                    ))}
                </StyledPopoverContainer>
            )}
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
            {/*TODO: IconButton2 해당 컴포넌트로 모두 리팩토링 진행하고 컴포넌트명도 변경하기, 기존 IconButton 컴포넌트 삭제 필수*/}
            <IconButton iconName={ChatRoomSearchIcon} alt={"검색"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomExitIcon} alt={"채팅방 나가기"} bgColor="transparent" hoverBgColor="#F2F2F2"/>
            <IconButton iconName={ChatRoomCloseIcon} alt={"채팅방 닫기"} bgColor="transparent" hoverBgColor="#F2F2F2"
                        onClick={handleClose}/>
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