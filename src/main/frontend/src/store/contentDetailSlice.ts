import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 현재 보고있는 3열의 뷰 정보, 뷰를 위한 최소한의 값만 지니고 있어야 함(type, id)
type ContentDetailType = "empty" | "userProfile" | "chatRoom";

interface ContentDetailState {
    type: ContentDetailType;
    userId?: number;  // userProfile 사용
    chatRoomId?: number | null; // chatRoom 사용
}

const initialState : ContentDetailState = {
    type: "empty",
};

const contentDetailSlice = createSlice({
    name: "contentDetail",
    initialState,
    reducers: {
        openUserProfile: (state, action: PayloadAction<number>) => {
            state.type = "userProfile";
            state.userId = action.payload;
        },
        openChatRoom: (state, action: PayloadAction<number|null>) => {
            state.type = "chatRoom";
            state.chatRoomId = action.payload;
        },
        closeDetail: (state) => {
            state.type = "empty";
            state.userId = undefined;
            state.chatRoomId = undefined;
        },
    },
});

export const {closeDetail, openUserProfile, openChatRoom} = contentDetailSlice.actions;
export default contentDetailSlice.reducer;