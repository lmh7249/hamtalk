package com.hamtalk.chat.service;


import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.domain.entity.UserProfile;
import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.model.response.UserProfileByEmailResponse;
import com.hamtalk.chat.model.response.UserProfileByIdResponse;
import com.hamtalk.chat.repository.UserProfileRepository;
import com.hamtalk.chat.repository.UserRepository;
import com.hamtalk.common.constant.DefaultProfileImageUrl;
import com.hamtalk.common.exeption.custom.EmailAlreadyExistsException;
import com.hamtalk.common.exeption.custom.InvalidEmailFormatException;
import com.hamtalk.common.exeption.custom.UserProfileNotFoundException;
import com.hamtalk.common.util.EmailValidator;
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
    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public String signup(UserSignupRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        User save = userRepository.save(dto.toUserEntity());
        String profileImageUrl;

        switch (save.getGender()) {
            case "M":
                profileImageUrl = DefaultProfileImageUrl.MALE;
                break;
            case "F":
                profileImageUrl = DefaultProfileImageUrl.FEMALE;
                break;
            case "O":
                profileImageUrl = DefaultProfileImageUrl.OTHER;
                break;
            default:
                throw new IllegalArgumentException("성별 형식이 다릅니다. : " + save.getGender());
        }

        UserProfile userProfile = UserProfile.builder()
                .userId(save.getId())
                .nickname(save.getName())
                .profileImageUrl(profileImageUrl)
                .build();
        userProfileRepository.save(userProfile);
        return save.getName();
    }

    @Transactional(readOnly = true)
    public void emailCheck(String email) {
        // 이메일 형식이 아닌 경우 예외
        if (!EmailValidator.isValidEmailFormat(email)) {
            throw new InvalidEmailFormatException();
        }

        if(userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }
    }

    @Transactional(readOnly = true)
    public UserProfileByEmailResponse getUserByEmail(String email) {
        if (!EmailValidator.isValidEmailFormat(email)) {
            throw new InvalidEmailFormatException();
        }

        return userRepository.findUserProfileByEmail(email).orElseThrow(UserProfileNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public UserProfileByIdResponse getUserProfileById(Long id) {
        return userRepository.findUserProfileById(id).orElseThrow(UserProfileNotFoundException::new);
    }
}