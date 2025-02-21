package com.hamtalk.chat.service;
import com.hamtalk.chat.model.response.FriendResponse;
import com.hamtalk.chat.repository.FriendRepository;
import com.hamtalk.common.model.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;

    @Transactional(readOnly = true)
    public ApiResponse<List<FriendResponse>> getFriendList(Long userId, List<Integer> friendStatusIds) {
        // 1. friendStatusIds가 null이거나 비어 있으면 예외 발생

        if (friendStatusIds == null || friendStatusIds.isEmpty()) {
            throw new IllegalArgumentException("friendStatusIds는 필수 값입니다.");
        }
        // 3. 정상적인 상태 값만 포함하여 조회
        List<FriendResponse> friends = friendRepository.findFriendsWithProfile(userId, friendStatusIds);
        return ApiResponse.ok(friends);
    }

}
