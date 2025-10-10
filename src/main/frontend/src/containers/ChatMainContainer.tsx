import styled, {DefaultTheme, useTheme} from "styled-components";
import {useMediaQuery} from "react-responsive";
import DesktopLayout from "./layout/DesktopLayout";
import MobileLayout from "./layout/MobileLayout";

export const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const ChatMainContainer = () => {
    const defaultTheme = useTheme() as DefaultTheme;
    const isSmallScreen = useMediaQuery({maxWidth: defaultTheme.breakpoints.md});

    return isSmallScreen ? <MobileLayout /> : <DesktopLayout />;
}
export default ChatMainContainer