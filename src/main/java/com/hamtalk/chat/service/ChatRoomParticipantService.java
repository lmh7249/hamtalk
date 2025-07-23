package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatRoom;
import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import com.hamtalk.chat.domain.enums.ChatRoomType;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.repository.ChatRoomRepository;
import com.hamtalk.common.exeption.custom.ChatRoomNotFoundException;
import com.hamtalk.common.exeption.custom.ParticipantNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomParticipantService {
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageService chatMessageService;

    // 본인이 채팅방에 속하지 않은 경우, 추가
    @Transactional
    public void validateAndRejoinParticipant(Long chatRoomId, Long userId) {
        ChatRoomParticipant participant = chatRoomParticipantRepository.findByChatRoomIdAndUserId(chatRoomId, userId)
                .orElseThrow(ParticipantNotFoundException::new);
        if(participant.getDeletedAt() != null) {
            participant.rejoinChatRoom();
        }
    }

    // 1:1 채팅방에서 나간 상대방을 다시 참여시키는 로직
    @Transactional
    public void rejoinOpponentIfOneOnOne(Long chatRoomId, Long senderId) {
        // 1. 채팅방 정보를 가져와서 1:1 채팅방인지 확인
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(ChatRoomNotFoundException::new);

        // 1:1 채팅방(타입 ID: 1)일 경우에만 아래 로직을 실행
        if (chatRoom.getChatRoomTypeId() == ChatRoomType.DIRECT.getCode()) {
            // 2. 해당 채팅방의 모든 참여자(나간 사람 포함)를 조회해서
            chatRoomParticipantRepository.findByChatRoomId(chatRoomId).stream()
                    // 3. 참여자 중에서 보낸 사람(sender)이 아닌 사람(상대방)을 찾는다.
                    .filter(participant -> !participant.getUserId().equals(senderId))
                    .findFirst() // 1:1 채팅이니 상대방은 한 명일 것
                    .ifPresent(opponent -> {
                        // 4. 만약 상대방이 나간 상태(deletedAt != null)라면,
                        if (opponent.getDeletedAt() != null) {
                            // 5. 재참여시킨다. (deletedAt을 null로 변경)
                            opponent.rejoinChatRoom();
                        }
                    });
        }
    }
}
