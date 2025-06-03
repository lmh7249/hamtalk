import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Friend {
    toUserId: number;
    friendStatusId: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
    statusMessage: string;
}

interface FriendsState {
    friends: Friend[];
    loading: boolean;
    error: string | null;
}

const initialState: FriendsState = {
    friends: [],
    loading: false,
    error: null,
}


const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setFriends: (state, action: PayloadAction<Friend[]>) => {
            state.friends = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setFriends, setLoading, setError } = friendsSlice.actions;
export default friendsSlice.reducer;