package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.users.AuthDto;
import com.project.taskwebapp.taskapp.dto.users.AuthSigninDto;
import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.exceptions.InvalidPasswordException;
import com.project.taskwebapp.taskapp.services.AuthService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*"
)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final ToDto toDto;
    private final ToObject toObject;

    public AuthController(AuthService authService, ToDto toDto, ToObject toObject) {
        this.authService = authService;
        this.toDto = toDto;
        this.toObject = toObject;
    }

    @PostMapping("/signup")
    public AuthDto signup(@RequestBody User user){
        return toDto.toAuthDto(authService.addNewUser(user));
    }

    @PostMapping("/signin")
    public User signin(@RequestBody AuthSigninDto authSigninDDto){
        User user = toObject.toUser(authSigninDDto);

        User userByEmail = authService.findByEmail(user.getEmail());

        if(userByEmail.getPassword().equals(user.getPassword())){
            return userByEmail;
        }

        throw new InvalidPasswordException("Invalid password");
    }

}
