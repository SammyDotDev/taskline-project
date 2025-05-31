package com.project.taskwebapp.taskapp.utils.interfaces;

import com.project.taskwebapp.taskapp.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserServiceInterface {
    User addNewUser(User user);

    List<User> getAllUsers();

    User getUserById(Integer id);
}
