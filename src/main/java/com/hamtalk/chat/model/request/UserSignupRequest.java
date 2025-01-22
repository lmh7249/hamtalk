package com.hamtalk.chat.model.request;

import com.hamtalk.chat.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor

public class UserSignupRequest {
    private String email;
    private String password;
    private String name;
    private LocalDate birthDate;
    private String gender;

    public User toUserEntity() {
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .authorityId(3)
                .userStateId(1)
                .build();
    }
}
