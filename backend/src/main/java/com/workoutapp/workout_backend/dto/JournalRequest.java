package com.workoutapp.workout_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JournalRequest {
    private LocalDateTime timestamp;
    private int energyLevel;
    private String mood;
    private String content;
    private Long userId;
}
