package com.hamtalk.chat.service;


import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public String signup(UserSignupRequest dto) {
        Boolean existsEmail = userRepository.existsByEmail(dto.getEmail());
        if(existsEmail) {
            return "이미 존재하는 이메일입니다. 회원가입 실패!";
        }
        userRepository.save(dto.toUserEntity());
        return "회원가입 성공";
    }

    @Transactional(readOnly = true)
    public boolean emailCheck(String email) {
        return userRepository.existsByEmail(email);
    }

}
