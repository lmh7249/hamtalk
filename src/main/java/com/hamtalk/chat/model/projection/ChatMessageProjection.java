package com.hamtalk.chat.model.projection;

import java.time.LocalDateTime;

public interface ChatMessageProjection {

    Long getChatRoomId();
    String getLastMessage();
    LocalDateTime getLastMessageTime();
}
