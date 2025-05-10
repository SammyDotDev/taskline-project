package com.project.taskwebapp.taskapp.dto.tasks;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record TaskDto(
        Integer id,
        @NotEmpty
        String title,

        @NotEmpty
        String dueDate,


        String status,

        @NotNull(message = "project_id cannot be null")
        Integer projectId,

        @NotNull(message = "user_id cannot be null")
        Integer userId
) {
}
