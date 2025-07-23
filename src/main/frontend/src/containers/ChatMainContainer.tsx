import LeftSideBar from "../components/chat/LeftSideBar";
import MainContent from "../components/chat/MainContent";
import styled from "styled-components";

const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const ChatMainContainer = () => {
    return (
        <>
            <LeftSideBar>
            </LeftSideBar>
            <MainContentWrapper>
                <MainContent/>
            </MainContentWrapper>
        </>
    )
}
export default ChatMainContainer