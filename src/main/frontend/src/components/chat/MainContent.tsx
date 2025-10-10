import styled, {DefaultTheme, useTheme} from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";
import React from "react";
import {useMediaQuery} from "react-responsive";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = () => {
    const defaultTheme = useTheme() as DefaultTheme;
    const isSmallScreen = useMediaQuery({maxWidth: defaultTheme.breakpoints.md});
    const contentDetailType = useSelector((state: RootState) => state.detailContent.type);

// --- 모바일 렌더링 로직 ---
    if (isSmallScreen) {
        return (
            <StyledMainContent>
                {contentDetailType === 'empty' ? (
                    <ContentList />
                ) : (
                    <ContentDetail />
                )}
            </StyledMainContent>
        );
    }

    // --- 데스크톱 렌더링 로직 (기존과 동일) ---
    return (
        <StyledMainContent>
            <ContentList />
            <ContentDetail />
        </StyledMainContent>
    );
}

export default MainContent