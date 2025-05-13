package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.dto.projects.ProjectDto;
import com.project.taskwebapp.taskapp.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    public List<ProjectDto> findAllByUserId(@Param("id") Integer id);


//    @Query(value = "DELETE FROM project WHERE user_id = :id", nativeQuery = true)
//    public List<ProjectDto> deleteByUserId(@Param("id") Integer id);

}
