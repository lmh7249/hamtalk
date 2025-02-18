package com.hamtalk.chat.domain.enums;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    SUPER_ADMIN(1), ADMIN(2), USER(3);
    private final int roleCode;
}
