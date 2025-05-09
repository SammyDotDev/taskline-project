package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.tasks.TaskDto;
import com.project.taskwebapp.taskapp.models.Task;
import com.project.taskwebapp.taskapp.services.ProjectService;
import com.project.taskwebapp.taskapp.services.TaskService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {
    private final TaskService taskService;
    private final ProjectService projectService;
    private final ToObject toObject;
    private final ToDto toDto;

    public TaskController(TaskService taskService, ToObject toObject, ProjectService projectService, ToDto toDto) {
        this.taskService = taskService;
        this.toObject = toObject;
        this.projectService = projectService;
        this.toDto = toDto;
    }

    @PostMapping("/add-task")
    public TaskDto addTask(@RequestBody TaskDto taskDto){
        var project = projectService.getProjectById(taskDto.projectId());
        var task = toObject.toTask(taskDto, project);
        return toDto.toTaskDto(taskService.addNewTask(task), project);
    }
}
