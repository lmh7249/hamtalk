package com.hamtalk.chat.model.response;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileByIdResponse {
//    프로필 이미지, 닉네임, 이메일, 상태메세지
    private String email;
    private String profileImageUrl;
    private String nickname;
    private String statusMessage;

    public UserProfileByIdResponse(User user, UserProfile userProfile) {
        this.email = user.getEmail();
        this.profileImageUrl = userProfile.getProfileImageUrl();
        this.nickname = userProfile.getNickname();
        this.statusMessage = userProfile.getStatusMessage();
    }
}
