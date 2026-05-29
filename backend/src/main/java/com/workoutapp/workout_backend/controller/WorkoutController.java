package com.workoutapp.workout_backend.controller;

import com.workoutapp.workout_backend.dto.WorkoutRequest;
import com.workoutapp.workout_backend.model.Exercise;
import com.workoutapp.workout_backend.model.User;
import com.workoutapp.workout_backend.model.Workout;
import com.workoutapp.workout_backend.model.WorkoutSet;
import com.workoutapp.workout_backend.repository.UserRepository;
import com.workoutapp.workout_backend.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WorkoutController {
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<Workout> getWorkoutsByUserId(@PathVariable Long userId) {
        return workoutRepository.findByUserIdOrderByStartTimeDesc(userId);
    }

    @PostMapping
    public Workout createWorkout(@RequestBody WorkoutRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        Workout workout = Workout.builder()
                .name(request.getName())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .notes(request.getNotes())
                .user(user)
                .build();

        if (request.getExercises() != null) {
            List<Exercise> exercises = request.getExercises().stream().map(exReq -> {
                Exercise exercise = Exercise.builder()
                        .name(exReq.getName())
                        .workout(workout)
                        .build();

                if (exReq.getSets() != null) {
                    List<WorkoutSet> sets = exReq.getSets().stream().map(setReq ->
                        WorkoutSet.builder()
                                .weight(setReq.getWeight())
                                .reps(setReq.getReps())
                                .setNumber(setReq.getSetNumber())
                                .exercise(exercise)
                                .build()
                    ).collect(Collectors.toList());
                    exercise.setSets(sets);
                }
                return exercise;
            }).collect(Collectors.toList());
            workout.setExercises(exercises);
        }

        return workoutRepository.save(workout);
    }

    @GetMapping("/{id}")
    public Workout getWorkout(@PathVariable Long id) {
        return workoutRepository.findById(id).orElseThrow();
    }
}
