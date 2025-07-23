import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ModalType =  "friend" | "chat" | "editMyProfile" | "confirmEnterChat" | "commonConfirm";

interface ModalProps {
    [key: string]: any;
}

export interface ModalItem {
    type: ModalType;
    props?: ModalProps;
}

interface ModalState {
    modals: ModalItem[]; // 열려있는 모달들을 배열로 관리
}

const initialState: ModalState = {
    modals: [],
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalItem>) => {
            state.modals.push(action.payload); // 배열에 새 모달 추가
        },
        // 가장 위에 있는 모달을 닫는 액션
        closeModal: (state) => {
            state.modals.pop(); // 배열의 마지막 요소 제거
        },
        // 모든 모달을 닫는 액션
        closeAllModals: (state) => {
            state.modals = [];
        }
    }
})


export const {openModal, closeModal, closeAllModals} = modalSlice.actions;
export default modalSlice.reducer;
