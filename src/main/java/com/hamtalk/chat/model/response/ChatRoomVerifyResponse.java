package com.hamtalk.chat.model.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomVerifyResponse {
    private String resultType;
    private CurrentChatRoomResponse currentChatRoom;
}
