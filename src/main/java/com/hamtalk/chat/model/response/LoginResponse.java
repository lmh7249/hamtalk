package com.hamtalk.chat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String email;
    private int roleId;
//    private String nickname;
//    private String profileImage;
//    private String statusMessage;
}
