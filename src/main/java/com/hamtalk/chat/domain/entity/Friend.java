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
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "friend")
public class Friend extends BaseEntity{

    @Column(name ="from_user_id")
    private Long fromUserId;
    @Column(name ="to_user_id")
    private Long toUserId;

}
