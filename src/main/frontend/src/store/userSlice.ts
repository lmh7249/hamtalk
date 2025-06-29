import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    id: number | null;
    email: string | null;
    roleId: number | null;
    nickname: string | null;
    statusMessage: string | null;
    profileImageUrl: string | null;
    isLoggingOut: boolean;
}

const initialState: UserState = {
    id: null,
    email: null,
    roleId: null,
    nickname: null,
    statusMessage: null,
    profileImageUrl: null,
    isLoggingOut: false,
};

interface LoginPayload {
    id: number;
    email: string;
    roleId: number;
}

export interface ProfileUpdatePayload {
    nickname?: string;
    profileImageUrl?: string;
    statusMessage?: string;
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
        logoutStart: (state) => {
            state.isLoggingOut = true;
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
        updateStatusMessage: (state, action) => {
            state.statusMessage = action.payload.statusMessage;
        },
        updateProfile: (state, action: PayloadAction<ProfileUpdatePayload>) => {
            const { nickname, profileImageUrl, statusMessage } = action.payload;
            if (nickname !== undefined) state.nickname = nickname;
            if (profileImageUrl !== undefined) state.profileImageUrl = profileImageUrl;
            if (statusMessage !== undefined) state.statusMessage = statusMessage;
        },

    },
});

export const {login, logoutStart, logout, updateNickname , updateStatusMessage, updateProfileImageUrl, updateProfile} = userSlice.actions;
export default userSlice.reducer;