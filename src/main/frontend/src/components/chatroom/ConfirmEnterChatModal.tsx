// 프롭스 타입 정의
import styled from "styled-components";
import BaseModal from "../common/BaseModal";
import {useDispatch} from "react-redux";
import {closeModal} from "../../store/modalSlice";

interface ConfirmEnterChatModalProps {
    exitsGroupChatRoom: {
        chatRoomId: number,
        chatRoomName: string,
        creatorId: number,
        chatRoomImageUrl: string,
        participants: {
                userId: number,
                nickname: string,
                profileImageUrl: string
            }[];
    }
    onGoToRoom: () => void;
    onCreateAnyway: () => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Title = styled.h3`
    margin-top: 0;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    gap: 5px;
`;

// 모든 버튼의 기본 스타일 (공통)
const BaseButton = styled.button`
    width: 100%;
    padding: 10px 0;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease; /* 부드러운 색상 변경 효과 */
`;

const GoToRoomButton = styled(BaseButton)`
    background-color: #FFCE00; // 햄톡의 메인 컬러(예시)
    &:hover {
        background-color: #e6ba00;
    }
    
`;
const CreateAnywayButton = styled(BaseButton)`
    background-color: #e9e9eb;
    color: #333;
    &:hover {
        background-color: #dcdce0;
    }
`;

const ExistingRoomInfo = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:5px;
`;

const TextInfo = styled.div` 
    display: flex;
    gap: 8px;
    align-items: baseline;
    width: 100%;
`;

const RoomName = styled.p`
    margin: 0;
    font-size: 16px;
    font-weight: 600; 
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ParticipantCount = styled.p`
    margin: 0;
    font-size: 14px;
    color: #888; 
    white-space: nowrap;
`;
const Description = styled.div`
    font-size: 14px;
    color: #555;
    text-align: center;
    line-height: 1.5; /* 줄 간격을 줘서 가독성 확보 */
`;

const StyledGroupChatRoomImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover; /* 이미지가 찌그러지지 않게 */
    border: 1px solid #f0f0f0; /* 이미지가 배경과 겹칠 때를 대비한 옅은 테두리 */
`;

const ConfirmEnterChatModal = ({exitsGroupChatRoom, onCreateAnyway, onGoToRoom}: ConfirmEnterChatModalProps) => {
    const dispatch = useDispatch();

    return (
        <BaseModal width="300px" height="auto" modalClose={() => dispatch(closeModal())}>
            <TitleWrapper>
                <Title>중복 채팅방 생성 안내</Title>
            </TitleWrapper>
            <ExistingRoomInfo>
                <StyledGroupChatRoomImage src={exitsGroupChatRoom.chatRoomImageUrl}/>
                <TextInfo>
                    <RoomName>{exitsGroupChatRoom.chatRoomName}</RoomName>
                    <ParticipantCount>{exitsGroupChatRoom.participants.length}명</ParticipantCount>
                </TextInfo>
                <Description>
                    <p>선택한 친구들로 구성된 채팅방이 이미 있습니다.</p>
                </Description>
            </ExistingRoomInfo>
            <ButtonWrapper>
                <GoToRoomButton onClick={onGoToRoom}>기존 채팅방 이동</GoToRoomButton>
                <CreateAnywayButton onClick={onCreateAnyway}>신규 채팅방 만들기</CreateAnywayButton>
            </ButtonWrapper>
        </BaseModal>
    )
}

export default ConfirmEnterChatModal;