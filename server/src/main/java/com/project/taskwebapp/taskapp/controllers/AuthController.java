package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.users.AuthDto;
import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.services.AuthService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final ToDto toDto;

    public AuthController(AuthService authService, ToDto toDto) {
        this.authService = authService;
        this.toDto = toDto;
    }

    @PostMapping("/signup")
    public AuthDto signup(@RequestBody User user){
        return toDto.toAuthDto(authService.addNewUser(user));
    }


}
