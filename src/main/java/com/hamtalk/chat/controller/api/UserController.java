package com.hamtalk.chat.controller.api;

import com.hamtalk.chat.model.request.UserSignupRequest;
import com.hamtalk.chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(UserSignupRequest dto) {
        String message = userService.signup(dto);
        return ResponseEntity.ok(message);
    }

}
