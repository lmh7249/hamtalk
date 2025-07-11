import styled from "styled-components";
import FriendPlusIcon from "../../assets/icons/friend-plus.svg";
import ChattingRoomPlusIcon from "../../assets/icons/chatting-room-plus.svg";
import FriendList from "../friends/FriendList";
import SearchIcon from "../../assets/icons/search.svg"
import ChattingRoomList from "../chatroom/ChatRoomList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {MenuType} from "../../store/menuSlice";
import {useEffect} from "react";
import {ModalType} from "../../containers/ChatMainContainer";
import {getMyChatRoomList} from "../../services/chat-service";
import SettingList from "./SettingList";
import {setChatRooms} from "../../store/chatRoomsSlice";
import {setKeyword} from "../../store/searchSlice";
import {useQuery} from "@tanstack/react-query";
import {useMyFriendsQuery} from "../../hooks/useMyFriendsQuery";

const StyledContentList = styled.div`
    min-width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledContentListTopState = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

const SearchInput = styled.input`
    background-color: #DFDFDF;
    border: none;
    background-image: url(${SearchIcon});
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding: 10px 40px 10px 10px;
    background-size: 20px 20px;
    border-radius: 5px;
`;

export interface Friend {
    toUserId: number,
    friendStatusId: number,
    nickname: string,
    email: string,
    profileImageUrl: string,
    statusMessage: string
}

interface ContentListProps {
    openModal: (type: ModalType) => void;
}

export interface Participant {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;  // profileImageUrl이 null일 수 있기 때문에
}

export interface ChatRoom {
    chatRoomId: number;
    chatRoomName: string;
    creatorId: number;
    participants: Participant[];  // participants 배열 추가
    lastMessage: string;
    lastMessageTime: string;
}

const ContentListTopState = ({selectedMenu, openModal}: { selectedMenu: { key: MenuType; label: string; }; openModal: (type: ModalType) => void; }) =>
{
    return (
        <StyledContentListTopState>
            <h3>{selectedMenu.label}</h3>
            {selectedMenu.key === "friends" &&
                <IconButton onClick={() => openModal("friend")} title="친구 추가">
                    <img src={FriendPlusIcon} alt="친구 추가" width={30} height={30}/>
                </IconButton>
            }
            {selectedMenu.key === "chats" &&
                <IconButton onClick={() => openModal("chat")} title="채팅방 생성">
                    <img src={ChattingRoomPlusIcon} alt="채팅방 생성" width={30} height={30}/>
                </IconButton>
            }
        </StyledContentListTopState>
    )
}

const ContentList = ({openModal}: ContentListProps) => {
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const dispatch = useDispatch();
    const isFriendsTab = selectedMenu.key === "friends";
    const isChatsTab = selectedMenu.key === "chats";
    const isSettingsTab = selectedMenu.key === "settings";

    useEffect(() => {
        // 메뉴가 변경 될 때마다 적절한 API 호출
        const fetchData = async () => {
            if (isChatsTab) {
                const response = await getMyChatRoomList();
                if(response.status === 'success') {
                    dispatch(setChatRooms(response.data));
                }
            }
            dispatch(setKeyword(""))
        };
        fetchData();
    }, [selectedMenu]);


    return (
        <StyledContentList>
            <ContentListTopState selectedMenu={selectedMenu} openModal={openModal} />
            {isFriendsTab && (
                <>
                    <SearchInput
                        type="text"
                        placeholder="이름 또는 이메일을 입력하세요."
                        value ={keyword}
                        onChange={(e) => dispatch(setKeyword(e.target.value))}
                    />
                    <FriendList/>
                </>
            )}
            {isChatsTab && (
                <>
                    <SearchInput
                        type="text"
                        placeholder="참여자 또는 채팅방명을 검색하세요."
                        value = {keyword}
                        onChange={(e) => dispatch(setKeyword(e.target.value))}
                    />
                    <ChattingRoomList/>
                </>
            )}
            {isSettingsTab && <SettingList openModal={openModal} />}
        </StyledContentList>
    );
}

export default ContentList