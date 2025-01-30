package com.hamtalk.common.constant;

public class EmailConstants {
    private EmailConstants() {
        throw new IllegalStateException("인스턴스 생성 금지");
    }

    public static final String EMAIL_TITLE_PREFIX = "[햄톡]";
    public static final String AUTH_EMAIL_TITLE = EMAIL_TITLE_PREFIX + " 회원가입 인증번호 안내";
    public static final String AUTH_EMAIL_TEMPLATE = """
        안녕하세요! 햄톡에서 알려드립니다.
        
        인증번호: %s
        
        해당 인증번호는 5분간 유효합니다.
        
        인증번호는 타인에게 절대 공유하지 마세요.""";

//    // 추가로 이메일 관련된 다른 상수들도 여기에 정의
    public static final long AUTH_CODE_EXPIRE_TIME = 5 * 60; // 5분 (초 단위)
//    public static final String AUTH_CODE_REDIS_PREFIX = "AUTH:";

}
