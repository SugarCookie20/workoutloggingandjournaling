import axios from 'axios';
import type { User, Workout, JournalEntry } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  users: {
    getAll: () => axios.get<User[]>(`${API_BASE_URL}/users`),
    get: (id: number) => axios.get<User>(`${API_BASE_URL}/users/${id}`),
    create: (user: User) => axios.post<User>(`${API_BASE_URL}/users`, user),
  },
  workouts: {
    getByUser: (userId: number) => axios.get<Workout[]>(`${API_BASE_URL}/workouts/user/${userId}`),
    create: (workout: Workout) => axios.post<Workout>(`${API_BASE_URL}/workouts`, workout),
    get: (id: number) => axios.get<Workout>(`${API_BASE_URL}/workouts/${id}`),
  },
  journal: {
    getByUser: (userId: number) => axios.get<JournalEntry[]>(`${API_BASE_URL}/journal/user/${userId}`),
    create: (entry: JournalEntry) => axios.post<JournalEntry>(`${API_BASE_URL}/journal`, entry),
  }
};
