package com.hamtalk.common.exeption;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GlobalException extends RuntimeException{
    private final ErrorCode errorCode;

}
