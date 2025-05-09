package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.users.UserDto;
import com.project.taskwebapp.taskapp.models.User;
import com.project.taskwebapp.taskapp.services.AuthService;
import com.project.taskwebapp.taskapp.services.UserService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    public final PasswordEncoder passwordEncoder;
    public final ToDto toDto;

    public UserController(UserService userService, AuthService authService, PasswordEncoder passwordEncoder, ToDto toDto)
    {
        this.userService = userService;
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
        this.toDto = toDto;
    }

    @PostMapping("/users/add-user")
    public UserDto createUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return toDto.toUserDto(authService.addNewUser(user));
    }


    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
