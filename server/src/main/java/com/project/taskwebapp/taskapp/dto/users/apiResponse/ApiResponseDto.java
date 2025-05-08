package com.project.taskwebapp.taskapp.dto.users.apiResponse;

import com.project.taskwebapp.taskapp.dto.users.UserDto;

public record ApiResponseDto(
        String message,
        Boolean success,
        UserDto Data
) {
}
