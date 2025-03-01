import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../store/menuSlice";
import userReducer from "../store/userSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;