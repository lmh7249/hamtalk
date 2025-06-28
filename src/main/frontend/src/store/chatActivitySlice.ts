import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";
import {getOnlineParticipants} from "../services/chat-service";

export interface ViewerProfile {
    userId: number;
    nickname: string;
    enteredAt: string;
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

export const fetchInitialViewers = createAsyncThunk(
    // 1. 이 비동기 액션의 고유한 이름 (타입 접두사)
    'chatActivity/fetchInitialViewers',

    // 2. 실제 비동기 작업을 처리하는 함수
    async (chatRoomId: number, thunkAPI) => {
        try {
            const viewers = await getOnlineParticipants(chatRoomId);
            return {chatRoomId: chatRoomId, viewers: viewers};
        } catch (error:any) {
            // 실패 시, 에러 메시지를 담아서 반환하면 'rejected' 액션의 payload가 됨
            return thunkAPI.rejectWithValue(error.message);
        }

    }

)

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

    // 비동기 액션의 결과를 처리하는 부분
    extraReducers: (builder) => {
        builder
            // 1. API 호출이 시작됐을 때 (pending 상태)
            .addCase(fetchInitialViewers.pending, (state) => {
                state.status = 'loading';
                state.error = null; // 이전 에러 초기화
            })
            // 2. API 호출이 성공적으로 끝났을 때 (fulfilled 상태)
            .addCase(fetchInitialViewers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload에는 Thunk에서 return한 값이 그대로 들어옴
                const { chatRoomId, viewers } = action.payload;
                state.viewersByChatRoomId[chatRoomId] = viewers;
            })
            // 3. API 호출이 실패했을 때 (rejected 상태)
            .addCase(fetchInitialViewers.rejected, (state, action) => {
                state.status = 'failed';
                // action.payload에는 Thunk에서 rejectWithValue로 전달한 값이 들어옴
                state.error = action.payload as string;
            });
    }
})

export const { userJoined, userLeft, clearRoomViewers } = chatActivitySlice.actions;
// --- Selector export (컴포넌트에서 편하게 쓰기 위함) ---
export const selectViewersByRoomId = (state: RootState, chatRoomId: number) =>
    state.chatActivity.viewersByChatRoomId[chatRoomId] || [];

export default chatActivitySlice.reducer;