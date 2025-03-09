package com.hamtalk.chat.domain.entity;

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

}
