package com.hamtalk.chat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UnreadMessageCountResponse {
    private Long chatRoomId;
    private Long unreadCount;

}
