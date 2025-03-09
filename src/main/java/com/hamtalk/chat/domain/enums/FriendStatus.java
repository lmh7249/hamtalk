package com.hamtalk.chat.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@RequiredArgsConstructor
@Getter
public enum FriendStatus {
    CONNECTED(1), MUTUAL(2), DISCONNECTED(3), BLOCKED(4);
    private final int friendStatusId;

    public static FriendStatus from(int friendStatusId) {
        return Arrays.stream(values())
                .filter(status -> status.friendStatusId == friendStatusId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("잘못된 친구 상태값입니다: " + friendStatusId));
    }

}
