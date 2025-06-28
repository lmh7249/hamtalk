import styled from "styled-components";
import {ParticipantProfileImage} from "./ChatRoomHeader";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {
    getChatMessageList, getLastReadAtList,
    getOnlineParticipants,
    notifyEnterChatRoom
} from "../../services/chat-service";
import {formatTime} from "../../utils/formatTime";
import {enterChatRoom, exitChatRoom, subscribeToChatRoom, unsubscribeFromChatRoom} from "../../utils/websocketUtil";
import dayjs from "../../utils/dayjs";
import toast from "react-hot-toast";

const StyledChatRoomBodyWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
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
        width: calc(50% - 100px);
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
    margin: 10px;
    max-width: 100%;
`;

const StyledChatMessageOtherContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 5px;
    margin: 10px;
    max-width: 100%;
`;

const StyledBubble = styled.div`
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.4;
    background-color: #FFFFFF;
    color: #222222;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 70%;
    word-wrap: break-word; // 추가
    word-break: break-word; // 추가
    white-space: pre-wrap; // 줄바꿈 문자 자동인식
    overflow-wrap: break-word; // 기존 속성 유지
`;

const StyledMessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const StyledTime = styled.span`
    font-size: 12px; // 글자 크기
    color: #8e8e93; // 회색 (가독성 좋은 색)
    font-weight: 500; // 중간 굵기
`;

const StyledUnreadCount = styled.span`
    color: #444444; // 글자색 (흰색)
    font-size: 10px; // 글자 크기
    font-weight: bold; // 굵은 글씨
    padding: 2px 6px; // 내부 여백
    border-radius: 10px; // 동그란 모양
    text-align: right; // 중앙 정렬
`;

const StyledUsername = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #444444;
`;


const StyledBubbleMine = styled(StyledBubble)`
    background-color: #DCF8C6; // 내 메시지 색상
    
`;

const StyledBubbleOther = styled(StyledBubble)`
    margin-right: 5px;
    
`;

const StyledUnreadCountOther = styled(StyledUnreadCount)`
    text-align: left;
    padding: 0;
`;

const StyledMessageContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledMessageRow = styled.div`
    display: flex;
