package com.project.taskwebapp.taskapp.services;

import com.project.taskwebapp.taskapp.dto.apiResponse.ApiResponseDto;
import com.project.taskwebapp.taskapp.dto.users.AuthSigninDto;
import com.project.taskwebapp.taskapp.exceptions.InvalidPasswordException;
import com.project.taskwebapp.taskapp.models.User;
import com.project.taskwebapp.taskapp.exceptions.EmailException;
import com.project.taskwebapp.taskapp.exceptions.NotFoundException;
import com.project.taskwebapp.taskapp.models.UserPrincipal;
import com.project.taskwebapp.taskapp.repository.UserRepository;
import com.project.taskwebapp.taskapp.utils.interfaces.functions.ToObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    ToObject toObject;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User addNewUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(()-> new NotFoundException("User with id: " + id + " not found"));
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()->new EmailException("Email does not exist"));
    }

    public ApiResponseDto verify(AuthSigninDto authSigninDDto){
        User toUser = toObject.toUser(authSigninDDto);
        User user = userRepository.findByUsername(toUser.getUsername());
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), authSigninDDto.password())
            );
            // If successful
            System.out.println("Authenticated: " + authentication.getName());
            if(authentication.isAuthenticated()){
                return new ApiResponseDto("success", true, new UserPrincipal(user));
            }
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
            throw e;
        }

        throw new InvalidPasswordException("invalid password");
//        return new ApiResponseDto("failure", false, new InvalidPasswordException("invalid password"));
    }
}
