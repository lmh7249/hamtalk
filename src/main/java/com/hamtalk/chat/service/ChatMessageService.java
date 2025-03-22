package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatMessage;
import com.hamtalk.chat.model.projection.UserProfileProjection;
import com.hamtalk.chat.model.request.ChatMessageRequest;
import com.hamtalk.chat.model.response.ChatMessageResponse;
import com.hamtalk.chat.model.response.ChatRoomMessagesResponse;
import com.hamtalk.chat.repository.ChatMessageRepository;
import com.hamtalk.chat.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserProfileRepository userProfileRepository;

    //TODO: 몽고 DB 테스트
    public Boolean saveChatMessage(Long senderId, Long chatRoomId, ChatMessageRequest chatMessageRequest) {
        chatMessageRepository.save(chatMessageRequest.toChatMessageEntity(senderId, chatRoomId));
        return true;
    }
    //TODO: 위 엔티티 리스트를 dto로 한번 바꿔주는 작업이 필요할지?
    public ChatRoomMessagesResponse getChatMessageList(Long chatRoomId) {
        // 1. 채팅방에 있는 모든 채팅메세지 조회
        List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomId(chatRoomId);
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

        // 4. 채팅 메시지와 사용자 프로필 정보를 결합하여 응답 DTO 생성
        List<ChatMessageResponse> list = chatMessages.stream().map(message -> {
            UserProfileProjection userProfile = userProfileMap.get(message.getSenderId());
            return ChatMessageResponse.builder()
                    .messageId(message.getId())
                    .senderId(message.getSenderId())
                    .senderNickName(userProfile.getNickname())
                    .profileImageUrl(userProfile.getProfileImageUrl())
                    .message(message.getMessage())
                    .createdAt(message.getCreatedAt())
                    .build();
        }).toList();

        return ChatRoomMessagesResponse.builder()
                .chatRoomId(chatRoomId)
                .messages(list)
                .build();
    }





}
