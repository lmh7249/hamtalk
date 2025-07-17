import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Participant {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;  // profileImageUrl이 null일 수 있기 때문에
}

//chatRoomImageUrl도 함께 관리하기?
export interface ChatRoom {
    chatRoomId: number;
    chatRoomName: string | null;
    creatorId: number ;
    participants: Participant[];  // participants 배열 추가
    lastMessage: string | null;
    lastMessageTime: string | null;
}

export interface CurrentChatRoom {
    chatRoomId: number | null;
    chatRoomName: string | null;
    creatorId: number | null;
    participants: Participant[];
    chatRoomImageUrl: string | null;
}

interface ChatRoomsState {
    // 2열 채팅방 리스트에서 활용
    chatRooms: ChatRoom[];
    //TODO: 현재 선택된 채팅방, 추후 채팅방을 여러개 띄울수 있는 기능 추가 시, 배열로 확장해야 함. ->  openedChatRooms: ChatRoom[];
    // 3열 현재 접속한 채팅방 정보
    currentChatRoom: CurrentChatRoom | null;
    loading: boolean;
    error: string | null;
}

interface UpdateLastMessagePayload {
    chatRoomId: number;
    lastMessage: string;
    lastMessageTime: string;
}

const initialState:ChatRoomsState = {
    chatRooms: [],
    currentChatRoom: null,
    loading: false,
    error: null,
}

const chatRoomsSlice = createSlice({
    name: "chatRooms",
    initialState,
    reducers: {
        setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
            state.chatRooms = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addChatRoom: (state, action: PayloadAction<ChatRoom>) => {
            const newRoom = action.payload;

            const exists = state.chatRooms.some(room => room.chatRoomId === newRoom.chatRoomId);
            if (!exists) {
                state.chatRooms.unshift(newRoom);
            }
        },
        updateLastMessage(state, action: PayloadAction<UpdateLastMessagePayload>) {
            const { chatRoomId, lastMessage, lastMessageTime } = action.payload;
            const index = state.chatRooms.findIndex(room => room.chatRoomId === chatRoomId);
            if (index > -1) {
                const [updatedRoom] = state.chatRooms.splice(index, 1); // 해당 채팅방 제거
                updatedRoom.lastMessage = lastMessage;
                updatedRoom.lastMessageTime = lastMessageTime;
                state.chatRooms.unshift(updatedRoom); // 맨 앞으로 이동
            }
        },

        removeChatRoom: (state, action: PayloadAction<number>) => {
            state.chatRooms = state.chatRooms.filter(
                room => room.chatRoomId != action.payload
            )
        },

        setCurrentChatRoom: (state, action: PayloadAction<CurrentChatRoom>) => {
            state.currentChatRoom = action.payload;
        },
        resetChatState: (state) => {
            state.chatRooms = [];
            state.currentChatRoom = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {setChatRooms, setLoading, setError, addChatRoom,updateLastMessage, removeChatRoom, setCurrentChatRoom, resetChatState} = chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;