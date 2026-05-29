package com.workoutapp.workout_backend.repository;

import com.workoutapp.workout_backend.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JournalRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByUserIdOrderByTimestampDesc(Long userId);
}
