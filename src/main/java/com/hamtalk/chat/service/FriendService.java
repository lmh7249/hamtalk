package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.Friend;
import com.hamtalk.chat.model.response.FriendResponse;
import com.hamtalk.chat.repository.FriendRepository;
import com.hamtalk.chat.repository.UserRepository;
import com.hamtalk.common.model.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ApiResponse<List<FriendResponse>> getAllFriends(Long userId) {
        // 3. 정상적인 상태 값만 포함하여 조회
        List<FriendResponse> friends = friendRepository.findFriendsWithProfile(userId);
        return ApiResponse.ok(friends);
    }

    //TODO: 구조 변경 예정
    @Transactional
    public String addFriend(Long fromUserId, Long toUserId) {
        // 1. 사용자 존재 유무 확인
        if(fromUserId.equals(toUserId)) {
            throw new IllegalArgumentException("본인을 친구로 등록할 수 없습니다.");
        }
        userRepository.findById(fromUserId).orElseThrow(() -> new IllegalArgumentException("보내는 사용자가 존재하지 않습니다."));
        userRepository.findById(toUserId).orElseThrow(() -> new IllegalArgumentException("받는 사용자가 존재하지 않습니다."));

        // 2. 중복 친구 추가 방지
        boolean exists = friendRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId);
        if(exists) {
            throw new IllegalStateException("이미 친구인 유저입니다.");
        }

        friendRepository.save(new Friend(fromUserId, toUserId));
        return "친구 추가에 성공하였습니다.";
    }

    @Transactional(readOnly = true)
    public Boolean isFriend(Long fromUserId, Long toUserId) {
        return friendRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId);
    }


}
