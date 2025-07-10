package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatMessage;
import com.hamtalk.chat.domain.entity.ChatReadStatus;
import com.hamtalk.chat.model.projection.UserProfileProjection;
import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.model.response.ChatRoomLastReadAtResponse;
import com.hamtalk.chat.model.response.ChatRoomMessagesResponse;
import com.hamtalk.chat.model.response.UnreadMessageCountResponse;
import com.hamtalk.chat.repository.ChatMessageRepository;
import com.hamtalk.chat.repository.ChatReadStatusRepository;
import com.hamtalk.chat.repository.ChatRoomParticipantRepository;
import com.hamtalk.chat.repository.UserProfileRepository;
import com.hamtalk.common.exeption.custom.ChatRoomNotFoundException;
import com.hamtalk.common.exeption.custom.UserProfileNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
// 책임: 메시지와 관련된 데이터 처리(읽지 않은 메시지 개수 계산 포함)
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserProfileRepository userProfileRepository;
    private final ChatReadStatusRepository chatReadStatusRepository;
    private final ChatRoomParticipantRepository chatRoomParticipantRepository;

    // 메세지 저장
    @Transactional
    public ChatMessageResponse saveChatMessage(Long senderId, Long chatRoomId, ChatMessageRequest chatMessageRequest) {
        //TODO: 분산 트랜잭션 적용
        // 1. 메세지 저장
        ChatMessage chatMessage = chatMessageRepository.save(chatMessageRequest.toChatMessageEntity(senderId, chatRoomId));
        UserProfileProjection userProfileProjection = userProfileRepository.findByUserId(chatMessage.getSenderId()).orElseThrow(UserProfileNotFoundException::new);
        return ChatMessageResponse.builder()
                .messageId(chatMessage.getId())
                .chatRoomId(chatMessage.getChatRoomId())
                .senderId(chatMessage.getSenderId())
                .senderNickName(userProfileProjection.getNickname())
                .profileImageUrl(userProfileProjection.getProfileImageUrl())
                .message(chatMessage.getMessage())
                .createdAt(chatMessage.getCreatedAt())
                .build();
    }

    //TODO: 위 엔티티 리스트를 dto로 한번 바꿔주는 작업이 필요할지?
    @Transactional(readOnly = true)
    public ChatRoomMessagesResponse getChatMessageList(Long loginUserId, Long chatRoomId) {
        // 1. 채팅방에 있는 모든 채팅메세지 조회
        List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomId(chatRoomId);

        List<Long> participantIds = chatRoomParticipantRepository.findUserIdsByChatRoomId(chatRoomId);


        // 채팅방 존재 유무 검증
        if (chatMessages == null) {
            throw new ChatRoomNotFoundException();
        }

        // 2. 채팅 메세지 리스트에서 중복을 제거한 보낸 사람 id 조회
        List<Long> senderIds = chatMessages.stream()
                .map(ChatMessage::getSenderId)
                .distinct().
                toList();
        log.info("senderIds: {}", senderIds);
        //3. 보낸 사람 id 리스트를 활용해서 사용자 프로필 정보 조회하고 Map으로 변환
        Map<Long, UserProfileProjection> userProfileMap = userProfileRepository.findByUserIdIn(senderIds).stream().collect(Collectors.toMap(
                UserProfileProjection::getUserId,
                profile -> profile
        ));
        List<ChatRoomLastReadAtResponse> byChatRoomId = chatReadStatusRepository.findByChatRoomId(chatRoomId);

        // 4. mongoDB에서 chatRoomId로 사용자별 마지막 접속 시간 가져오기.
        List<ChatRoomLastReadAtResponse> lastReadStatuses = chatReadStatusRepository.findByChatRoomId(chatRoomId);

        // 5. 로직 계산 편하게 하기 위해 Map에 담기.
        Map<Long, LocalDateTime> lastReadMap = lastReadStatuses.stream()
                .collect(Collectors.toMap(ChatRoomLastReadAtResponse::getUserId, ChatRoomLastReadAtResponse::getLastReadAt));

        // 6. 채팅 메시지와 사용자 프로필 정보를 결합하여 응답 DTO 생성
        List<ChatMessageResponse> list = chatMessages.stream().map(message -> {
            UserProfileProjection userProfile = userProfileMap.get(message.getSenderId());
            if (userProfile == null) {
                throw new UserProfileNotFoundException();
            }
            int unreadCount = (int) participantIds.stream()
                    .filter(userId -> !userId.equals(message.getSenderId()))
                    .filter(userId -> !userId.equals(loginUserId))
                    .filter(userId -> {
                        LocalDateTime lastReadAt = lastReadMap.get(userId);
                        return lastReadAt == null || lastReadAt.isBefore(message.getCreatedAt());
                    })
                    .count();

            return ChatMessageResponse.builder()
                    .messageId(message.getId())
                    .senderId(message.getSenderId())
                    .senderNickName(userProfile.getNickname())
                    .profileImageUrl(userProfile.getProfileImageUrl())
                    .message(message.getMessage())
                    .unreadCount(unreadCount)
                    .createdAt(message.getCreatedAt())
                    .build();
        }).toList();

        return ChatRoomMessagesResponse.builder()
                .loginUserId(loginUserId)
                .chatRoomId(chatRoomId)
                .messages(list)
                .build();
    }

    public List<UnreadMessageCountResponse> countUnreadMessages(Long userId) {
        List<Long> chatRoomIds = chatRoomParticipantRepository.findChatRoomIdsByUserId(userId);
        List<UnreadMessageCountResponse> result = new ArrayList<>();
        for (Long chatRoomId : chatRoomIds) {
            ChatReadStatus chatReadStatus = chatReadStatusRepository.findByUserIdAndChatRoomId(userId, chatRoomId).orElse(null);
            long unreadCount;
            if (chatReadStatus == null || chatReadStatus.getLastReadAt() == null) {
                unreadCount = chatMessageRepository.countByChatRoomIdAndSenderIdNot(chatRoomId, userId);
            } else {
                // 3-2. 마지막 읽은 이후 메시지 개수
                unreadCount = chatMessageRepository.countByChatRoomIdAndSenderIdNotAndCreatedAtAfter(
                        chatRoomId, userId, chatReadStatus.getLastReadAt());
            }
            result.add(new UnreadMessageCountResponse(chatRoomId, unreadCount));
        }
        return result;
    }
}
