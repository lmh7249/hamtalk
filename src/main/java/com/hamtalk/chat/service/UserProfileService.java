package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.UserProfile;
import com.hamtalk.chat.model.projection.UserProfileProjection;
import com.hamtalk.chat.model.request.StatusMessageUpdateRequest;
import com.hamtalk.chat.model.request.UpdateProfileRequest;
import com.hamtalk.chat.model.response.MyProfileResponse;
import com.hamtalk.chat.model.response.UpdateProfileResponse;
import com.hamtalk.chat.repository.UserProfileRepository;
import com.hamtalk.common.exeption.custom.FileUploadException;
import com.hamtalk.common.exeption.custom.UserProfileNotFoundException;
import com.hamtalk.common.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final S3Uploader s3Uploader;


    @Transactional
    public MyProfileResponse getMyProfile(Long id) {
        return userProfileRepository.findUserWithProfileById(id)
                .orElseThrow(UserProfileNotFoundException::new);
    }

    @Transactional
    public UpdateProfileResponse updateMyProfile(Long userId, UpdateProfileRequest request) {
        log.info("넘어온 request: {}", request);
        // 1. 유저 프로필 조회
        UserProfile userProfile = userProfileRepository.findEntityByUserId(userId).orElseThrow(UserProfileNotFoundException::new);
        // 2. 변경 사항 세팅

        if(request.getNickname() != null && request.getNickname().trim().isEmpty()) {
            throw new IllegalArgumentException("닉네임은 공백일 수 없습니다.");
        }

        userProfile.updateProfile(request);
        log.info("세팅한 userProfile Entity: {}", userProfile);

        UpdateProfileResponse updateProfileResponse = new UpdateProfileResponse(userProfileRepository.save(userProfile));
        log.info("Response 값: {}", updateProfileResponse);
        // 3. 저장 및 반환
        return updateProfileResponse;
    }



    @Transactional
    public String updateMyProfileImage(Long userId, MultipartFile image) {
        try {
            // 1. 유저 프로필 조회
            UserProfile userProfile = userProfileRepository.findEntityByUserId(userId).orElseThrow(UserProfileNotFoundException::new);
            // 2. S3 이미지 업로드
            String imageUrl = s3Uploader.upload(image, "profile-image", userId);
            userProfile.updateProfileImage(imageUrl);
            userProfileRepository.save(userProfile);
            return imageUrl;
        } catch (IOException e) {
            throw new FileUploadException();
        }
    }

    @Transactional
    public String updateMyStatusMessage(Long userId, String statusMessage) {
        //TODO: 상태메세지 글자수 제한 로직 필요.
        UserProfile userProfile = userProfileRepository.findEntityByUserId(userId).orElseThrow(UserProfileNotFoundException::new);
        userProfile.updateStatusMessage(statusMessage);
        userProfileRepository.save(userProfile);
        return statusMessage;
    }
}
