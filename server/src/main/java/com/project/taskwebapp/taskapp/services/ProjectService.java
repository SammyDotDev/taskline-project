package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDtoResponse;
import com.project.taskwebapp.taskapp.exceptions.NotFoundException;
import com.project.taskwebapp.taskapp.models.Project;
import com.project.taskwebapp.taskapp.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public List<ProjectDtoResponse> getUserProjects(Integer id){
        return projectRepository.findAllByUserId(id);
    }

    public Project getProjectById(Integer id){
        return projectRepository.findById(id).orElseThrow(()-> new NotFoundException("Project not found"));
    }
}
