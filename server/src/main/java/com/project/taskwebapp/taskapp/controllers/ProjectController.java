package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.dto.projects.ProjectDtoResponse;
import com.project.taskwebapp.taskapp.services.AuthService;
import com.project.taskwebapp.taskapp.services.ProjectService;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
    private final ProjectService projectService;
    private final AuthService authService;
    private final ToDto toDto;
    private final ToObject toObject;

    public ProjectController(ProjectService projectService, AuthService authService, ToDto toDto, ToObject toObject) {
        this.projectService = projectService;
        this.authService = authService;
        this.toDto = toDto;
        this.toObject =toObject;
    }

    @PostMapping("/add-project")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDto createNewProject(@Valid @RequestBody ProjectDto project){

        var userByUserId = authService.getUserById(project.userId());
        var projectMain = projectService.createProject(toObject.toProject(project, userByUserId));
        System.out.println(userByUserId.getEmail());
        return toDto.toProjectDto(projectMain, userByUserId);
    }

    @GetMapping("/get-projects/{user-id}")
    public List<ProjectDto> getProjectsByUserId(@PathVariable("user-id") Integer userId){
        return projectService.getUserProjects(userId);
    }



    @DeleteMapping("/delete-project/{project-id}")
    public void deleteProject(@PathVariable("project-id") Integer id){
        projectService.deleteProjectById(id);
    }
}
