package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.dto.projects.ProjectNameDto;
import com.project.taskwebapp.taskapp.services.UserService;
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
    private final UserService userService;
    private final ToDto toDto;
    private final ToObject toObject;

    public ProjectController(ProjectService projectService, UserService userService, ToDto toDto, ToObject toObject) {
        this.projectService = projectService;
        this.userService = userService;
        this.toDto = toDto;
        this.toObject =toObject;
    }

    @PostMapping("/add-project")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectDto createNewProject(@Valid @RequestBody ProjectDto project){

        var userByUserId = userService.getUserById(project.userId());
        var projectMain = projectService.createProject(toObject.toProject(project, userByUserId));
        System.out.println(userByUserId.getEmail());
        return toDto.toProjectDto(projectMain, userByUserId);
    }

    @GetMapping("/get-project/{user-id}/{project-id}")
    public ProjectDto getProjectById(@PathVariable("user-id") Integer userId, @PathVariable("project-id") Integer projectId){
        var user = userService.getUserById(userId);
        var project = projectService.getProjectById(projectId);
        return toDto.toProjectDto(project, user);
    }

    @GetMapping("/get-projects/{user-id}")
    public List<ProjectDto> getProjectsByUserId(@PathVariable("user-id") Integer userId){
        return projectService.getUserProjects(userId);
    }



    @DeleteMapping("/delete-project/{project-id}")
    public void deleteProject(@PathVariable("project-id") Integer id){
        projectService.deleteProjectById(id);
    }

    @PatchMapping("/update-project-name/{user-id}/{project-id}")
    public ProjectDto updateProjectName(@PathVariable("user-id") Integer userId, @PathVariable("project-id") Integer projectId, @RequestBody ProjectNameDto newProjectName){
        return projectService.updateProjectName(userId, projectId, newProjectName.name());
    }
}
