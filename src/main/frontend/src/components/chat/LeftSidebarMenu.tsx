import styled from "styled-components";
import FriendsIcon from "../../assets/icons/friends.svg";
import ChatIcon from "../../assets/icons/chatting-room.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const StyledLeftSidebarMenu = styled.div`
    flex-grow: 1;
`
const leftSidebarMenu = [
    {icon: FriendsIcon, label: "친구 목록"},
    {icon: ChatIcon, label: "채팅방 목록"},
    {icon: SettingIcon, label: "설정"},
    {icon: LogoutIcon, label: "로그아웃"},
]

const StyledLeftSidebarMenuIcon = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`
const StyledIconWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;    
`
const LeftSidebarMenu = () => {
    return (
        <StyledLeftSidebarMenu>
            <StyledLeftSidebarMenuIcon>
                {leftSidebarMenu.map((item, index) => (
                    <li>
                        <StyledIconWrapper>
                            <img src={item.icon} alt={item.label} width={30} height={30}/>
                            <p>{item.label}</p>
                        </StyledIconWrapper>
                    </li>
                ))}
            </StyledLeftSidebarMenuIcon>
        </StyledLeftSidebarMenu>
    )
}
export default LeftSidebarMenu