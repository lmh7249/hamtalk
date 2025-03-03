package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponse {
    private Long id;
    private String nickname;
    private String profile_image_url;


    public UserProfileResponse(User user, UserProfile userProfile) {
        this.id = user.getId();
        this.nickname = userProfile.getNickname();
        this.profile_image_url = userProfile.getProfileImageUrl();
    }
}
