import styled from "styled-components";
import FriendsIcon from "../../assets/icons/friends.svg";
import ChatIcon from "../../assets/icons/chatting-room.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setMenu} from "../../store/menuSlice";
import {useEffect, useState} from "react";
import {userLogout} from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {closeDetail} from "../../store/contentDetailSlice";
import {useUnreadTotal} from "../../hooks/useUnreadTotal";

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
`;

const LabelWithBadge = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px; /* 텍스트와 뱃지 사이 여백 */
  margin: 0;
`;

const UnreadBadge = styled.span`
    background-color: #ff6b81; /* 귀여운 핑크빛 빨강 */
    color: white;
    font-weight: bold;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const LeftSidebarMenu = () => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const navigate = useNavigate();
    const totalUnreadCount = useUnreadTotal();

    useEffect(() => {
    }, [selectedMenu]);

    const handleLogout = async () => {
        let isSuccess = await userLogout();
        const loadingToast = toast.loading("로그아웃 중...");

        if(isSuccess) {
            toast.success("정상적으로 로그아웃 되었습니다.", {
                id: loadingToast,
                position:"bottom-left",
                duration: 2000
            })
            // contentDetail 값을 setEmpty로 변경
            dispatch(closeDetail());
            navigate("/login");
        }
    };

    return (
        <StyledLeftSidebarMenu>
            <StyledMenuList>
                {leftSidebarMenu.map((item, index) => (
                    <li>
                        <StyledMenuButton
                            onClick={() => dispatch(setMenu({ key: item.key, label: item.label }))}
                        >
                            <img src={item.icon} alt={item.label} width={30} height={30}/>
                            <LabelWithBadge>
                                {item.label}
                                {item.key === 'chats' && totalUnreadCount > 0 && (
                                    <UnreadBadge>{totalUnreadCount}</UnreadBadge>
                                )}
                            </LabelWithBadge>
                        </StyledMenuButton>
                    </li>
                ))}
            </StyledMenuList>
            <StyledMenuButton onClick={handleLogout}>
                <img src={LogoutIcon} alt="로그아웃" width={30} height={30}/>
                <p>로그아웃</p>
            </StyledMenuButton>
        </StyledLeftSidebarMenu>
    )
}
export default LeftSidebarMenu