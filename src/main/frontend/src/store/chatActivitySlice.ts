import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

interface ViewerProfile {
    userId: number;
    nickname: string;
    profileImageUrl: string;
}

interface ChatActivityState {
    viewersByChatRoomId: {
        // key는 숫자(채팅방 ID), value는 참여자 프로필 배열
        [key: number]: ViewerProfile[];
    };
    // API 호출 상태를 관리하기 위함
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ChatActivityState = {
    viewersByChatRoomId: {},
    status: 'idle',
    error: null,
};

const chatActivitySlice = createSlice({
    name: 'chatActivity',
    initialState,
    reducers: {
        // 1. WebSocket으로 유저 입장 메시지를 받았을 때
        userJoined: (state, action: PayloadAction<{ chatRoomId: number; user: ViewerProfile }>) => {
            const {chatRoomId, user} = action.payload;
            const roomViewers = state.viewersByChatRoomId[chatRoomId] || [];
            const existingUser = roomViewers.find(u => u.userId === user.userId);
            if (!existingUser) {
                state.viewersByChatRoomId[chatRoomId] = [...roomViewers, user];
            }
        },
        // 2. WebSocket으로 유저 퇴장 메시지를 받았을 때
        userLeft: (state, action: PayloadAction<{ chatRoomId: number; userId: number }>) => {
            const {chatRoomId, userId} = action.payload;
            const roomViewers = state.viewersByChatRoomId[chatRoomId];
            if (roomViewers) {
                state.viewersByChatRoomId[chatRoomId] = roomViewers.filter(user => user.userId !== userId);
            }

        },
        clearRoomViewers: (state, action: PayloadAction<{ chatRoomId: number }>) => {
            delete state.viewersByChatRoomId[action.payload.chatRoomId];
        },
    },
})

export const { userJoined, userLeft, clearRoomViewers } = chatActivitySlice.actions;
// --- Selector export (컴포넌트에서 편하게 쓰기 위함) ---
export const selectViewersByRoomId = (state: RootState, chatRoomId: number) =>
    state.chatActivity.viewersByChatRoomId[chatRoomId] || [];

export default chatActivitySlice.reducer;