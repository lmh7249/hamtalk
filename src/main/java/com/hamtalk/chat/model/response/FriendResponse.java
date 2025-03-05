package com.hamtalk.chat.model.response;


import com.hamtalk.chat.domain.entity.Friend;
import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendResponse {
    private Long toUserId;
    private String nickname;
    private String email;
    private String profileImageUrl;
    private String statusMessage;

    public FriendResponse(Friend friend, UserProfile userProfile, User user) {
        this.toUserId = friend.getToUserId();
        this.nickname = userProfile.getNickname();
        this.email = user.getEmail();
        this.profileImageUrl = userProfile.getProfileImageUrl();
        this.statusMessage = userProfile.getStatusMessage();
    }

}
