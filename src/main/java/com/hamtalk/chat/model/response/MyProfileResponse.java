package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyProfileResponse {
    private String nickname;
    private String stateMessage;
    private String email;
    private String profileImageUrl;

    public MyProfileResponse(User user, UserProfile userProfile) {
        this.nickname = userProfile.getNickname();
        this.stateMessage = userProfile.getStatusMessage();
        this.email = user.getEmail();
        this.profileImageUrl = userProfile.getProfileImageUrl();
    }
}
