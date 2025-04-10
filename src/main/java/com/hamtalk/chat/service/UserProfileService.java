package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.UserProfile;
import com.hamtalk.chat.model.response.MyProfileResponse;
import com.hamtalk.chat.repository.UserProfileRepository;
import com.hamtalk.common.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final S3Uploader s3Uploader;

    // TODO: ApiResponse<MyProfileResponse> 같은 HTTP API 응답 형식을 서비스 레이어에서 작성하지 말자.(관심사 분리)
    public MyProfileResponse getMyProfile(Long id) {
        return userProfileRepository.findUserWithProfileById(id)
                .orElseThrow(() -> new RuntimeException("프로필 정보를 찾을 수 없습니다."));
    }

    //TODO: 추후 전역 예외처리로 변경.
    public String updateMyProfileImage(Long userId, MultipartFile image) {
        try {
            // 1. 유저 프로필 조회
            UserProfile userProfile = userProfileRepository.findEntityByUserId(userId).orElseThrow(() -> new RuntimeException("해당 유저의 프로필 데이터가 없습니다."));
            // 2. S3 이미지 업로드
            String imageUrl = s3Uploader.upload(image, "profile-image", userId);
            userProfile.updateProfileImage(imageUrl);
            userProfileRepository.save(userProfile);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패.", e);
        }
    }

}
