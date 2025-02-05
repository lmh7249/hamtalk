import styled from "styled-components";
import UserProfile from "./UserProfile";
import LeftSidebarMenu from "./LeftSidebarMenu";

const SideBar = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #2C2D31;
    color: white;
    align-items: center;
`

const LeftSideBar = () => {
    return (
        <SideBar>
            <UserProfile>
            </UserProfile>
            <LeftSidebarMenu>
            </LeftSidebarMenu>
        </SideBar>
    )

}

export default LeftSideBar