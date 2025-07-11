import LeftSideBar from "../components/chat/LeftSideBar";
import MainContent from "../components/chat/MainContent";
import styled from "styled-components";
import FriendAddModal from "../components/friends/FriendAddModal";
import {useEffect, useState} from "react";
import ChatRoomAddModal from "../components/chatroom/ChatRoomAddModal";
import EditMyProfileModal from "../components/settings/EditMyProfileModal";

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export interface getFilteredFriendListProps {
    toUserId: number,
    nickname: string,
    email: string,
    profileImageUrl: string
}

//TODO: 모달 추가 시, 여기에 모달 타입명을 추가
export type ModalType = null | "friend" | "chat" | "editMyProfile";

const ChatMainContainer = () => {
    const[modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: ModalType) => {
        setModalType(type);
    }

    const closeModal = () => {
        setModalType(null);
    };

    return (
        <>
            <LeftSideBar>
            </LeftSideBar>
            <MainContentWrapper>
                <MainContent openModal = {openModal}/>
            </MainContentWrapper>
            {modalType === "friend" && <FriendAddModal modalClose ={closeModal}/>}
            {modalType === "chat" && <ChatRoomAddModal modalClose ={closeModal}/>}
            {modalType === "editMyProfile" && <EditMyProfileModal modalClose ={closeModal}/>}
        </>
    )
}
export default ChatMainContainer