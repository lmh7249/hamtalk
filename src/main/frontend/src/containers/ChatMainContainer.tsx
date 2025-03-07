import LeftSideBar from "../components/chat/LeftSideBar";
import MainContent from "../components/chat/MainContent";
import styled from "styled-components";
import FriendAddModal from "../components/friends/FriendAddModal";
import {useState} from "react";
import ChatRoomAddModal from "../components/chatroom/ChatRoomAddModal";

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

//TODO: 모달 추가 시, 여기에 모달 타입명을 추가
export type ModalType = null | "friend" | "chat";

const ChatMainContainer = () => {
    const[modalType, setModalType] = useState<ModalType>(null);
    const [searchUserId, setSearchUserId] = useState(0);

    const openModal = (type: ModalType) => {
        setModalType(type);
    }

    const closeModal = () => {
        setModalType(null);
    };

    const searchUserProfileId = (userId:number) => {
        setSearchUserId(userId);
    }

    return (
        <>
            <LeftSideBar>
            </LeftSideBar>
            <MainContentWrapper>
                <MainContent openModal = {openModal} searchUserProfileId={searchUserId}/>
            </MainContentWrapper>
            {modalType === "friend" && <FriendAddModal modalClose ={closeModal} searchUserProfileId ={searchUserProfileId}/>}
            {modalType === "chat" && <ChatRoomAddModal modalClose ={closeModal}/>}
        </>
    )
}
export default ChatMainContainer