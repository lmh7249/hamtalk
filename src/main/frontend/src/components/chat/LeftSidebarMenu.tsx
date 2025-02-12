import styled from "styled-components";
import FriendsIcon from "../../assets/icons/friends.svg";
import ChatIcon from "../../assets/icons/chatting-room.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setMenu} from "../../store/menuSlice";
import {useEffect, useState} from "react";

const StyledLeftSidebarMenu = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column; /* 세로 방향 배치 */
    justify-content: space-between; /* 아이템 간 간격 조정 */
    width: 100%;
`
const leftSidebarMenu = [
    {key: "friends", icon: FriendsIcon, label: "친구 목록"},
    {key: "chats", icon: ChatIcon, label: "채팅방 목록"},
    {key: "settings", icon: SettingIcon, label: "설정"},
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
    const dispatch = useDispatch();
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);

    useEffect(() => {
        console.log("현재 선택된 메뉴:", selectedMenu.key);
        console.log("현재 선택된 메뉴:", selectedMenu.label);
    }, [selectedMenu]);
    return (
        <StyledLeftSidebarMenu>
            <StyledMenuList>
                {leftSidebarMenu.map((item, index) => (
                    <li>
                        <StyledMenuButton
                            onClick={() => dispatch(setMenu({ key: item.key, label: item.label }))}
                        >
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