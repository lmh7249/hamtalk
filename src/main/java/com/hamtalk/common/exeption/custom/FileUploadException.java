package com.hamtalk.common.exeption.custom;

import com.hamtalk.common.exeption.ErrorCode;
import com.hamtalk.common.exeption.GlobalException;

public class FileUploadException extends GlobalException {
    public FileUploadException() {
        super(ErrorCode.FILE_UPLOAD_FAILED);

    }
}
