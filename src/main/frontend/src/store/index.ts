import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../store/menuSlice";
import userReducer from "../store/userSlice";
import contentDetailReducer from "../store/contentDetailSlice";
import signupReducer from "../store/signupSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        detailContent: contentDetailReducer,
        signup: signupReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;