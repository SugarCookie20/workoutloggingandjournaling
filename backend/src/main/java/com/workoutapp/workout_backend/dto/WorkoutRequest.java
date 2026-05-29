package com.workoutapp.workout_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkoutRequest {
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long userId;
    private List<ExerciseRequest> exercises;
    private String notes;

    @Data
    public static class ExerciseRequest {
        private String name;
        private List<SetRequest> sets;
    }

    @Data
    public static class SetRequest {
        private int weight;
        private int reps;
        private int setNumber;
    }
}
