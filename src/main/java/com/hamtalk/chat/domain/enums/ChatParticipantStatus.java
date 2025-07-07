package com.hamtalk.chat.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ChatParticipantStatus {
    // 채팅방 내 유저 상태
    ENTERED(1, "입장"),
    EXITED(2, "퇴장");

    private final int code;
    private final String description;
}
