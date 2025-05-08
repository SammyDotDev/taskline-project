package com.project.taskwebapp.taskapp.controllers;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.entity.Project;
import com.project.taskwebapp.taskapp.services.ProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/add-project")
    public ProjectDto createNewProject(@RequestBody Project project){
        return projectService.createProject(project);
    }
}
