package com.hamtalk.chat.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateProfileRequest {

    @NotBlank(message = "닉네임은 빈 값일 수 없습니다.")
    private String nickname;
    private String statusMessage;
    private String profileImageUrl;

}
