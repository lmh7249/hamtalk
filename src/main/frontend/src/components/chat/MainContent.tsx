import styled from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";
import React from "react";
import {ModalType} from "../../containers/ChatMainContainer";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`;

export interface OpenModalProps {
    openModal: (type: ModalType) => void;
    searchUserProfileId: number;
}

const MainContent = ({openModal, searchUserProfileId}: OpenModalProps) => {
    return (
        <StyledMainContent>
            <ContentList openModal={openModal}/>
            <ContentDetail searchUserProfileId ={searchUserProfileId}/>
        </StyledMainContent>
    )
}

export default MainContent