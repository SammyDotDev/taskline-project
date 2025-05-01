package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
