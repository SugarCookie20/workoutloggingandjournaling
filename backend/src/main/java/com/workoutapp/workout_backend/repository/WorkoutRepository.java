package com.workoutapp.workout_backend.repository;

import com.workoutapp.workout_backend.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserIdOrderByStartTimeDesc(Long userId);
}
