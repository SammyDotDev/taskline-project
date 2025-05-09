package com.project.taskwebapp.taskapp.dto.tasks;

import jakarta.validation.constraints.NotEmpty;

public record TaskDto(
        Integer id,
        @NotEmpty
        String title,

        @NotEmpty
        String dueDate,


        String status,

        @NotEmpty
        Integer projectId
) {
}
