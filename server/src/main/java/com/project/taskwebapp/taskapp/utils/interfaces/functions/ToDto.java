package com.project.taskwebapp.taskapp.utils.interfaces.functions;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.dto.tasks.TaskDto;
import com.project.taskwebapp.taskapp.dto.users.AuthDto;
import com.project.taskwebapp.taskapp.dto.users.UserDto;
import com.project.taskwebapp.taskapp.models.Project;
import com.project.taskwebapp.taskapp.models.Task;
import com.project.taskwebapp.taskapp.models.User;

public class ToDto {
    public UserDto toUserDto(User user){
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getProjects());
    }

    public AuthDto toAuthDto(User user){
        return new AuthDto(user.getEmail(), user.getUsername());
    }

    public ProjectDto toProjectDto(Project project, User user){
        return new ProjectDto(project.getId(), project.getName(), project.getDescription(), user.getId());
    }

    public TaskDto toTaskDto(Task task, Project project, User user){
        return new TaskDto(task.getId(), task.getTitle(), task.getDueDate(), task.getStatus(), project.getId(), user.getId());
    }

    public TaskDto toTaskRepoDto(Task task){
        return new TaskDto(task.getId(), task.getTitle(), task.getDueDate(), task.getStatus(), task.getProject().getId(), task.getUser().getId());
    }

}
