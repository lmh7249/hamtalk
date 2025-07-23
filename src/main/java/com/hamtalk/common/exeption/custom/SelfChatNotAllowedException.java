package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class SelfChatNotAllowedException extends GlobalException {
    public SelfChatNotAllowedException() {
        super(ErrorCode.SELF_CHAT_NOT_ALLOWED);
    }
}
