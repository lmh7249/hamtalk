package com.hamtalk.chat.domain.entity;

import com.hamtalk.chat.model.request.UpdateProfileRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_profile")
public class UserProfile extends BaseEntity{
    @Column(name ="user_id")
    private Long userId;
    @Column(name ="nickname")
    private String nickname;
    @Column(name ="profile_image_url")
    private String profileImageUrl;
    @Column(name ="status_message")
    private String statusMessage;

    public void updateProfileImage(String imageUrl) {
        this.profileImageUrl = imageUrl;
    }

    public void updateStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    //TODO: 변수 중, 변경 사항이 없으면 request에 null이 매핑되니, null이 업데이트 되지 않도록 주의.
    public void updateProfile(UpdateProfileRequest request) {
        if (request.getNickname() != null) {
            this.nickname = request.getNickname();
        }
        if (request.getStatusMessage() != null) {
            this.statusMessage = request.getStatusMessage();
        }
        if (request.getProfileImageUrl() != null) {
            this.profileImageUrl = request.getProfileImageUrl();
        }
    }
}
