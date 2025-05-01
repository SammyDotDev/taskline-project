package com.project.taskwebapp.taskapp.utils.interfaces.functions;

import com.project.taskwebapp.taskapp.dto.users.UserDto;
import com.project.taskwebapp.taskapp.entity.User;

public class ToDto {
    public UserDto toUserDto(User user){
        return new UserDto(user.getUsername(), user.getEmail(), user.getProjects());
    }

}
