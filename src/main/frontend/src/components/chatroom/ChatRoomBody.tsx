import styled from "styled-components";
import {ParticipantProfileImage} from "./ChatRoomHeader";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {
    getChatMessageList, getLastReadAtList,
    getOnlineParticipants,
    notifyEnterChatRoom
} from "../../services/chat-service";
import {formatTime} from "../../utils/formatTime";
import {enterChatRoom, exitChatRoom, subscribeToChatRoom, unsubscribeFromChatRoom} from "../../utils/websocketUtil";
import dayjs from "../../utils/dayjs";
import toast from "react-hot-toast";
import {
    clearRoomViewers,
    fetchInitialViewers,
    selectViewersByRoomId,
    userJoined,
    userLeft,
    ViewerProfile
} from "../../store/chatActivitySlice";
import {Participant} from "../../store/chatRoomsSlice";

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


const ChatMessageMine = ({message, createdAt, unreadCount}: ChatMessage) => {
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


const ChatMessageOther = ({
                              senderId,
                              senderNickName,
                              message,
                              createdAt,
                              profileImageUrl,
                              unreadCount
                          }: ChatMessage) => {
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
    unreadCount: number;
}

interface CurrentParticipants {
    chatRoomId: number;
    userId: number;
    nickname: string;
    enteredAt: string;
    // status: string;
}

interface LastReadAtMap {
    [key: number]: string
}

interface LastReadAtEntry {
    userId: number;
    lastReadAt: string;
}

const ChatRoomBody = () => {
    const [loginUserId, setLoginUserId] = useState<number>(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    // 각 유저의 마지막 접속 시간을 관리하는 상태
    const [lastReadAtMap, setLastReadAtMap] = useState<LastReadAtMap>({});

    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);
    // 특정 채팅방에 참여한 유저 정보(로그인한 본인 제외) 예: 2명이 존재하는 채팅방 -> 나 빼고 1명의 데이터만 존재
    const loginUserNickname = useSelector((state: RootState) => state.user.nickname) ?? "알수없는 사용자";
    const chatRoomId = currentChatRoom?.chatRoomId ?? null;
    const participants = currentChatRoom?.participants ?? [];
    // Redux에서 실시간 접속자 목록 가져오기
    const currentViewers = useSelector((state: RootState) => {
        if (!chatRoomId) return [];
        return selectViewersByRoomId(state, chatRoomId);
    });
    // 채팅창 스크롤바 위치를 위한 ref
    const chatRoomBodyRef = useRef<HTMLDivElement>(null);
    const dispatch: AppDispatch = useDispatch();

    // Stale Closure 문제 해결을 위한 Refs
    // 콜백 함수 내에서 항상 최신 상태를 참조하기 위해 Ref를 사용
    const messagesRef = useRef(messages);
    const lastReadAtMapRef = useRef(lastReadAtMap);
    const participantsRef = useRef(participants);
    const viewersRef = useRef(currentViewers);
    const loginUserIdRef = useRef<number | null>(null); // 로그인 아이디도 Ref로 관리

// state가 변경될 때마다 ref의 current 값을 업데이트
    useEffect(() => { messagesRef.current = messages; }, [messages]);
    useEffect(() => { lastReadAtMapRef.current = lastReadAtMap; }, [lastReadAtMap]);
    useEffect(() => { participantsRef.current = participants; }, [participants]);
    useEffect(() => { viewersRef.current = currentViewers; }, [currentViewers]);

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('YYYY년 M월 D일');
    };

    useEffect(() => {
        // chatRoomId가 없으면 아무것도 하지 않음
        if (!chatRoomId) {
            setMessages([]);
            return;
        }
        let chatSubscription: any = null;

        // --- 1. 채팅방 초기화 함수 ---
        const initializeChatRoom = async () => {
            // 이전 채팅방 데이터 초기화
            setMessages([]);
            await notifyEnterChatRoom(chatRoomId);

            const [response, lastReadAtList, initialViewersResult] = await Promise.all([
                getChatMessageList(chatRoomId),
                getLastReadAtList(chatRoomId),
                dispatch(fetchInitialViewers(chatRoomId)).unwrap() // unwrap()으로 Promise의 payload를 기다립니다.
            ]);

            const initialViewers: ViewerProfile[] = initialViewersResult.viewers;

            const loginUserId = response.loginUserId;
            loginUserIdRef.current = loginUserId;

            const map = lastReadAtList.reduce((acc: LastReadAtMap, item: LastReadAtEntry) => { // acc, item 타입 명시
                acc[item.userId] = item.lastReadAt;
                return acc;
            }, {} as LastReadAtMap);
            setLastReadAtMap(map);

            // '실시간 접속자' 정보를 이용해 서버가 준 unreadCount를 최종 보정
            const correctedMessages = response.messages.map((msg: ChatMessage) => { // 💡 [TS 에러 수정 2] msg 타입 명시
                let correctedCount = msg.unreadCount;

                for (const viewer of initialViewers) {
                    if (viewer.userId === msg.senderId || viewer.userId === loginUserId) {
                        continue;
                    }

                    const viewerLastReadAt = map[viewer.userId];

                    if (viewerLastReadAt && new Date(viewerLastReadAt) < new Date(msg.createdAt) && correctedCount > 0) {
                        correctedCount--;
                    }
                }
                return { ...msg, unreadCount: correctedCount };
            });
            setMessages(correctedMessages);
        };
        // --- 2. 웹소켓 메시지 처리 핸들러 ---
        const handleReceivedMessage = (receivedMessage: any) => {
            // 메시지 타입에 따라 분기 처리
            // --- 로직 A: 다른 유저 입장 ---
            if (receivedMessage.status === 'ENTERED') {
                toast.success(`${receivedMessage.nickname}님이 입장했습니다.`);
                dispatch(userJoined({
                    chatRoomId: receivedMessage.chatRoomId,
                    user: {
                        userId: receivedMessage.userId,
                        nickname: receivedMessage.nickname,
                        enteredAt: receivedMessage.updatedLastReadAt,
                    }
                }))

                // '따라잡기' unreadCount 업데이트
                const newViewerId = receivedMessage.userId;
                const userLastReadAt = lastReadAtMapRef.current[newViewerId];

                if (userLastReadAt) {
                    setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            new Date(msg.createdAt) > new Date(userLastReadAt) && msg.unreadCount > 0
                                ? { ...msg, unreadCount: Math.max(0, msg.unreadCount - 1)}
                                : msg
                        )
                    );
                }
                return;
            }
            // --- 로직 B: 다른 유저 퇴장 ---
            if (receivedMessage.status === 'EXITED') {
                toast.success(`${receivedMessage.nickname}님이 퇴장했습니다.`);
                dispatch(userLeft({
                    chatRoomId: receivedMessage.chatRoomId,
                    userId: receivedMessage.userId
                }));

                // **[수정] 퇴장한 유저의 lastReadAt을 클라이언트 state에서도 즉시 업데이트**
                // 서버의 EXITED 메시지에 'updatedLastReadAt' 필드가 있다면 그것을 사용하고,
                // 없다면 클라이언트의 현재 시간을 사용합니다. 서버 시간을 사용하는 것이 더 정확
                const exitTime = receivedMessage.updatedLastReadAt || new Date().toISOString();
                setLastReadAtMap(prevMap => ({
                    ...prevMap,
                    [receivedMessage.userId]: exitTime
                }));
                return;
            }
            // --- 로직 C: 새로운 채팅 메시지 수신 ---
            setMessages(prevMessages => {
                const isAlreadyExists = prevMessages.some(msg => msg.messageId === receivedMessage.messageId);
                if (isAlreadyExists) return prevMessages;

                // Ref에서 최신 참여자/접속자 정보 가져오기
                const totalParticipants = participantsRef.current.length;
                const currentViewersCount = viewersRef.current.length;
                // 새 메시지 unreadCount 계산 (우리 원칙!)
                // 보낸 사람도 접속자에 포함되므로, (총인원 - 현재 접속자 수)로 간단히 계산
                const calculatedUnreadCount = Math.max(0, totalParticipants - currentViewersCount);

                const newMessage = {
                    ...receivedMessage,
                    unreadCount: calculatedUnreadCount,
                };
                return [...prevMessages, newMessage];
            });
        };

        // --- 3. 실행 로직 ---
        initializeChatRoom().then(() => {
            // 초기화가 끝난 후, 알림 전송 및 구독 시작
            enterChatRoom(chatRoomId, loginUserNickname);
            chatSubscription = subscribeToChatRoom(chatRoomId, handleReceivedMessage);
        });

        // --- 4. 클린업 함수 (컴포넌트 언마운트 또는 chatRoomId 변경 시) ---
        return () => {
            if (chatSubscription) {
                unsubscribeFromChatRoom(chatSubscription);
            }
            exitChatRoom(chatRoomId, loginUserNickname);
            notifyEnterChatRoom(chatRoomId)
            if (chatRoomId) {
                dispatch(clearRoomViewers({ chatRoomId }));
            }
        };
    }, [chatRoomId, dispatch]);

    // 내가 보낸 메시지일 경우에만 스크롤을 하단으로 이동
    useEffect(() => {
        if (chatRoomBodyRef.current) {
            chatRoomBodyRef.current.scrollTop = chatRoomBodyRef.current.scrollHeight;
        }
    }, [messages]);  // 메시지가 추가될 때마다 확인

    if (!chatRoomId) {
        return <p>채팅방을 선택해주세요.</p>;
    }
    return (
        <StyledChatRoomBodyWrapper ref={chatRoomBodyRef}>
            {messages.map((message, index) => {
                const currentDate = formatDate(message.createdAt);
                const prevDate = index > 0 ? formatDate(messages[index - 1].createdAt) : null;
                const isFirstMessageOfDay = currentDate !== prevDate;
                const loginUserId = loginUserIdRef.current;

                return (
                    <React.Fragment key={message.messageId}>
                        {isFirstMessageOfDay && <ChatDateDivider date={currentDate}/>}
                        {loginUserId === message.senderId ? (
                            <ChatMessageMine {...message}/>
                        ) : (
                            <ChatMessageOther {...message}/>
                        )}
                    </React.Fragment>
                );
            })}
        </StyledChatRoomBodyWrapper>
    )
}
export default ChatRoomBody;