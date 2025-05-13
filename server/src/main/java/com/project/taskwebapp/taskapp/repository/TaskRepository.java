package com.project.taskwebapp.taskapp.repository;

import com.project.taskwebapp.taskapp.models.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
//    public List<Task> findAllByProjectId(Integer id);

    @Query(value = "SELECT * FROM task WHERE project_id = :id", nativeQuery = true)
    public List<Task> findAllByProjectId(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM task  WHERE project_id = :projectId", nativeQuery = true)
    public void deleteByProjectId(@Param("projectId") Integer projectId);
}
