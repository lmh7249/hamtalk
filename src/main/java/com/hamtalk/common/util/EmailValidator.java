package com.hamtalk.common.util;

public class EmailValidator {

    // 이메일 형식 검증을 위한 정규 표현식
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

    // 이메일 형식 검증 메서드
    public static boolean isValidEmailFormat(String email) {
        if (email == null) {
            return false;
        }
        return email.matches(EMAIL_REGEX);
    }
}
