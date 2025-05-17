import {createSlice, PayloadAction} from "@reduxjs/toolkit";



interface SignupFormData {
    name: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: string;
    email: string;
    verificationCode: string;
    password: string;
    confirmPassword: string;
}

// 회원가입에 필요한 최종 데이터.
export interface SignupData {
    email: string,
    password: string,
    name: string,
    birthDate: string,
    gender: string
}

const initialState: SignupFormData = {
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    // 1단계
    email: '',
    // 2단계
    verificationCode: '',
    // 3단계
    password: '',
    confirmPassword: '',
    // 4단계
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof SignupFormData; value: string }>) => {
            state[action.payload.field] = action.payload.value;
        },
        resetForm: () => initialState,
    },
});

export const { updateField, resetForm } = signupSlice.actions;
export default signupSlice.reducer;