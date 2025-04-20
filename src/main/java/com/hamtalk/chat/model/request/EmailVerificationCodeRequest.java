package com.hamtalk.chat.model.request;

import lombok.Getter;

@Getter
public class EmailVerificationCodeRequest {
    private String email;
    private String verificationCode;

}
