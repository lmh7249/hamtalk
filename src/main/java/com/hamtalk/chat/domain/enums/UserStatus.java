package com.hamtalk.chat.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
@Getter
@RequiredArgsConstructor
public enum UserStatus {
    ACTIVE(1, "활성화"),
    INACTIVE(2, "비활성화"),
    BANNED(3, "이용 정지"),
    WITHDRAWN(4, "탈퇴");
        private final int userStatusCode;
        private final String description;
}
