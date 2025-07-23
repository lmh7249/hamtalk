package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class ChatRoomAlreadyExistsException extends GlobalException {
    public ChatRoomAlreadyExistsException() {
        super(ErrorCode.CHAT_ROOM_ALREADY_EXISTS);
    }
}
