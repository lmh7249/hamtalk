package com.hamtalk.chat.model.response;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomMessagesResponse {
    private Long loginUserId;
    private Long chatRoomId; // 채팅방 ID
    private List<ChatMessageResponse> messages;
}
