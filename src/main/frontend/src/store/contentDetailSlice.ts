import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ContentDetailType = "empty" | "userProfile" | "chatRoom";

interface ContentDetailState {
    type: ContentDetailType;
    payload?: any;

}

export interface ChatRoomPayload {
    chatRoomId: number;
    creatorId: number;
    chatRoomName?: string | null;
    friendId: number;
    chatRoomImageUrl: string | null;
}

interface UserProfilePayload {
    userId: number;
    nickname: string;
}

const initialState : ContentDetailState = {
    type: "empty",
};

const contentDetailSlice = createSlice({
    name: "contentDetail",
    initialState,
    reducers: {
        setEmpty: (state) => {
            state.type = "empty";
            state.payload = undefined;
        },
        setUserProfile: (state, action: PayloadAction<{userId: number}>) => {
            state.type = "userProfile";
            state.payload = action.payload;
        },
        setChatRoom: (state, action: PayloadAction<ChatRoomPayload | UserProfilePayload>) => {
            state.type = "chatRoom";
            state.payload = action.payload;
        },
    },
});

export const {setEmpty, setUserProfile, setChatRoom} = contentDetailSlice.actions;
export default contentDetailSlice.reducer;