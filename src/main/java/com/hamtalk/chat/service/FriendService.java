package com.hamtalk.chat.service;

import com.hamtalk.chat.domain.entity.Friend;
import com.hamtalk.chat.model.response.FriendResponse;
import com.hamtalk.chat.repository.FriendRepository;
import com.hamtalk.chat.repository.UserRepository;
import com.hamtalk.common.exeption.custom.DuplicateFriendRequestException;
import com.hamtalk.common.exeption.custom.SelfFriendRequestException;
import com.hamtalk.common.exeption.custom.UserNotFoundException;
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
    public List<FriendResponse> getAllFriends(Long userId) {
        // 3. 정상적인 상태 값만 포함하여 조회
        return friendRepository.findFriendsWithProfile(userId);
    }

    //TODO: 구조 변경 예정
    @Transactional
    public String addFriend(Long fromUserId, Long toUserId) {
        // 1. 사용자 존재 유무 확인
        if(fromUserId.equals(toUserId)) {
            throw new SelfFriendRequestException();
        }
        userRepository.findById(fromUserId).orElseThrow(UserNotFoundException::new);
        userRepository.findById(toUserId).orElseThrow(UserNotFoundException::new);

        // 2. 중복 친구 추가 방지
        boolean exists = friendRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId);
        if(exists) {
            throw new DuplicateFriendRequestException();
        }

        friendRepository.save(new Friend(fromUserId, toUserId));
        return "친구 추가에 성공하였습니다.";
    }

    @Transactional(readOnly = true)
    public Boolean isFriend(Long fromUserId, Long toUserId) {
        return friendRepository.existsByFromUserIdAndToUserId(fromUserId, toUserId);
    }

}
