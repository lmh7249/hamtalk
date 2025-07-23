package com.hamtalk.chat.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room_participant")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomParticipant extends BaseEntity{
    private Long chatRoomId;
    private Long userId;
    private LocalDateTime deletedAt;
    private LocalDateTime lastExitAt;

    public void leaveChatRoom() {
        LocalDateTime now = LocalDateTime.now();
        this.deletedAt = now;
        this.lastExitAt = now;
    }

    public void rejoinChatRoom() {
        this.deletedAt = null;
    }
}
