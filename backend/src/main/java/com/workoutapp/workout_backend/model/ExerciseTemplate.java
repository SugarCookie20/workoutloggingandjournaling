package com.workoutapp.workout_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exercise_templates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String category; // e.g., Chest, Legs
}
