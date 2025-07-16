import styled from "styled-components";
import CommonConfirmModal from "./CommonConfirmModal";

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
    justify-content: center;
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
    // 모달에 보여줄 '내용물'만 JSX로 정의
    const content = (
        <ExistingRoomInfo>
            <StyledGroupChatRoomImage src={exitsGroupChatRoom.chatRoomImageUrl} />
            <TextInfo>
                <RoomName>{exitsGroupChatRoom.chatRoomName}</RoomName>
                <ParticipantCount>{exitsGroupChatRoom.participants.length}명</ParticipantCount>
            </TextInfo>
            <Description>
                <p>선택한 친구들로 구성된 채팅방이 이미 있습니다.</p>
            </Description>
        </ExistingRoomInfo>
    );

    return (
        <CommonConfirmModal
            title="중복 채팅방 생성 안내"
            confirmText="기존 채팅방 이동"
            onConfirm={onGoToRoom}
            cancelText="신규 채팅방 만들기"
            onCancel={onCreateAnyway}
        >
            {content}
        </CommonConfirmModal>
    )
}

export default ConfirmEnterChatModal;