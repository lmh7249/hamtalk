package com.hamtalk.chat.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateProfileRequest {

    private String nickname;
    private String statusMessage;
    private String profileImageUrl;

}
