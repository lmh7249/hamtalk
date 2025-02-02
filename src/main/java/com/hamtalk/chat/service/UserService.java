package com.hamtalk.chat.service;


import com.hamtalk.chat.controller.api.UserController;
import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Boolean signup(UserSignupRequest dto) {
        Boolean existsEmail = userRepository.existsByEmail(dto.getEmail());
        if(existsEmail) {
            return false;
        }
        dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        userRepository.save(dto.toUserEntity());
        return true;
    }

    @Transactional(readOnly = true)
    public Boolean emailCheck(String email) {
        return userRepository.existsByEmail(email);
    }
}