package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileByEmailResponse {
    private Long id;
    private String nickname;
    private String profileImageUrl;


    public UserProfileByEmailResponse(User user, UserProfile userProfile) {
        this.id = user.getId();
        this.nickname = userProfile.getNickname();
        this.profileImageUrl = userProfile.getProfileImageUrl();
    }
}
