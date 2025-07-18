import styled from "styled-components";
import SendMessageIcon from "../../assets/icons/paper-plane.svg";
import React, {useState} from "react";
import ImageUploadIcon from "../../assets/icons/image-upload.svg";
import IconButton from "../common/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {sendChatMessageViaSocket} from "../../utils/websocketUtil";
import {createDirectChatRoom} from "../../services/chat-service";
import {openChatRoom} from "../../store/contentDetailSlice";
import {addChatRoom, CurrentChatRoom, setCurrentChatRoom, updateLastMessage} from "../../store/chatRoomsSlice";
import {useQueryClient} from "@tanstack/react-query";
import {Friend} from "../chat/ContentList";

const StyledChatRoomFooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    height: 10%;
    align-items: center;
    background-color: white;
    flex-shrink: 0;  //TODO: 다른 flex 자식 요소들의 공간이 부족해도 해당 css가 있는 영역은 줄어들지 않고 보장받음.
    //TODO: 즉, 채팅 내용이 많아져도 해당 풋터는 항상 height: 10%;을 보장받음.
`;

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
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);
    const senderId = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>("");
    const queryClient = useQueryClient();
    if(!currentChatRoom || !senderId) return;
    const chatRoomId = currentChatRoom.chatRoomId;
    const friendId = currentChatRoom.participants[0].userId;
    const friendProfileImageUrl = currentChatRoom.participants[0].profileImageUrl;
    // 메세지 전송
    const sendMessage = async () => {
        console.log("sendMessage 호출됨", new Date().getTime());
        if(!message.trim()) return;
        // TODO: 만약 채팅방이 없다면, 채팅방 id를 먼저 생성(내 id와 친구 id), 채팅방 id를 통해 값 삽입.
        console.log("채팅방이 존재할때는 상대방 id를 friendId로 조회: ", friendId);
        console.log("채팅방이 없을 경우 senderId: ", senderId);
       // TODO: 웹소켓 구독때문에, 채팅방 id가 없는 경우와 있는 경우로 나눌수 밖에 없음. -> 백엔드에서 한번에 처리 불가.
        const now = new Date().toISOString();

        //TODO: == -> null & undefined 포함. === -> null만 포함.
        if(chatRoomId == null) {
            console.log("챗룸id 없을때 실행된다.");
            // 1. 친구가 존재하는지 검증 먼저 진행. 리액트 쿼리에서 꺼내옴.
            const friends = queryClient.getQueryData<Friend[]>(['myFriends']);
            const friend = friends?.find(f => f.toUserId === friendId);
            if (!friend) {
                console.error("친구 데이터를 찾을 수 없습니다.");
                return;
            }
            // 2. 신규 채팅방 생성(백엔드에서 해당 채팅방 존재하는지 먼저 확인).
            const response = await createDirectChatRoom(friendId);
            const newChatRoomId = response.id;
            const chatRoomName = friend?.nickname ?? null;

            const currentChatRoom: CurrentChatRoom = {
                chatRoomId: response.id,  // 응답에서 받은 chatRoomId
                chatRoomName: chatRoomName,
                creatorId: response.creatorId,  // 응답에서 받은 creatorId
                participants: [
                    {
                        userId: friendId,
                        nickname: friend?.nickname,
                        profileImageUrl: friend?.profileImageUrl ?? null,
                    }
                ],                  // chatRoomName이 있을 수도 없을 수도 있음 response.chatRoomName || null
                chatRoomImageUrl: friendProfileImageUrl,
            };
            console.log("새로 생성된 chatRoomId: ", response);
            // 2. 리덕스에 chatroomid 업데이트하기. -> 이러면 구독이 되고, 렌더링도 되려나?
            dispatch(openChatRoom(newChatRoomId));
            dispatch(setCurrentChatRoom(currentChatRoom));
            // 3. sendChatMessageViaSocket stomp 함수 호출
            sendChatMessageViaSocket(response.id, message, friendId);

            //TODO: 채팅방 리스트 실시간 렌더링이 아니라 채팅방 리스트 자체에 넣어줘야 실시간 렌더링이 됨.
            dispatch(addChatRoom({
                chatRoomId: response.id,
                chatRoomName: null,
                creatorId: response.creatorId,
                participants: [{
                    userId: friendId,
                    nickname: friend?.nickname || "",
                    profileImageUrl: friend?.profileImageUrl ?? null,
                }],
                lastMessage: message,
                lastMessageTime: now,
            }));
        } else {
            // 기존 채팅방 있는 경우 바로 실시간 통신
            sendChatMessageViaSocket(chatRoomId ?? 0, message, friendId);
            dispatch(updateLastMessage({
                chatRoomId,
                lastMessage: message,
                lastMessageTime: now,
            }));
        }
        setMessage("");
    }
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    // Enter 키로 메시지 전송
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.ctrlKey) {
            e.preventDefault(); // 기본 Enter 동작(줄바꿈) 방지
            sendMessage();
        } else if(e.key === "Enter" && e.ctrlKey){
            setMessage((prevMessage) => prevMessage + "\n"); // 줄바꿈

        }
    };
    return (
        <StyledChatRoomFooterWrapper>
            <StyledTextAreaWrapper>
                <ChatRoomTextArea
                    placeholder={"메시지를 입력해주세요."}
                    onChange={handleMessageChange}
                    value ={message}
                    onKeyDown={handleKeyDown}
                />
                <IconAbsoluteWrapper>
                    <IconButton iconName={ImageUploadIcon}
                                alt={"이미지 전송"}
                                bgColor={"transparent"}
                                hoverBgColor={"#F2F2F2"}/>
                </IconAbsoluteWrapper>
            </StyledTextAreaWrapper>
            <SendIconWrapper>
                <IconButton iconName={SendMessageIcon}
                            alt={"메세지 전송"}
                            bgColor={"#2C2D31"}
                            hoverBgColor={"#3A3B40"}
                            onClick={sendMessage}/>
            </SendIconWrapper>
        </StyledChatRoomFooterWrapper>
    )
}

export default ChatRoomFooter;