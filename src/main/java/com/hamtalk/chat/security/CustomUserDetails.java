package com.hamtalk.chat.security;

import com.hamtalk.chat.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        int roleId = user.getRoleId();
        if(roleId == 1) {
            return List.of(new SimpleGrantedAuthority("ROLE_SUPER_ADMIN"));
        } else if (roleId == 2) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if (roleId == 3) {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(); // 권한이 없는 경우 빈 리스트 반환
        }
    }

    public int getRoleId() {
        return user.getRoleId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // 계정이 만료되었는지? 만료되었으면 false
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겨있는지? 잠겨 있으면 false
    @Override
    public boolean isAccountNonLocked() {
        // userStateId가 'BANNED(3)'이면 계정 잠금, 그 외는 잠금 해제
        return user.getUserStatusId() != 3; // 'BANNED' 상태가 아니면 true, 그 외에는 false
    }

    // 비밀번호가 만료되었는지? 만료 -> false
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 활성화된 계정인지? true만 사용 가능.
    @Override
    public boolean isEnabled() {
        return  user.getUserStatusId() == 1;
    }
}
