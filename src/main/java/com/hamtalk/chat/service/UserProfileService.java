package com.hamtalk.chat.service;

import com.hamtalk.chat.model.response.MyProfileResponse;
import com.hamtalk.chat.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;

    // TODO: ApiResponse<MyProfileResponse> 같은 HTTP API 응답 형식을 서비스 레이어에서 작성하지 말자.(관심사 분리)
    public MyProfileResponse getMyProfile(Long id) {
        return userProfileRepository.findUserWithProfileById(id)
                .orElseThrow(() -> new RuntimeException("프로필 정보를 찾을 수 없습니다."));
    }
}
