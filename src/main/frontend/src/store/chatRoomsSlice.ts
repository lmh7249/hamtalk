import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Participant {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;  // profileImageUrl이 null일 수 있기 때문에
}

export interface ChatRoom {
    chatRoomId: number;
    chatRoomName: string | null;
    creatorId: number;
    participants: Participant[];  // participants 배열 추가
    lastMessage: string | null;
    lastMessageTime: string | null;
}

interface ChatRoomsState {
    chatRooms: ChatRoom[];
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

        // updateLastMessage(state, action: PayloadAction<UpdateLastMessagePayload>) {
        //     const { chatRoomId, lastMessage, lastMessageTime } = action.payload;
        //     const room = state.chatRooms.find((room) => room.chatRoomId === chatRoomId);
        //     if (room) {
        //         room.lastMessage = lastMessage;
        //         room.lastMessageTime = lastMessageTime;
        //     }
        //     //TODO: 해당 코드로 채팅방 리스트를 최신순으로 재정렬
        //     // 전체 배열 정렬 (O(n log n) 시간복잡도)
        //     // 만약 10개 채팅방이면 약 30-40번의 비교 발생
        //     state.chatRooms.sort((a, b) => {
        //         return new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime();
        //     })
        // },
        updateLastMessage(state, action: PayloadAction<UpdateLastMessagePayload>) {
            const { chatRoomId, lastMessage, lastMessageTime } = action.payload;

            const index = state.chatRooms.findIndex(room => room.chatRoomId === chatRoomId);
            if (index > -1) {
                const [updatedRoom] = state.chatRooms.splice(index, 1); // 해당 채팅방 제거
                updatedRoom.lastMessage = lastMessage;
                updatedRoom.lastMessageTime = lastMessageTime;
                state.chatRooms.unshift(updatedRoom); // 맨 앞으로 이동
            }
        }
    },
});


export const {setChatRooms, setLoading, setError, updateLastMessage} = chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;