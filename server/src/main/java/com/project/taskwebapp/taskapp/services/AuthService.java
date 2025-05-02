package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.repository.UserRepository;
import com.project.taskwebapp.taskapp.utils.interfaces.AuthServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService implements AuthServiceInterface {
    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return List.of();
    }

    @Override
    public User getUserById(Integer id) {
        return null;
    }
}
