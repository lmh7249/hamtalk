import {useMutation} from "@tanstack/react-query";
import {verifyChatRoom} from "../services/chat-service";
import {useDispatch} from "react-redux";
import {Participant, setCurrentChatRoom} from "../store/chatRoomsSlice";
import toast from "react-hot-toast";
import {openChatRoom} from "../store/contentDetailSlice";
import {closeAllModals, closeModal, openModal} from "../store/modalSlice";

export const useVerifyChatRoomMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: verifyChatRoom,
        onSuccess: data => {
            if(data.resultType === "EXISTING_DIRECT") {
                // 조회한 데이터를 redux 저장 + 채팅방 id로 해당 채팅방 컴포넌트 오픈
                dispatch(setCurrentChatRoom(data.currentChatRoom));
                dispatch(openChatRoom(data.currentChatRoom.chatRoomId));
                dispatch(closeModal());
                console.log(data);
            } else if (data.resultType === "EXISTING_GROUP") {
                // 기존 채팅방 있는데, 만들건지 또 다른 모달창을(더 작은)띄워서 yes or no 클릭해서 넘어가기 선택하면 모든 모달(채팅방 생성, 지금생긴 채팅방) 다 꺼버리고 조건에 맞는 채팅방 dispatch
                toast.error("이미 존재하는 그룹 채팅방이 있다!@@~@~@~@~");
                dispatch(openModal({
                    type:"confirmEnterChat",
                    props: {
                        exitsGroupChatRoom: data.currentChatRoom,
                        onGoToRoom: () => {
                            dispatch(setCurrentChatRoom(data.currentChatRoom));
                            dispatch(openChatRoom(data.currentChatRoom.chatRoomId));
                            dispatch(closeAllModals()); // 모든 모달 닫기
                        },
                        onCreateAnyway: () => {
                            dispatch(setCurrentChatRoom({
                                chatRoomId: null,
                                chatRoomName: null,
                                creatorId: null,
                                participants: data.currentChatRoom.participants,
                                chatRoomImageUrl: data.currentChatRoom.chatRoomImageUrl
                                }));
                            dispatch(openChatRoom(null));
                            dispatch(closeAllModals()); // 모든 모달 닫기
                        }
                    }
                }));
                console.log(data);
            } else if (data.resultType === "NEW") {
                // 이거도 그냥 새로운 채팅방 컴포넌트로 넘어가면 됨.
                toast.success("채팅방 새로 생성할 수 있어 할래 ???!?????");
                dispatch(setCurrentChatRoom(data.currentChatRoom));
                dispatch(openChatRoom(data.currentChatRoom.chatRoomId));
                dispatch(closeModal());
                console.log(data);
            }
            // dispatch(setCurrentChatRoom(data));
        },
        onError: error => {
            toast.error(error.message);
        }
    })
}

