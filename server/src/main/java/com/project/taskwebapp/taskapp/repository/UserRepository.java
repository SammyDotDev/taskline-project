package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByEmail(String email);

    public User findByUsername(String username);
}
