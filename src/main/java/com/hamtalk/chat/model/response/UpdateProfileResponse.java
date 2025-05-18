package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateProfileResponse {
    private String nickname;
    private String statusMessage;
    private String profileImageUrl;

    public UpdateProfileResponse(UserProfile userProfile) {
        this.nickname = userProfile.getNickname();
        this.statusMessage = userProfile.getStatusMessage();
        this.profileImageUrl = userProfile.getProfileImageUrl();
    }

}
