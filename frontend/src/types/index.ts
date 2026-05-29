export interface User {
  id?: number;
  username: string;
  email: string;
  bio: string;
}

export interface Workout {
  id?: number;
  name: string;
  startTime: string;
  endTime?: string;
  exercises: Exercise[];
  notes?: string;
  userId?: number;
}

export interface Exercise {
  id?: number;
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  id?: number;
  weight: number;
  reps: number;
  setNumber: number;
}

export interface JournalEntry {
  id?: number;
  timestamp?: string;
  energyLevel: number;
  mood: string;
  content: string;
  userId?: number;
}
