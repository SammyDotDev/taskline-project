package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.entity.User;
import com.project.taskwebapp.taskapp.repository.UserRepository;
import com.project.taskwebapp.taskapp.utils.interfaces.UserServiceInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService implements UserServiceInterface {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addNewUser(User user){

        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Integer id){
        return userRepository.findById(id).orElse(new User());
    }


}
