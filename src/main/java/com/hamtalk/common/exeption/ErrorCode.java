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
    ALREADY_FRIEND(HttpStatus.CONFLICT, "ALREADY_FRIEND", "이미 친구인 유저입니다."),
    CHAT_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "CHAT_ROOM_NOT_FOUND", "해당 채팅방이 존재하지 않습니다."),
    USER_PROFILE_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_PROFILE_NOT_FOUND", "해당 유저의 프로필이 존재하지 않습니다."),
    FILE_UPLOAD_FAILED(HttpStatus.BAD_REQUEST, "FILE_UPLOAD_FAILED", "파일 업로드에 실패했습니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 존재하는 이메일입니다."),
    INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "INVALID_EMAIL_FORMAT", "유효하지 않은 이메일 형식입니다."),
    EMAIL_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "EMAIL_SEND_FAILED", "이메일 전송에 실패했습니다."),
    REDIS_OPERATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "REDIS_OPERATION_FAILED", "인증 정보를 저장하는 데 실패했습니다."),
    INVALID_EMAIL_VERIFICATION_CODE(HttpStatus.BAD_REQUEST, "INVALID_EMAIL_VERIFICATION_CODE", "인증번호를 다시 확인해주세요."),
    MISSING_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "MISSING_REFRESH_TOKEN", "리프레시 토큰이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "리프레시 토큰이 유효하지 않습니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "EXPIRED_REFRESH_TOKEN", "만료된 리프레시 토큰입니다."),
    INVALID_TOKEN_CATEGORY(HttpStatus.BAD_REQUEST, "INVALID_TOKEN_CATEGORY", "토큰의 카테고리가 올바르지 않습니다.");



    private final HttpStatus httpStatus;
    private final String code;      // 프론트가 사용할 에러 코드
    private final String message;   // 사용자에게 보여줄 메시지 (한글)
}
