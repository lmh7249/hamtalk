package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.enums.ChatParticipantStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatUserStatusResponse {
    private Long chatRoomId;
    private Long userId;
    private String nickname;
    private ChatParticipantStatus Status;
}
