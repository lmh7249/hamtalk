package com.hamtalk.chat.model.request;

import com.hamtalk.chat.domain.entity.User;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserSignupRequest {

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하여야 합니다.")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,16}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 조합하여 8~16자로 입력해주세요."
    )
    private String password;
    @NotBlank(message = "이름은 필수입니다.")
    @Pattern(
            regexp = "^[가-힣]{1,}|[A-Za-z]+$",
            message = "이름은 한글로 최소 한 글자 이상 입력하거나 영어로 입력해야 합니다."
    )
    private String name;
    @NotNull(message = "생년월일은 필수입니다.")
    private LocalDate birthDate;
    @Pattern(regexp = "^(M|F|O)$", message = "성별은 '남성', '여성', '기타' 중 하나여야 합니다.")
    private String gender;

    public User toUserEntity() {
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .roleId(3)
                .userStatusId(1)
                .build();
    }
}
