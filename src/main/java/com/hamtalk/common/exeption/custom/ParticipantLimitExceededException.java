package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class ParticipantLimitExceededException extends GlobalException {
    public ParticipantLimitExceededException() {
        super(ErrorCode.PARTICIPANT_LIMIT_EXCEEDED);
    }
}
