package com.hamtalk.common.exeption;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "서버 오류가 발생했습니다."),
    SELF_FRIEND_REQUEST(HttpStatus.BAD_REQUEST, "SELF_FRIEND_REQUEST", "본인을 친구로 등록할 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "해당 사용자를 찾을 수 없습니다."),
    ALREADY_FRIEND(HttpStatus.CONFLICT, "ALREADY_FRIEND", "이미 친구인 유저입니다.");

    private final HttpStatus httpStatus;
    private final String code;      // 프론트가 사용할 에러 코드
    private final String message;   // 사용자에게 보여줄 메시지 (한글)
}
