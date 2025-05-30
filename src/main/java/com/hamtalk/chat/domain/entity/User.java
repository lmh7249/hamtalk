package com.hamtalk.chat.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
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

    @Column(name ="role_id")
    private int roleId;
    // 일반 유저: 3

    @Column(name ="user_status_id")
    private int userStatusId;
    // 활성화: 1
}
