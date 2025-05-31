package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.apiResponse.ApiResponseDto;
import com.project.taskwebapp.taskapp.dto.users.AuthSigninDto;
import com.project.taskwebapp.taskapp.dto.users.UserDto;
import com.project.taskwebapp.taskapp.models.User;
import com.project.taskwebapp.taskapp.exceptions.EmailException;
import com.project.taskwebapp.taskapp.exceptions.InvalidPasswordException;
import com.project.taskwebapp.taskapp.services.UserService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import jakarta.validation.Valid;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*"
)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;

    @Autowired
    private ToDto toDto;

    @Autowired
    private ToObject toObject;


    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto signup(@RequestBody User user){
        try{
            return new ApiResponseDto("Sign in successful", true, toDto.toAuthDto(userService.addNewUser(user)));
        }catch(ConstraintViolationException e){
            throw new EmailException("Email already exists");
        }
    }

    @PostMapping("/signin")
    public ApiResponseDto signin(@Valid @RequestBody AuthSigninDto authSigninDDto){
        return userService.verify(authSigninDDto);
    }



}

