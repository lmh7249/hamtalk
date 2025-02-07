import {createSlice} from "@reduxjs/toolkit";

export type MenuType = "friends" | "chats" | "settings";

export interface MenuState {
    selectedMenu: {
        key: MenuType;
        label: string;
    };
}

const initialState: MenuState = {
    selectedMenu: {key: "friends", label: "친구 목록"},
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
    },
});
export const {setMenu} = menuSlice.actions;
export default menuSlice.reducer;