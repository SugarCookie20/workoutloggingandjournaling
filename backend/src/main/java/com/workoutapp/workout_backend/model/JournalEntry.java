package com.workoutapp.workout_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "journal_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;
    private int energyLevel; // 1-10
    private String mood;
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
