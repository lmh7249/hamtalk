import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../store/menuSlice";
import userReducer from "../store/userSlice";
import contentDetailReducer from "../store/contentDetailSlice";
import signupReducer from "../store/signupSlice";
import friendsReducer from "./friends/friendsSlice";
import chatRoomsReducer from "./chatRoomsSlice";
import SearchReducer from "../store/searchSlice";
import chatActivityReducer from "../store/chatActivitySlice";


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        detailContent: contentDetailReducer,
        signup: signupReducer,
        // friends: friendsReducer,
        chatRooms: chatRoomsReducer,
        search: SearchReducer,
        chatActivity: chatActivityReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;