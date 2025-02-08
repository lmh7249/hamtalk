import LeftSideBar from "../components/chat/LeftSideBar";
import MainContent from "../components/chat/MainContent";
import styled from "styled-components";
import FriendAddModal from "../components/friends/FriendAddModal";
import {useState} from "react";

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const ChatMainContainer = () => {
    const[isModalOpen, setIsModalOpen] = useState(false);
    const modalOpen = () => {
        setIsModalOpen(true);
    }

    const modalClose = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <LeftSideBar>
            </LeftSideBar>
            <MainContentWrapper>
                <MainContent modalOpen = {modalOpen}>
                </MainContent>
            </MainContentWrapper>
            {isModalOpen && <FriendAddModal modalClose ={modalClose}/>}
        </>
    )
}
export default ChatMainContainer