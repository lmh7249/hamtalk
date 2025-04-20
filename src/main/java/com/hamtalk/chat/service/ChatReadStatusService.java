package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.ChatReadStatus;
import com.hamtalk.chat.repository.ChatReadStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
// 책임: 유저의 "읽은 시간"을 기록하거나 갱신하는 역할
public class ChatReadStatusService {
    private final ChatReadStatusRepository chatReadStatusRepository;

    public void updateLastReadTime(Long userId, Long chatRoomId) {
        ChatReadStatus chatReadStatus = chatReadStatusRepository.findByUserIdAndChatRoomId(userId, chatRoomId)
                .orElse(ChatReadStatus.builder()
                        .userId(userId)
                        .chatRoomId(chatRoomId)
                        .build());
        chatReadStatus.updateLastReadAt(LocalDateTime.now());
        chatReadStatusRepository.save(chatReadStatus);

    }

}
