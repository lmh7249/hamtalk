package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class InvalidParticipantException extends GlobalException {

    public InvalidParticipantException() {
        super(ErrorCode.INVALID_PARTICIPANTS);
    }
}
