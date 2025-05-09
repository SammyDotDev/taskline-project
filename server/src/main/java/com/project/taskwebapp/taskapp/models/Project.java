package com.project.taskwebapp.taskapp.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private String description;

    @ManyToOne
    @JsonBackReference("user-projects")
    @JoinColumn(
            name = "user_id"
    )
    private User user;

    @OneToMany(
            mappedBy = "project"
    )
    @JsonManagedReference("project-tasks")
    private List<Task> tasks;

    public Project() {
    }

    public Project(Integer id, String name, String description, User user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
