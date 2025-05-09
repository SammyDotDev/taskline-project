package com.project.taskwebapp.taskapp.utils.interfaces;

import com.project.taskwebapp.taskapp.models.User;

import java.util.List;

public interface AuthServiceInterface {
    User addNewUser(User user);

    List<User> getAllUsers();

    User getUserById(Integer id);
}
