import styled, {keyframes} from "styled-components";
import ChatRoomCloseIcon from "../../assets/icons/close-icon.svg";
import ChatRoomSearchIcon from "../../assets/icons/search.svg";
import ChatRoomExitIcon from "../../assets/icons/exit.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {closeDetail} from "../../store/contentDetailSlice";
import {RootState} from "../../store";
// import {FaUsers} from "react-icons/fa6";
import IconButton2 from "../common/IconButton2";
import {useMemo, useRef, useState} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { FaUsers } from "react-icons/fa";

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

const StyledProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%; 
    object-fit: cover; 
    background-color: #f0f0f0; 
    margin-right: 5px;
`;

const PopoverWrapper = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 5px;
    &:hover {
        background-color: #f0f0f0;
        user-select: none;
    }
`;

const StyledNickname = styled.p`
    margin: 0;
    padding: 0;
    font-size: 14px;
`;

const MySelfIndicator = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #4A4A4A; 
    color: white; 
    display: flex;
    justify-content: center; 
    align-items: center;     
    font-size: 10px;
    font-weight: bold;
`;

const PopoverHeader = styled.p`
    font-size: 14px; 
    margin-bottom: 8px; 
    text-align: center;
    color: #888;
    margin-top: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0; 
`;

const softPulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(0.9);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
        opacity: 0.8;
    }
`;

const NicknameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; 
`;

const FocusDot = styled.div`
    width: 8px;
    height: 8px;
    background-color: #007bff; 
    border-radius: 50%;
    animation: ${softPulse} 2s infinite;

    position: relative;
    &:hover {
        animation: none; 
    }
    &:hover::after {
        content: attr(data-tooltip); 
        position: absolute;
        top: 200%; 
        left: 50%;
        transform: translateX(-50%); 
        background-color: #333; 
        color: white; 
        padding: 6px 10px; 
        border-radius: 5px;
        font-size: 13px;
        white-space: nowrap; 

        &::after {
            content: '';
            opacity: 0;
            pointer-events: none; 
        }
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
    const totalCount = currentParticipants?.length;
    const chatRoomName = currentChatRoom?.chatRoomName
        ?? currentChatRoom?.participants?.map(p => p.nickname).join(", ")
        ?? "알 수 없음";
    const loginUserId = useSelector((state:RootState) => state.user.id);
    const imageUrl = currentChatRoom?.chatRoomImageUrl || currentChatRoom?.participants[0].profileImageUrl || "알수 없음";
    console.log("Redux에서 가져온 chatRoomId:", currentChatRoomId);
    // 1. 팝어보 열림/닫힘 상태 관리
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    // 2. 팝오버와 버튼 영역을 참조할 Ref 생성
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // 2. '나'를 맨 위로 오도록 정렬된 새로운 배열 생성 (useMemo 사용)
    const sortedParticipants = useMemo(() => {
        // participants가 없으면 빈 배열 반환
        if (!currentParticipants) return [];

        // 원본 배열을 건드리지 않기 위해 복사본 생성!
        const copiedParticipants = [...currentParticipants];

        copiedParticipants.sort((a, b) => {
            if (a.userId === loginUserId) return -1; // a가 '나'라면 맨 앞으로
            if (b.userId === loginUserId) return 1;  // b가 '나'라면 맨 앞으로
            return a.nickname.localeCompare(b.nickname); // 나머지는 닉네임 가나다순 정렬
        });

        return copiedParticipants;
    }, [currentParticipants, loginUserId]); // participants나 userId가 바뀔 때만 재정렬

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
                    <PopoverHeader>참여자 목록 ({totalCount})</PopoverHeader>
                    {sortedParticipants.map(participant => (
                        <PopoverWrapper key={participant.userId}>
                            <StyledProfileImage src={participant.profileImageUrl || "이미지 없음"}/>
                            {loginUserId === participant.userId && <MySelfIndicator>나</MySelfIndicator>}
                            <NicknameContainer>
                            <StyledNickname>{participant.nickname}</StyledNickname>
                            <FocusDot data-tooltip="현재 이 채팅방을 보고 있어요."/>
                            </NicknameContainer>
                        </PopoverWrapper>
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