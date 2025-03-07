import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../store/menuSlice";
import userReducer from "../store/userSlice";
import contentDetailReducer from "../store/contentDetailSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        detailContent: contentDetailReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;