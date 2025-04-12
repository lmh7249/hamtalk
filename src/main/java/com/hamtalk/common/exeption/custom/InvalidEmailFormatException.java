package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class InvalidEmailFormatException extends GlobalException {
    public InvalidEmailFormatException() {
        super(ErrorCode.INVALID_EMAIL_FORMAT);
    }
}
