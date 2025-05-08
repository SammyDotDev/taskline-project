package com.project.taskwebapp.taskapp.dto.projects;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.bind.DefaultValue;

public record ProjectDto(
        Integer id,

        @NotEmpty(message = "project name cannot be empty")
        String name,

        @DefaultValue(value = "No Description")
        String description,

        @NotNull
        Integer userId
) {
}
