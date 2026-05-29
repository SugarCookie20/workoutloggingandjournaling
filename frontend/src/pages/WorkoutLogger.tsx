import React, { useState } from 'react';
import { api } from '../api/client';
import type { Workout, Exercise } from '../types';
import { Plus, Save, Trash2 } from 'lucide-react';

export const WorkoutLogger: React.FC = () => {
  const [workoutName, setWorkoutName] = useState('New Workout');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const userId = 1;

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ setNumber: 1, reps: 0, weight: 0 }] }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const addSet = (eIndex: number) => {
    const newExercises = [...exercises];
    const sets = newExercises[eIndex].sets;
    sets.push({ setNumber: sets.length + 1, reps: 0, weight: 0 });
    setExercises(newExercises);
  };

  const saveWorkout = async () => {
    const workout: Workout = {
      name: workoutName,
      startTime: new Date().toISOString(),
      exercises: exercises,
      userId: userId
    };
    try {
      await api.workouts.create(workout);
      alert("Workout saved!");
      setExercises([]);
      setWorkoutName('New Workout');
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="brutalist-card bg-orange-400">
        <input
          className="text-3xl font-black bg-transparent border-none uppercase focus:outline-none w-full placeholder-black"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="WORKOUT NAME"
        />
      </div>

      <div className="space-y-6">
        {exercises.map((ex, eIdx) => (
          <div key={eIdx} className="brutalist-card space-y-4">
            <div className="flex justify-between items-center gap-4">
              <input
                className="brutalist-input flex-1 font-bold text-lg"
                placeholder="EXERCISE NAME (e.g. Bench Press)"
                value={ex.name}
                onChange={(e) => {
                  const newEx = [...exercises];
                  newEx[eIdx].name = e.target.value;
                  setExercises(newEx);
                }}
              />
              <button
                onClick={() => removeExercise(eIdx)}
                className="brutalist-button bg-red-500 text-white"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-black text-sm uppercase">
              <div>Set</div>
              <div>Weight (kg)</div>
              <div>Reps</div>
              <div></div>
            </div>

            {ex.sets.map((set, sIdx) => (
              <div key={sIdx} className="grid grid-cols-4 gap-2 items-center">
                <div className="font-black text-center">{set.setNumber}</div>
                <input
                  type="number"
                  className="brutalist-input text-center"
                  value={set.weight}
                  onChange={(e) => {
                    const newEx = [...exercises];
                    newEx[eIdx].sets[sIdx].weight = parseInt(e.target.value) || 0;
                    setExercises(newEx);
                  }}
                />
                <input
                  type="number"
                  className="brutalist-input text-center"
                  value={set.reps}
                  onChange={(e) => {
                    const newEx = [...exercises];
                    newEx[eIdx].sets[sIdx].reps = parseInt(e.target.value) || 0;
                    setExercises(newEx);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => addSet(eIdx)}
              className="brutalist-button w-full flex justify-center items-center gap-2 bg-gray-200"
            >
              <Plus size={20} /> ADD SET
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={addExercise}
          className="brutalist-button flex-1 bg-green-400 py-4 text-xl flex justify-center items-center gap-2"
        >
          <Plus size={24} strokeWidth={3} /> ADD EXERCISE
        </button>
        <button
          onClick={saveWorkout}
          className="brutalist-button flex-1 bg-black text-white py-4 text-xl flex justify-center items-center gap-2"
        >
          <Save size={24} strokeWidth={3} /> SAVE WORKOUT
        </button>
      </div>
    </div>
  );
};
