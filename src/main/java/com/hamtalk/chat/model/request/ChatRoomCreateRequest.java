package com.hamtalk.chat.model.request;

import com.hamtalk.chat.domain.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatRoomCreateRequest {
    private Long creatorId;
    private int chatRoomTypeId;

    public ChatRoom toChatRoomEntity() {
        return ChatRoom.builder()
                .creatorId(creatorId)
                .chatRoomTypeId(chatRoomTypeId)
                .name(null)
                .deletedAt(null)
                .build();
    }
}
