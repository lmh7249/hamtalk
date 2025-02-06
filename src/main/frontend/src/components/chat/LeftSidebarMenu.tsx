import styled from "styled-components";
import FriendsIcon from "../../assets/icons/friends.svg";
import ChatIcon from "../../assets/icons/chatting-room.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const StyledLeftSidebarMenu = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column; /* 세로 방향 배치 */
    justify-content: space-between; /* 아이템 간 간격 조정 */
    width: 100%;
`
const leftSidebarMenu = [
    {icon: FriendsIcon, label: "친구 목록"},
    {icon: ChatIcon, label: "채팅방 목록"},
    {icon: SettingIcon, label: "설정"},
]

const StyledMenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    
`
const StyledMenuButton = styled.button`
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 10px 10px 10px 20px;

    p {
        color: white;
        margin: 0;
        font-size: 16px;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

`
const LeftSidebarMenu = () => {
    return (
        <StyledLeftSidebarMenu>
            <StyledMenuList>
                {leftSidebarMenu.map((item, index) => (
                    <li>
                        <StyledMenuButton>
                            <img src={item.icon} alt={item.label} width={30} height={30}/>
                            <p>{item.label}</p>
                        </StyledMenuButton>
                    </li>
                ))}
            </StyledMenuList>

            <StyledMenuButton>
                <img src={LogoutIcon} alt="로그아웃" width={30} height={30}/>
                <p>로그아웃</p>
            </StyledMenuButton>
        </StyledLeftSidebarMenu>
    )
}
export default LeftSidebarMenu