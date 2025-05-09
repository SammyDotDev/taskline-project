package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.models.Task;
import com.project.taskwebapp.taskapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task addNewTask(Task task){
        return taskRepository.save(task);
    }

}
