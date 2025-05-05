package com.project.taskwebapp.taskapp.utils.interfaces.functions;


import com.project.taskwebapp.taskapp.dto.users.AuthDto;
import com.project.taskwebapp.taskapp.dto.users.AuthSigninDto;
import com.project.taskwebapp.taskapp.entity.User;

public class ToObject {
    public User toUser(AuthSigninDto authSigninDtoDto){
        User user = new User();
        user.setEmail(authSigninDtoDto.email());
        user.setPassword(authSigninDtoDto.password());
        return user;
    }
}
