import styled from "styled-components";
import BaseModal from "../common/BaseModal";
import ModalButton from "../common/ModalButton";
import {useMyFriendsQuery} from "../../hooks/useMyFriendsQuery";
import {useCallback, useMemo, useState} from "react";
import {RiCheckboxCircleFill, RiCheckboxBlankCircleLine} from "react-icons/ri";
import {useVerifyChatRoomMutation} from "../../hooks/useVerifyChatRoomMutation";
import {useDispatch} from "react-redux";
import {closeModal} from "../../store/modalSlice";

const Title = styled.h3`
    margin-top: 0;
`;

const SearchInput = styled.input`
    border-radius: 20px;
    border: 1px solid rgb(150, 150, 150);
    font-size: 14px;
    padding: 8px 18px;
    display: block;
    margin: 0 auto;
    width: 90%;
`;

const FriendListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    overflow-y: auto;
    flex-grow: 1; /* ✨ 핵심 속성! 남은 공간을 모두 차지 */
    min-height: 0; /* flex 아이템이 수축할 때 내용물이 넘치는 것을 방지 */
`;

const FriendCount = styled.p`
    color: rgb(180, 180, 180);
    font-size: 12px;
    padding: 0;
    margin: 0;
`;

const FriendWrapper = styled.ul`
    list-style: none;
    padding: 0;
`;
const FriendItem = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background-color: #D0D3D5;
        border-radius: 5px;
    }

    label {
        cursor: pointer;
    }

    input {
        cursor: pointer;
    }
`;
const StyledFriendItemLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const StyledNickNameAndEmail = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
`;

const FriendNikName = styled.p`
    margin: 0;
    font-weight: bold;
    font-size: 16px;
`;

const FriendEmail = styled.p`
    margin: 0;
    font-size: 14px;
`;

const ModalButtonWrapper = styled.div`
    margin-top: 10px;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    gap: 5px;
`;

const SelectedCount = styled.span`
    color: #2C2D31;
    font-size: 16px;
    font-weight: bold;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const CheckedIcon = styled(RiCheckboxCircleFill)`
    font-size: 28px;
    vertical-align: middle;
    color: #2C2D31; 
`;

const UncheckedIcon = styled(RiCheckboxBlankCircleLine)`
    font-size: 28px; 
    color: #E0E0E0; 
    vertical-align: middle;
`;
const SelectedFriendsContainer = styled.div<{ hasSelection: boolean }>`
    display: flex;
    flex-wrap: wrap; 
    gap: 8px;
    max-height: 80px;
    overflow-y: auto;
    margin-bottom: 10px;

    /* 👇 [핵심] 선택된 친구가 있을 때만 최소 높이를 적용합니다. */
    min-height: ${props => props.hasSelection ? '30px' : '0'};

    /* 높이가 0일 때 안 보이도록 padding도 조건부로 줍니다. */
    padding: ${props => props.hasSelection ? '8px' : '0'};
`;

const SelectedFriendPill = styled.div`
    display: inline-flex; 
    align-items: center;
    border-radius: 16px;
    padding: 4px 12px;
    font-size: 14px;
    border: 1px solid #2C2D31;
    transition: background-color 0.2s; 
    cursor: pointer;
    &:hover {
        background-color: #DEE2E6; 
    }
`;

const RemoveButton = styled.span`
    background: none;
    border: none;
    margin-left: 8px;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    color: #868E96;
    line-height: 1;

    &:hover {
        color: #343A40;
    }
`;

interface SelectedFriends {
    id: number;
    nickname: string;
}

const ModalLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 쌓음 */
  height: calc(100% - 80px); /* 전체 높이에서 하단 버튼 영역만큼의 높이를 뺌 */
