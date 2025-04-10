import {createSlice} from "@reduxjs/toolkit";

interface UserState {
    id: number | null;
    email: string | null;
    roleId: number | null;
}

const initialState: UserState = {
    id: null,
    email: null,
    roleId: null,
};

const userSlice = createSlice({
    name: "user", // 리덕스 스토어에서 사용할 이름.
    initialState, // 초기 상태
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.roleId = action.payload.roleId;
        },
        logout: (state) => {
            state.id = null;
            state.email = null;
            state.roleId = null;
        },
    },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;