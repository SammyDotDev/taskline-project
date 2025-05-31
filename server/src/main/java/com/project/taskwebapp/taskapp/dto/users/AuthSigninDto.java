package com.project.taskwebapp.taskapp.dto.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record AuthSigninDto(
        @NotEmpty(message = "username cannot be empty")
        String username,

        @NotEmpty(message = "password cannot be empty")
        String password
) {
}
