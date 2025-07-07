import styled from "styled-components";
import React from "react";
import {openUserProfile} from "../../store/contentDetailSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import toast from "react-hot-toast";
import BaseModal from "../common/BaseModal";
import {ModalType} from "../../containers/ChatMainContainer";

const SettingButton = styled.button`
    background-color: #f5f5f5;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
    font-weight: bold;

    &:hover {
        background-color: #e0e0e0;
    }
`;

interface SettingListProps {
    openModal: (type: ModalType) => void;
}

const SettingList = ({openModal} : SettingListProps) => {
    const dispatch = useDispatch();
    const myUserId = useSelector((state: RootState) => state.user.id);

    const handleClick = (userId: number | null) => {
        if (userId === null) {
            toast.error("내 프로필 불러올 수 없어요. 로그아웃 후, 다시 이용 해주세요.");
            return;
        }
        dispatch(openUserProfile(userId));
    }

    return (
        <>
            <SettingButton onClick={() => handleClick(myUserId)}>내 프로필 보기</SettingButton>
            <SettingButton onClick={() => openModal("editMyProfile")}>내 프로필 편집</SettingButton>
        </>
    )
}

export default SettingList