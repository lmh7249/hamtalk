import {MainContentWrapper} from "../ChatMainContainer";
import React from "react";
import MainContent from "../../components/chat/MainContent";
import LoginUserProfile from "../../components/chat/LoginUserProfile";
import LeftSidebarMenu from "../../components/chat/LeftSidebarMenu";

export default function MobileLayout() {
    return (
        <MainContentWrapper>
            <LoginUserProfile/>
            <MainContent/>
            <LeftSidebarMenu/>
        </MainContentWrapper>
    )
}