package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class SelfFriendRequestException extends GlobalException {


    public SelfFriendRequestException() {
        super(ErrorCode.SELF_FRIEND_REQUEST);
    }
}
