package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
