package com.hamtalk.chat.model.request;

import com.hamtalk.chat.domain.entity.ChatRoomParticipant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChatRoomParticipantCreateRequest {
    private Long chatRoomId;
    private Long userId;


    public ChatRoomParticipant toChatRoomParticipantEntity() {
        return ChatRoomParticipant.builder()
                .chatRoomId(chatRoomId)
                .userId(userId)
                .build();
    }
}
