package com.hamtalk.chat.security;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("이메일을 찾을 수 없습니다: " + email));
             // 여기서 엔티티 반환할때, 필요 데이터 더 반환하기.
            // 유저 아이디(PK), 프사, 상태메세지 등등 ....
        return new CustomUserDetails(user);
    }
}
