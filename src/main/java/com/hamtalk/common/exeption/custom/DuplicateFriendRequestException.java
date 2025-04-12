package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class DuplicateFriendRequestException extends GlobalException {

    public DuplicateFriendRequestException() {
        super(ErrorCode.ALREADY_FRIEND);
    }
}
