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
import {publishExitMessage} from "../../utils/websocketUtil";
import {updateLastReadAt} from "../../services/chat-service";
import {resetChatState} from "../../store/chatRoomsSlice";
import {clearRoomViewers, resetChatActivity} from "../../store/chatActivitySlice";
import {logout, logoutStart} from "../../store/userSlice";

const StyledLeftSidebarMenu = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @media (max-width: ${props => props.theme.breakpoints.md}px) {
        background-color: #2C2D31;
    }
`;

const leftSidebarMenu = [
    {key: "friends", icon: FriendsIcon, label: "친구 목록"},
    {key: "chats", icon: ChatIcon, label: "채팅방 목록"},
    {key: "settings", icon: SettingIcon, label: "설정"},
]

const StyledMenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    @media (max-width: ${props => props.theme.breakpoints.md}px) {
        flex-direction: row;
        justify-content: space-around;
    }
`;

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

    @media (max-width: ${props => props.theme.breakpoints.md}px) {
        gap: 0;
        margin-bottom: 0;
        padding-right: 20px;
        border: 2px solid red;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const LabelWithBadge = styled.p`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: white;
    font-size: 16px;

    @media (max-width: ${props => props.theme.breakpoints.md}px) {
        font-size: 0;
    }

`;

const UnreadBadge = styled.span`
    background-color: #ff6b81;
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
    position: absolute;
    top: -5px;
    right: -8px;
`;

const IconWrapper = styled.div`
    position: relative;
`;

const LeftSidebarMenu = () => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const navigate = useNavigate();
    const totalUnreadCount = useUnreadTotal();
    const {chatRoomId, loginUserNickname} = useSelector((state: RootState) => ({
        chatRoomId: state.chatRooms.currentChatRoom?.chatRoomId ?? null,
        loginUserNickname: state.user.nickname ?? "알수없는 사용자"
    }));

    useEffect(() => {
    }, [selectedMenu]);

    const handleLogout = async () => {
        const loadingToast = toast.loading("로그아웃 중...");

        try {
            // 로그아웃 시작을 알림. -> true
            dispatch(logoutStart());
            if (chatRoomId && loginUserNickname) {
                console.log("로그아웃 전, 채팅방 퇴장 처리를 먼저 실행합니다.");
                publishExitMessage(chatRoomId, loginUserNickname); // 웹소켓 메시지 전송
                await updateLastReadAt(chatRoomId); // 퇴장 시간 기록 API 호출
            }
            const isSuccess = await userLogout();
            if (isSuccess) {
                toast.success("정상적으로 로그아웃 되었습니다.", {
                    id: loadingToast,
                    position: "bottom-left",
                    duration: 2000
                });
                // [7. 페이지 이동] 모든 정리가 끝난 후, 마지막에 페이지를 이동시킨다.
                navigate("/login");
            } else {
                // 서버 로그아웃 실패 시 처리
                toast.error("로그아웃에 실패했습니다.", {id: loadingToast});
                // TODO: 이 경우 isLoggingOut 상태를 다시 false로 돌리는 액션을 디스패치할지 결정해야 함
            }
        } catch (error) {
            console.error("로그아웃 과정 중 에러 발생:", error);
            toast.error("로그아웃 중 문제가 발생했습니다.", {id: loadingToast});
            // TODO: 에러 발생 시에도 isLoggingOut 상태를 다시 false로 돌리는 액션을 디스패치할지 결정해야 함
        }
    };
    return (
        <StyledLeftSidebarMenu>
            <StyledMenuList>
                {leftSidebarMenu.map((item, index) => (
                    <li>
                        <StyledMenuButton
                            onClick={() => dispatch(setMenu({key: item.key, label: item.label}))}
                        >
                            <IconWrapper>
                                <img src={item.icon} alt={item.label} width={30} height={30}/>

                                {item.key === 'chats' && totalUnreadCount > 0 && (
                                    <UnreadBadge>{totalUnreadCount}</UnreadBadge>
                                )}
                            </IconWrapper>
                            <LabelWithBadge>
                                {item.label}
                            </LabelWithBadge>
                        </StyledMenuButton>
                    </li>
                ))}
                <li>
                    <StyledMenuButton onClick={handleLogout}>
                        <img src={LogoutIcon} alt="로그아웃" width={30} height={30}/>
                        <LabelWithBadge>로그아웃</LabelWithBadge>
                    </StyledMenuButton>
                </li>
            </StyledMenuList>
        </StyledLeftSidebarMenu>
    )
}
export default LeftSidebarMenu