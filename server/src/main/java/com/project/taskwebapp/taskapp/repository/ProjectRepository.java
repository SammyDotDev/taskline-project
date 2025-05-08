package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
