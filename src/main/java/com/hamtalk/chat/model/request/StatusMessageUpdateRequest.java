package com.hamtalk.chat.model.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusMessageUpdateRequest {

    @Size(max = 25, message = "상태메세지는 최대 25자까지 입력할 수 있어요.")
    private String statusMessage;
}
