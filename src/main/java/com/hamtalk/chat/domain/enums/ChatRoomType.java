package com.hamtalk.chat.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum ChatRoomType {
    DIRECT(1, "1:1 채팅방"),
    GROUP(2, "그룹 채팅방");

    private final int code;
    private final String displayName;

    public static ChatRoomType ofCode(int code) {
        return Arrays.stream(ChatRoomType.values())
                .filter(type -> type.getCode() == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 채팅방 타입 코드입니다"));
    }
}