`;

interface ChatDateDividerProps {
    date: string
}

const ChatDateDivider = ({date}: ChatDateDividerProps) => {
    return (
        <StyledDateContainer>
            <StyledDateText>{date}</StyledDateText>
        </StyledDateContainer>
    )
}


const ChatMessageMine = ({message, createdAt, totalParticipants, unreadCount}: ChatMessage) => {
    return (
        <StyledChatMessageMineContainer>
            <StyledMessageInfo>
                {unreadCount > 0 && <StyledUnreadCount>{unreadCount}</StyledUnreadCount>}
                <StyledTime>{formatTime(createdAt)}</StyledTime>
            </StyledMessageInfo>
            <StyledBubbleMine>
                {message}
            </StyledBubbleMine>
        </StyledChatMessageMineContainer>
    )
}


const ChatMessageOther = ({senderId, senderNickName, message, createdAt, profileImageUrl, totalParticipants, unreadCount}: ChatMessage) => {
    return (
        <StyledChatMessageOtherContainer>
            {/*TODO: alignSelf : 부모 요소가 display: flex or grid 일 때만 사용가능. 노션에 정리 */}
            <div style={{alignSelf: "center"}}>
                <ParticipantProfileImage src={profileImageUrl}/>
            </div>

            <StyledMessageContentWrapper>
                <StyledUsername>{senderNickName}</StyledUsername>
                <StyledMessageRow>
                    <StyledBubbleOther>{message}</StyledBubbleOther>
                    <StyledMessageInfo>
                        {unreadCount > 0 && <StyledUnreadCountOther>{unreadCount}</StyledUnreadCountOther>}
                        <StyledTime>{formatTime(createdAt)}</StyledTime>
                    </StyledMessageInfo>
                </StyledMessageRow>
            </StyledMessageContentWrapper>
        </StyledChatMessageOtherContainer>
    )
}

interface ChatMessage {
    messageId: string;
    senderId: number;
    senderNickName: string;
    profileImageUrl: string;
    message: string;
    createdAt: string;
    totalParticipants: number;
    unreadCount: number;
}

interface CurrentParticipants {
    chatRoomId: number;
    userId: number;
    nickname: string;
    enteredAt: string;
    // status: string;
}

interface LastReadAtEntry {
    userId: number;
    lastReadAt: string;
}

const ChatRoomBody = () => {
    const [loginUserId, setLoginUserId] = useState<number>(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);
    // 1. 특정 채팅방에 참여한 유저 정보(로그인한 본인 제외) 예: 2명이 존재하는 채팅방 -> 나 빼고 1명의 데이터만 존재
    const totalParticipants = Math.max((currentChatRoom?.participants.length ?? 0) - 1, 0);

    const loginUserNickname = useSelector((state:RootState) => state.user.nickname) ?? "알수없는 사용자";
    // 2. 특정 채팅방에 실시간으로 접속해 있는 유저(chatRoomId, userId, nickname)
    const [currentParticipants, setCurrentParticipants] = useState<CurrentParticipants[]>([]);
    // 3. 각 유저의 마지막 접속 시간을 관리하는 상태
    const [lastReadAtList, setLastReadAtList] = useState<LastReadAtEntry[]>([]);
    //TODO: 적절한 null 처리를 어떻게 할지 고민해보기.
    const chatRoomId = currentChatRoom?.chatRoomId ?? null;
    // 채팅창 스크롤바 위치를 위한 ref
    const chatRoomBodyRef = useRef<HTMLDivElement>(null);
    //TODO: 실시간성을 위한 추가
    const currentParticipantsRef = useRef<CurrentParticipants[]>([]);

    // state가 바뀔 때마다 ref도 업데이트
    useEffect(() => {
        currentParticipantsRef.current = currentParticipants;
    }, [currentParticipants]);

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('YYYY년 M월 D일');
    };

    useEffect(() => {
        if (!chatRoomId) {
            setMessages([]);
            setCurrentParticipants([]);
            currentParticipantsRef.current = [];
            return;
        }
        let chatSubscription: any = null;
        const fetchMessages = async () => {
            const response = await getChatMessageList(chatRoomId);
            setLoginUserId(response.loginUserId);
            console.log(response);
            setMessages(response.messages);
        }
        fetchMessages();
        notifyEnterChatRoom(chatRoomId);

        // 채팅방 구독로직.
        if(chatRoomId) {
            const fetchParticipantsAndLastReadAtList = async () => {
                const onlineParticipants = await getOnlineParticipants(chatRoomId);
                console.log("유저 목록:", onlineParticipants);
                setCurrentParticipants(onlineParticipants);
                currentParticipantsRef.current = onlineParticipants; // ref 값도 갱신
                const lastReadAtList = await getLastReadAtList(chatRoomId);
                setLastReadAtList(lastReadAtList);
                console.log("유저별 마지막 입장 시간 {}", lastReadAtList);
            };

            // 입장 알림 전송
            enterChatRoom(chatRoomId, loginUserNickname);
            fetchParticipantsAndLastReadAtList();

            chatSubscription = subscribeToChatRoom(chatRoomId, (receivedMessage) => {
                console.log("전달된 메세지: ", receivedMessage);

                // 1. 입장/퇴장 메시지인 경우
                if (receivedMessage.status === 'ENTERED') {
                    // 접속자 목록을 관리하는 상태가 있다면 여기서 추가/제거
                    toast.success(receivedMessage.nickname + "님이 입장했습니다.");
                    setCurrentParticipants(prev => {
                        // 이미 존재하는지 체크
                        const exists = prev.find(p => p.userId === receivedMessage.userId);
                        if (exists) return prev; // 중복 시 이전 상태 유지
                        // 없으면 새 유저 추가
                        const newParticipants = [...prev, {
                            chatRoomId: receivedMessage.chatRoomId,
                            userId: receivedMessage.userId,
                            nickname: receivedMessage.nickname,
                            enteredAt: receivedMessage.enteredAt,
                        }];
                        currentParticipantsRef.current = newParticipants;
                        // 메시지 unreadCount 재계산
                        setMessages(prevMessages => {
                            return prevMessages.map(msg => {
                                const defaultUnreadCount = totalParticipants;
                                const currentlyOnline = currentParticipantsRef.current.filter(p => p.userId !== msg.senderId);
                                const finalUnread = Math.max(defaultUnreadCount - currentlyOnline.length, 0);
                                return { ...msg, unreadCount: finalUnread };
                            });
                        });
                        return newParticipants;
                    });
                    return;
                }
                if (receivedMessage.status === 'EXITED') {
                    toast.success(`${receivedMessage.nickname}님이 퇴장했습니다.`);
                    setCurrentParticipants(prev => {
                        const updated = prev.filter(p => p.userId !== receivedMessage.userId);
                        currentParticipantsRef.current = updated; // 💡 ref 값도 같이 갱신
                        return updated;
                    });
                    return;
                }
                setMessages((prevMessages) =>{
                    // messageId로만 중복 체크 (내용이 아닌 고유 ID로)
                    const isAlreadyExists = prevMessages.some(msg =>
                        msg.messageId === receivedMessage.messageId
                    );
                    if (isAlreadyExists) {
                        return prevMessages;
                    }
                    const defaultUnreadCount = totalParticipants;
                    const currentlyOnline = currentParticipantsRef.current.filter(p => p.userId !== receivedMessage.senderId);
                    const finalUnread = Math.max(defaultUnreadCount - currentlyOnline.length, 0);
                    return [...prevMessages, {...receivedMessage, unreadCount: finalUnread}]});
            })
        }
        return () => {
            // 채팅방 구독 해제.
            if(chatSubscription) {
                unsubscribeFromChatRoom(chatSubscription);
            }
            exitChatRoom(chatRoomId, loginUserNickname);
            // 채팅방을 나갈때도, 접속 시간을 업데이트 해야 최신정보를 유지 가능.
            notifyEnterChatRoom(chatRoomId);
        };
    }, [chatRoomId]);

    // 내가 보낸 메시지일 경우에만 스크롤을 하단으로 이동
    useEffect(() => {
        if (chatRoomBodyRef.current) {
            chatRoomBodyRef.current.scrollTop = chatRoomBodyRef.current.scrollHeight;
        }
    }, [messages]);  // 메시지가 추가될 때마다 확인

    return (
        <StyledChatRoomBodyWrapper ref={chatRoomBodyRef}>
            {messages.map((message, index) => {
                const currentDate = formatDate(message.createdAt);
                const prevDate = index > 0 ? formatDate(messages[index - 1].createdAt) : null;
                const isFirstMessageOfDay = currentDate !== prevDate;

                return (
                    <React.Fragment key={message.messageId}>
                        {isFirstMessageOfDay && <ChatDateDivider date={currentDate} />}
                        {loginUserId === message.senderId ? (
                            <ChatMessageMine {...message} totalParticipants={totalParticipants}/>
                        ) : (
                            <ChatMessageOther {...message} totalParticipants={totalParticipants}/>
                        )}
                    </React.Fragment>
                );
            })}
        </StyledChatRoomBodyWrapper>
    )
}
export default ChatRoomBody;