import LeftSideBar from "../../components/chat/LeftSideBar";
import {MainContentWrapper} from "../ChatMainContainer";
import MainContent from "../../components/chat/MainContent";

export default function DesktopLayout() {
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