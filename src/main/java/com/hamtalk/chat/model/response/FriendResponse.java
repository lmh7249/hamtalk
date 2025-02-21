package com.hamtalk.chat.model.response;


import com.hamtalk.chat.domain.entity.Friend;
import com.hamtalk.chat.domain.entity.UserProfile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendResponse {
    private Long toUserId;
    private int friendStatusId;
    private String nickname;
    private String profileImageUrl;
    private String statusMessage;

    public FriendResponse(Friend friend, UserProfile userProfile) {
        this.toUserId = friend.getToUserId();
        this.friendStatusId = friend.getFriendStatusId();
        this.nickname = userProfile.getNickname();
        this.profileImageUrl = userProfile.getProfileImageUrl();
        this.statusMessage = userProfile.getStatusMessage();
    }

}
