package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class RedisOperationException extends GlobalException {
    public RedisOperationException() {
        super(ErrorCode.REDIS_OPERATION_FAILED);
    }
}
