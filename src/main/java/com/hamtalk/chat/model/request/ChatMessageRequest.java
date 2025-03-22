package com.hamtalk.chat.model.request;

import com.hamtalk.chat.domain.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequest {
    private String message;

    public ChatMessage toChatMessageEntity(Long senderId, Long chatRoomId) {
        return ChatMessage.builder()
                .chatRoomId(chatRoomId)
                .senderId(senderId)
                .message(message)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
