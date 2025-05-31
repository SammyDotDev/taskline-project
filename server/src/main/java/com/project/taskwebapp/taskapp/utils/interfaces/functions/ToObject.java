package com.project.taskwebapp.taskapp.utils.interfaces.functions;


import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.dto.tasks.TaskDto;
import com.project.taskwebapp.taskapp.dto.users.AuthSigninDto;
import com.project.taskwebapp.taskapp.models.Project;
import com.project.taskwebapp.taskapp.models.Task;
import com.project.taskwebapp.taskapp.models.User;

public class ToObject {

    public User toUser(AuthSigninDto authSigninDtoDto){
        User user = new User();
        user.setUsername(authSigninDtoDto.username());
//        user.setEmail(authSigninDtoDto.email());
        user.setPassword(authSigninDtoDto.password());
        return user;
    }

    public Project toProject(ProjectDto projectDto, User user){
        Project project = new Project();
        project.setId(projectDto.id());
        project.setName(projectDto.name());
        project.setDescription(projectDto.description());
        project.setUser(user);
        return project;
    }

    public Task toTask(TaskDto taskDto, Project project, User user){
        Task task = new Task();
        task.setId(taskDto.id());
        task.setTitle(taskDto.title());
        task.setDueDate(taskDto.dueDate());
        task.setProject(project);
        task.setUser(user);
        return task;
    }
}
