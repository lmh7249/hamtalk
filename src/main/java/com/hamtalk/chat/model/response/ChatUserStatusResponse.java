package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.enums.ChatParticipantStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ChatUserStatusResponse {
    private Long chatRoomId;
    private Long userId;
    private String nickname;
    private ChatParticipantStatus Status;
    private LocalDateTime updatedLastReadAt; // 최근 접속 시간 -> 클라이언트 쪽에서 필요한 데이터
}
