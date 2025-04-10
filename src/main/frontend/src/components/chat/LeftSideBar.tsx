import styled from "styled-components";
import LeftSidebarMenu from "./LeftSidebarMenu";
import LoginUserProfile from "./LoginUserProfile";

const SideBar = styled.div`
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    background-color: #2C2D31;
    color: white;
    align-items: center;
`;

const LeftSideBar = () => {
    return (
        <SideBar>
            <LoginUserProfile>
            </LoginUserProfile>
            <LeftSidebarMenu>
            </LeftSidebarMenu>
        </SideBar>
    )

}

export default LeftSideBar