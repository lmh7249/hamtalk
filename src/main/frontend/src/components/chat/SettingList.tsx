import styled from "styled-components";
import React from "react";
import {setUserProfile} from "../../store/contentDetailSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import toast from "react-hot-toast";

const ProfileButton = styled.button`
        background-color: #f5f5f5;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.2s ease-in-out;
        text-align: left;
        font-weight: bold;

        &:hover {
            background-color: #e0e0e0;
        }
    `;






const SettingList = () => {
    const dispatch = useDispatch();
    const myUserId = useSelector((state:RootState) => state.user.id);

    const handleClick = (userId: number | null) => {
        if(userId === null) {
            toast.error("내 프로필 불러올 수 없어요. 로그아웃 후, 다시 이용 해주세요.");
            return;
        }
        dispatch(setUserProfile({userId: userId}));
    }



    return (
        <ProfileButton onClick={() => handleClick(myUserId)}>내 프로필 보기</ProfileButton>

    )
}

export default SettingList