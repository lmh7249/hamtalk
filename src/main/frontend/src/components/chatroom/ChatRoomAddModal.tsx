import styled from "styled-components";
import BaseModal from "../common/BaseModal";
import ModalButton from "../common/ModalButton";

const Title = styled.h3`
    margin-top: 0;

`;


const SearchInput = styled.input`
    border-radius: 20px;
    border: 1px solid rgb(150, 150, 150);
    font-size: 16px;
    padding: 10px 20px;
    display: block;
    margin: 0 auto;
    width: 90%;
`;

const FriendListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
    overflow-y: auto;
    max-height: 450px;  
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
    margin: 0 10px;
    

    &:hover {
        background-color: #D0D3D5;
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
    flex-direction: row;
    gap: 5px;
    flex-grow: 1;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
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

type ChattingRoomAddModalProps = {
    modalClose: () => void;
};

const ChatRoomAddModal = ({modalClose}: ChattingRoomAddModalProps) => {
    return (
        <BaseModal width={"400px"} height={"600px"} modalClose={modalClose}>
            <Title>채팅방 생성</Title>
            <SearchInput type={"text"} placeholder={"이름 또는 이메일을 입력하세요."}/>
            <FriendListContainer>
                <FriendCount>
                    친구
                    <span> 20</span>
                </FriendCount>
                <FriendWrapper>
                    <FriendItem>
                        <StyledFriendItemLabel>
                            <ProfileImage src="user_image.png" alt="유저 프로필 이미지"/>
                            <StyledNickNameAndEmail>
                                <FriendNikName>임성규</FriendNikName>
                                <FriendEmail>im@domain.com</FriendEmail>
                            </StyledNickNameAndEmail>
                            <input type="radio" name="friend"/>
                        </StyledFriendItemLabel>
                    </FriendItem>
                </FriendWrapper>
            </FriendListContainer>
            <ModalButtonWrapper>
                <ModalButton backgroundColor={"#2C2D31"} color={"white"} hoverColor={"#3A3B40"}>채팅 시작</ModalButton>
            </ModalButtonWrapper>
        </BaseModal>
    )
}

export default ChatRoomAddModal