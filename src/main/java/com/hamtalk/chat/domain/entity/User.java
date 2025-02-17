package com.hamtalk.chat.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity{

    @Column(name ="email")
    private String email;

    @Column(name ="password")
    private String password;

    @Column(name ="name")
    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate;
    // YYYY-MM-DD 형식으로 저장

    @Column(name = "gender")
    private String gender;
    // M, F, O 형식으로 저장

    @Column(name ="authority_id")
    private int authorityId;
    // 일반 유저: 3

    @Column(name ="user_state_id")
    private int userStateId;
    // 활성화: 1
}
