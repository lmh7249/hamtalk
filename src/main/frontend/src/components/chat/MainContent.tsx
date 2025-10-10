import styled, {DefaultTheme, useTheme} from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";
import React from "react";
import {useMediaQuery} from "react-responsive";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = () => {
    const defaultTheme = useTheme() as DefaultTheme;
    const isSmallScreen = useMediaQuery({maxWidth: defaultTheme.breakpoints.md});

    return (
        <StyledMainContent>
            {isSmallScreen ? (
                <ContentList />
            ) : (
                <>
                    <ContentList />
                    <ContentDetail />
                </>
            )}
        </StyledMainContent>
    )
}

export default MainContent