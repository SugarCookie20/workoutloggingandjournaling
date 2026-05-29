package com.workoutapp.workout_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
      name = "plan_exercises",
      joinColumns = @JoinColumn(name = "plan_id"),
      inverseJoinColumns = @JoinColumn(name = "template_id"))
    private List<ExerciseTemplate> exerciseTemplates = new ArrayList<>();
}
