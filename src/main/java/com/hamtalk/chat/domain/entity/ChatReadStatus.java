package com.hamtalk.chat.domain.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_read_status")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatReadStatus {
    @Id
    private String id;
    private Long userId;
    private Long chatRoomId;
    private LocalDateTime lastReadAt;


    public void updateLastReadAt(LocalDateTime time) {
        this.lastReadAt = time;
    }
}
