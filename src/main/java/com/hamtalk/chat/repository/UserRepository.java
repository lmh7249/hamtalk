package com.hamtalk.chat.repository;

import com.hamtalk.chat.domain.entity.User;
import com.hamtalk.chat.model.response.UserProfileByEmailResponse;
import com.hamtalk.chat.model.response.UserProfileByIdResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("select new com.hamtalk.chat.model.response.UserProfileByEmailResponse(u, up) " +
            "from User u join UserProfile up on u.id = up.userId where u.email = :email")
    Optional<UserProfileByEmailResponse> findUserProfileByEmail(@Param("email") String email);


    @Query("select new com.hamtalk.chat.model.response.UserProfileByIdResponse(u, up)" +
            "from User u join UserProfile up on u.id = up.userId where u.id = :id")
    Optional<UserProfileByIdResponse> findUserProfileById(@Param("id") Long id);

    // 모든 유저가 존재하는지 확인하는 쿼리
    long countByIdIn(List<Long> ids);

}
