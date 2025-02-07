import styled from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";
import React from "react";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`

export type modalOpenProps = () => void;

const MainContent = ({modalOpen}: { modalOpen: modalOpenProps }) => {
   return(
       <StyledMainContent>
            <ContentList modalOpen = {modalOpen}/>
            <ContentDetail/>
       </StyledMainContent>
   )
}

export default MainContent