package com.hamtalk.chat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OnlineChatParticipantResponse {
    private Long chatRoomId;
    private Long userId;
    private String nickname;
    private String enteredAt;
}
