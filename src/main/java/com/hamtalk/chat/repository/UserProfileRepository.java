package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.UserProfile;
import com.hamtalk.chat.model.projection.UserProfileProjection;
import com.hamtalk.chat.model.response.MyProfileResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("select new com.hamtalk.chat.model.response.MyProfileResponse(u, up) from User u join UserProfile up on u.id  = up.userId  where u.id = :id")
    Optional<MyProfileResponse> findUserWithProfileById(@Param("id") Long id);

    //TODO: 설명: senderIds 목록에 포함된 유저를 projection에 매핑해서 반환.
    List<UserProfileProjection> findByUserIdIn(List<Long> senderIds);

    Optional<UserProfileProjection> findByUserId(Long userId);

    Optional<UserProfile> findEntityByUserId(Long userId);

}
