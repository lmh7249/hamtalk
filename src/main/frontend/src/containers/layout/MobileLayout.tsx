import {MainContentWrapper} from "../ChatMainContainer";
import React from "react";
import MainContent from "../../components/chat/MainContent";
import LoginUserProfile from "../../components/chat/LoginUserProfile";
import LeftSidebarMenu from "../../components/chat/LeftSidebarMenu";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export default function MobileLayout() {
    const detailType = useSelector((state: RootState) => state.detailContent.type);
    const isDetailView = detailType !== 'empty';

    return (
        <MainContentWrapper>
            {!isDetailView && (
                <LoginUserProfile/>
            )}
            <MainContent/>
            <LeftSidebarMenu/>
        </MainContentWrapper>
    )
}