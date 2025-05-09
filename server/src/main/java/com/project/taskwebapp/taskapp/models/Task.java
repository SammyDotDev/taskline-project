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
            name = "user-id"
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

    public Task(Integer id, String title, String dueDate, String status, Project project) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.project = project;
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
}
