package com.workoutapp.workout_backend.controller;

import com.workoutapp.workout_backend.dto.JournalRequest;
import com.workoutapp.workout_backend.model.JournalEntry;
import com.workoutapp.workout_backend.model.User;
import com.workoutapp.workout_backend.repository.JournalRepository;
import com.workoutapp.workout_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JournalController {
    private final JournalRepository journalRepository;
    private final UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<JournalEntry> getJournalEntriesByUserId(@PathVariable Long userId) {
        return journalRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    @PostMapping
    public JournalEntry createJournalEntry(@RequestBody JournalRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow();

        JournalEntry entry = JournalEntry.builder()
                .timestamp(request.getTimestamp() != null ? request.getTimestamp() : LocalDateTime.now())
                .energyLevel(request.getEnergyLevel())
                .mood(request.getMood())
                .content(request.getContent())
                .user(user)
                .build();

        return journalRepository.save(entry);
    }
}
