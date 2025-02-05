import styled from "styled-components";
import ContentDetail from "./ContentDetail";
import ContentList from "./ContentList";

const StyledMainContent = styled.div`
    display: flex;
    height: 100vh;
`

const MainContent = () => {
   return(
       <StyledMainContent>
            <ContentList></ContentList>
            <ContentDetail></ContentDetail>
       </StyledMainContent>

   )
}

export default MainContent