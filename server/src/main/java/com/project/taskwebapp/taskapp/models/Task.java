package com.project.taskwebapp.taskapp.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    private String title;

    private String dueDate;

    private String status;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    @JsonBackReference("user-tasks")
    private User user;

    @ManyToOne
    @JoinColumn(
            name = "project_id"
    )
    @JsonBackReference("project-tasks")
    private Project project;

    public Task() {
    }

    public Task(Integer id, String title, String dueDate, String status, Project project, User user) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.project = project;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
