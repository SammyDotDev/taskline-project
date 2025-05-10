package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.dto.tasks.TaskDto;
import com.project.taskwebapp.taskapp.models.Task;
import com.project.taskwebapp.taskapp.repository.TaskRepository;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final ToDto toDto;

    public TaskService(TaskRepository taskRepository, ToDto toDto) {
        this.taskRepository = taskRepository;
        this.toDto = toDto;
    }

    public Task addNewTask(Task task){
        return taskRepository.save(task);
    }

    public void deleteTask(Integer id){
        taskRepository.deleteById(id);
    }

    public List<TaskDto> getAllTasks(Integer id){
        return taskRepository.findAllByProjectId(id).stream().map(toDto::toTaskRepoDto).collect(Collectors.toList());
    }

}
