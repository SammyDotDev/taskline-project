package com.project.taskwebapp.taskapp.dto.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record AuthSigninDto(
        @NotEmpty(message = "Email cannot be empty")
        @Email
        String email,

        @NotEmpty(message = "Password cannot be empty")
        String password
) {
}
