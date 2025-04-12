package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class UserProfileNotFoundException extends GlobalException {
    public UserProfileNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
