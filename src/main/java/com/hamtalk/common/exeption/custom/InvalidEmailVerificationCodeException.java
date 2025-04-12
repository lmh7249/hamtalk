package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class InvalidEmailVerificationCodeException extends GlobalException {
    public InvalidEmailVerificationCodeException() {
        super(ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
    }
}
