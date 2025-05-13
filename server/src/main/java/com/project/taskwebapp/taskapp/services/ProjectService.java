package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.dto.projects.ProjectDtoResponse;
import com.project.taskwebapp.taskapp.exceptions.NotFoundException;
import com.project.taskwebapp.taskapp.models.Project;
import com.project.taskwebapp.taskapp.repository.ProjectRepository;
import com.project.taskwebapp.taskapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public ProjectService(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public List<ProjectDto> getUserProjects(Integer id){
        return projectRepository.findAllByUserId(id);
    }

    public Project getProjectById(Integer id){
        return projectRepository.findById(id).orElseThrow(()-> new NotFoundException("Project not found"));
    }

    public void deleteProjectById(Integer id) {
        taskRepository.deleteByProjectId(id);
        projectRepository.deleteById(id);
    }
}
