package com.project.taskwebapp.taskapp.dto.apiResponse;

import com.project.taskwebapp.taskapp.dto.users.UserDto;

public record ApiResponseDto(
        String message,
        Boolean success,
        Object user
) {
}