`;

const ChatRoomAddModal = () => {
    const {data: friends = [], isLoading, error} = useMyFriendsQuery(true);
    const [selectedFriends, setSelectedFriends] = useState<SelectedFriends[]>([]);
    const {mutate: verifyChatRoom, isPending} = useVerifyChatRoomMutation();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFriends = useMemo(() => {
        const term = searchTerm.toLowerCase();
        if (!term) {
            return friends; // 검색어가 없으면 전체 목록 반환
        }
        return friends.filter(friend =>
            friend.nickname.toLowerCase().includes(term) ||
            friend.email.toLowerCase().includes(term)
        );
    }, [friends, searchTerm]); // friends 배열이나 searchTerm이 바뀔 때만 이 함수를 재실행

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    if (isLoading) {
        return <div>친구 목록을 불러오는 중...</div>;
    }

    if (error) {
        return <div>오류가 발생했습니다.</div>;
    }

    const handleFriendSelect = (friendToToggle: SelectedFriends) => {
        const isAlreadySelected = selectedFriends.some(friend => friend.id === friendToToggle.id);

        if (isAlreadySelected) {
            setSelectedFriends(selectedFriends.filter(friend => friend.id !== friendToToggle.id));
        } else {
            setSelectedFriends([...selectedFriends, friendToToggle]);
        }
    };

    const handleStartChat = () => {
        if(isPending) return;
        console.log("채팅 시작! 선택된 친구들:", selectedFriends);
        const selectedFriendIds = selectedFriends.map(friend => friend.id);
        verifyChatRoom(selectedFriendIds);
    };

    return (
        <BaseModal width={"400px"} height={"600px"} modalClose={handleCloseModal}>
            <ModalLayoutWrapper>
                <TitleWrapper>
                    <Title>대화상대 선택</Title>
                    {selectedFriends.length > 0 &&
                        <SelectedCount>{selectedFriends.length}</SelectedCount>
                    }
                </TitleWrapper>
                <SelectedFriendsContainer hasSelection={selectedFriends.length > 0}>
                    {selectedFriends.map(selectedFriend => (
                        <SelectedFriendPill key={selectedFriend.id} onClick={() => handleFriendSelect(selectedFriend)}>
                            <span>{selectedFriend.nickname}</span>
                            <RemoveButton>
                                &times; {/* HTML 특수문자로 X 모양을 만듦 */}
                            </RemoveButton>
                        </SelectedFriendPill>
                    ))}
                </SelectedFriendsContainer>
                <SearchInput type={"text"} placeholder={"이름 또는 이메일을 입력하세요."} onChange={(e) => setSearchTerm(e.target.value)}/>
                <FriendListContainer>
                    <FriendCount>
                        친구
                        <span> {filteredFriends.length}</span>
                    </FriendCount>
                    <FriendWrapper>
                        {filteredFriends.map((friend) => (
                            <FriendItem key={friend.toUserId}>
                                <HiddenCheckbox
                                    type="checkbox"
                                    id={`friend-${friend.toUserId}`}
                                    checked={selectedFriends.some(selected => selected.id === friend.toUserId)}
                                    onChange={() => handleFriendSelect({id: friend.toUserId, nickname: friend.nickname})}
                                />
                                <StyledFriendItemLabel htmlFor={`friend-${friend.toUserId}`}>
                                    <ProfileImage src={friend.profileImageUrl} alt="유저 프로필 이미지"/>
                                    <StyledNickNameAndEmail>
                                        <FriendNikName>{friend.nickname}</FriendNikName>
                                        <FriendEmail>{friend.email}</FriendEmail>
                                    </StyledNickNameAndEmail>
                                    {selectedFriends.some(selected => selected.id === friend.toUserId) ? (
                                        <CheckedIcon/>
                                    ) : (
                                        <UncheckedIcon/>
                                    )}
                                </StyledFriendItemLabel>
                            </FriendItem>
                        ))}
                    </FriendWrapper>
                </FriendListContainer>
            </ModalLayoutWrapper>
            <ModalButtonWrapper>
                <ModalButton backgroundColor={"#2C2D31"} color={"white"} hoverColor={"#3A3B40"}  disabled={selectedFriends.length === 0} onClick={handleStartChat}>채팅 시작</ModalButton>
            </ModalButtonWrapper>
        </BaseModal>
    )
}

export default ChatRoomAddModal