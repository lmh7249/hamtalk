package com.hamtalk.chat.model.response;
import com.hamtalk.chat.domain.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserAuthenticationResponse {
    private Long id;
    private String email;
    private String password;
    private int roleId;
    private int userStatusId;

    public UserAuthenticationResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.roleId = user.getRoleId();
        this.userStatusId = user.getUserStatusId();
    }
}