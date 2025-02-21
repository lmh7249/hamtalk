package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.Friend;
import com.hamtalk.chat.model.response.FriendResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("select new com.hamtalk.chat.model.response.FriendResponse(f, up) " +
            "from Friend f join UserProfile up on f.toUserId = up.userId " +
            "where f.fromUserId = :fromUserId AND f.friendStatusId IN :friendStatusIds")
    List<FriendResponse> findFriendsWithProfile(@Param("fromUserId") Long fromUserId, @Param("friendStatusIds") List<Integer> friendStatusIds);
}
