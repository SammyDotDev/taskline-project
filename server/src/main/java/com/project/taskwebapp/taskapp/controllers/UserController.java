package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.users.UserDto;
import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.services.UserService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    public final PasswordEncoder passwordEncoder;
    public final ToDto toDto;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, ToDto toDto)
    {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.toDto = toDto;
    }

    @PostMapping("/users/add-user")
    public UserDto createUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return toDto.toUserDto(userService.addNewUser(user));
    }


    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
