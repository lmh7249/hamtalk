package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class EmptyParticipantsException extends GlobalException {

    public EmptyParticipantsException() {
        super(ErrorCode.EMPTY_PARTICIPANTS_LIST);
    }
}
