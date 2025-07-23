package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class ParticipantAlreadyLeftException extends GlobalException {
    public ParticipantAlreadyLeftException() {
        super(ErrorCode.PARTICIPANT_AlREADY_LEFT);
    }
}
