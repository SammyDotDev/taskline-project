package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/add-user")
    public User createUser(@RequestBody User user){
        return userService.addNewUser(user);
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
