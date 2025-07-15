import styled from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";
import React from "react";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = () => {
    return (
        <StyledMainContent>
            <ContentList/>
            <ContentDetail/>
        </StyledMainContent>
    )
}

export default MainContent