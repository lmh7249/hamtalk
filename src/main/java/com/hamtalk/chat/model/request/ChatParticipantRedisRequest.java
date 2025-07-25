package com.hamtalk.chat.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatParticipantRedisRequest {
    private String nickname;
    private String enteredAt;
}
