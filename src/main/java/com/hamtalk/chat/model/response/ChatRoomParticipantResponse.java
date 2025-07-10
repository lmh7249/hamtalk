package com.hamtalk.chat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatRoomParticipantResponse {
    private Long userId;
    private String nickname;
    private String profileImageUrl;
}
