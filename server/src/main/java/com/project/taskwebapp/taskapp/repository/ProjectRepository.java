package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDtoResponse;
import com.project.taskwebapp.taskapp.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    public List<ProjectDtoResponse> findAllByUserId(Integer id);
}
