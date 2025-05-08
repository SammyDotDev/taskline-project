package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.entity.Project;
import com.project.taskwebapp.taskapp.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }
}
