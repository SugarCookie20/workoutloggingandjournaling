package com.workoutapp.workout_backend.repository;

import com.workoutapp.workout_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
