package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.apiResponse.ApiResponseDto;
import com.project.taskwebapp.taskapp.dto.tasks.TaskDto;
import com.project.taskwebapp.taskapp.services.AuthService;
import com.project.taskwebapp.taskapp.services.ProjectService;
import com.project.taskwebapp.taskapp.services.TaskService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {
    private final TaskService taskService;
    private final ProjectService projectService;
    private final AuthService authService;
    private final ToObject toObject;
    private final ToDto toDto;

    public TaskController(TaskService taskService, ToObject toObject, ProjectService projectService,AuthService authService, ToDto toDto) {
        this.taskService = taskService;
        this.toObject = toObject;
        this.projectService = projectService;
        this.toDto = toDto;
        this.authService = authService;
    }

    @PostMapping("/add-task")
    public ApiResponseDto addTask(@Valid @RequestBody TaskDto taskDto){
        var project = projectService.getProjectById(taskDto.projectId());
        var user = authService.getUserById(taskDto.userId());
        var task = toObject.toTask(taskDto, project, user);
        
        return  new ApiResponseDto("task added successfully", true, toDto.toTaskDto(taskService.addNewTask(task), project, user));
    }

    @GetMapping("/get-tasks/{project-id}")
    public List<TaskDto> getTasks(@PathVariable("project-id") Integer id){
        return taskService.getAllTasks(id);
    }

    @DeleteMapping("/delete-task/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable("task-id") Integer id){

        taskService.deleteTask(id);
        var response = Map.of(
                "message","task deleted successfully"
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
