import styled from "styled-components";
import FriendPlusIcon from "../../assets/icons/friend-plus.svg";
import ChattingRoomPlusIcon from "../../assets/icons/chatting-room-plus.svg";
import FriendList from "../friends/FriendList";
import SearchIcon from "../../assets/icons/search.svg"
import ChattingRoomList from "../chatroom/ChatRoomList";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {MenuState, MenuType} from "../../store/menuSlice";
import {useEffect, useState} from "react";
import {getMyFriendList} from "../../services/friend-service";
import {ModalType} from "../../containers/ChatMainContainer";
import {getMyChatRoomList} from "../../services/chat-service";
import SettingList from "./SettingList";

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


const ContentListTopState = ({
                                 selectedMenu,
                                 openModal
                             }: {
    selectedMenu: {
        key: MenuType;
        label: string;
    };
    openModal: (type: ModalType) => void;
}) => {

    return (
        <StyledContentListTopState>
            <h3>{selectedMenu.label}</h3>
            {selectedMenu.key === "friends" &&
                <IconButton onClick={() => openModal("friend")}>
                    <img src={FriendPlusIcon} alt="친구 추가" width={30} height={30}/>
                </IconButton>
            }
            {selectedMenu.key === "chats" &&
                <IconButton onClick={() => openModal("chat")}>
                    <img src={ChattingRoomPlusIcon} alt="채팅방 생성" width={30} height={30}/>
                </IconButton>
            }
        </StyledContentListTopState>
    )
}

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

const ContentList = ({openModal}: ContentListProps) => {
    const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    //TODO: 새로고침 시에만 친구목록, 채팅방 목록 api 호출할 지 고민하기

    useEffect(() => {
        // 메뉴가 변경 될 때마다 적절한 API 호출
        const fetchData = async () => {

            if (selectedMenu.key === "friends") {
                const response = await getMyFriendList();
                if(response.status === 'success') {
                    console.log("친구 목록 api 호출: " + response.data);
                    setFriends(response.data);
                }
            } else if (selectedMenu.key === "chats") {
                const response = await getMyChatRoomList();
                if(response.status === 'success') {
                    console.log("채팅방 목록 api 호출: " + response.data)
                    setChatRooms(response.data);
                }
            }
            setSearchKeyword("");
        };
        fetchData();
    }, [selectedMenu]);

    const filteredFriends = friends.filter(friend =>
        (friend.nickname || "").toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const filteredChatRooms = chatRooms.filter(chatRoom => {
        const roomName = chatRoom.chatRoomName || "";
        const participants = (chatRoom.participants || [])
            .map(p => p.nickname || "") // 닉네임만 추출
            .join(", ");
        const target = (roomName + participants).toLowerCase();
        return target.toLowerCase().includes(searchKeyword.toLowerCase());
    });


    return (
        <StyledContentList>
            <ContentListTopState selectedMenu={selectedMenu} openModal={openModal} />
            {selectedMenu.key === "friends" && (
                <>
                    <SearchInput
                        type="text"
                        placeholder="이름 또는 이메일을 입력하세요."
                        value ={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <div> 친구 {filteredFriends.length} </div>
                    <FriendList friends={filteredFriends} />
                </>
            )}

            {selectedMenu.key === "chats" && (
                <>
                    <SearchInput
                        type="text"
                        placeholder="참여자 또는 채팅방명을 검색하세요."
                        value = {searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <div> 채팅방 {filteredChatRooms.length} </div>
                    <ChattingRoomList chatRooms={filteredChatRooms} />
                </>
            )}

            {selectedMenu.key === "settings" && <SettingList openModal={openModal} />}
        </StyledContentList>
    );
}

export default ContentList