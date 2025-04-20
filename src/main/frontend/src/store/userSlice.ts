import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    id: number | null;
    email: string | null;
    roleId: number | null;
    nickname: string | null;
    stateMessage: string | null;
    profileImageUrl: string | null;
}

const initialState: UserState = {
    id: null,
    email: null,
    roleId: null,
    nickname: null,
    stateMessage: null,
    profileImageUrl: null,
};

interface LoginPayload {
    id: number;
    email: string;
    roleId: number;
}

interface ProfileUpdatePayload {
    nickname?: string;
    profileImageUrl?: string;
    stateMessage?: string;
}

const userSlice = createSlice({
    name: "user", // 리덕스 스토어에서 사용할 이름.
    initialState, // 초기 상태
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.roleId = action.payload.roleId;
        },
        logout: (state) => {
            return initialState; // 모두 null 처리해주기.
        },

        updateNickname: (state, action) => {
            state.nickname = action.payload.nickname;
        },

        updateProfileImageUrl: (state, action) => {
            state.profileImageUrl = action.payload.profileImageUrl;
        },
        updateStateMessage: (state, action) => {
            state.stateMessage = action.payload.stateMessage;
        },

        updateProfile: (state, action: PayloadAction<ProfileUpdatePayload>) => {
            const { nickname, profileImageUrl, stateMessage } = action.payload;
            if (nickname !== undefined) state.nickname = nickname;
            if (profileImageUrl !== undefined) state.profileImageUrl = profileImageUrl;
            if (stateMessage !== undefined) state.stateMessage = stateMessage;
        },

    },
});

export const {login, logout, updateNickname , updateStateMessage, updateProfileImageUrl, updateProfile} = userSlice.actions;
export default userSlice.reducer;