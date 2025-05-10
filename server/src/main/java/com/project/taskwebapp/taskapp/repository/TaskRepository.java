package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    public List<Task> findAllByProjectId(Integer id);
}
