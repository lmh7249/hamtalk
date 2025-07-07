package com.hamtalk.chat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ChatRoomLastReadAtResponse {
    private Long userId;
    private LocalDateTime lastReadAt;
}
