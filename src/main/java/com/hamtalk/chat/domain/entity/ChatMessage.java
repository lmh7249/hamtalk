package com.hamtalk.chat.domain.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_messages")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    @Id
    private String id;
    private Long chatRoomId;
    private Long senderId;
    private String message;
    private LocalDateTime createdAt;
}
