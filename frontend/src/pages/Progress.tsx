import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { Workout } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Progress: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const userId = 1;

  useEffect(() => {
    api.workouts.getByUser(userId).then(res => setWorkouts(res.data));
  }, []);

  // Transform data for a specific exercise, e.g., "Bench Press" max weight
  const getExerciseData = (exerciseName: string) => {
    return workouts
      .filter(w => w.exercises.some(e => e.name.toLowerCase() === exerciseName.toLowerCase()))
      .map(w => {
        const exercise = w.exercises.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
        const maxWeight = Math.max(...(exercise?.sets.map(s => s.weight) || [0]));
        return {
          date: new Date(w.startTime).toLocaleDateString(),
          weight: maxWeight
        };
      })
      .reverse();
  };

  const chartData = getExerciseData("Deadlift");

  return (
    <div className="space-y-8">
      <header className="brutalist-card bg-green-300">
        <h1 className="text-4xl font-black uppercase italic">Progress</h1>
        <p className="font-bold">Numbers don't lie.</p>
      </header>

      <div className="brutalist-card h-[400px]">
        <h2 className="text-2xl font-black mb-4 uppercase">Deadlift Max Weight (kg)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000" />
            <XAxis dataKey="date" stroke="#000" tick={{fontWeight: 'bold'}} />
            <YAxis stroke="#000" tick={{fontWeight: 'bold'}} />
            <Tooltip
                contentStyle={{border: '4px solid black', borderRadius: '0', fontWeight: 'bold'}}
            />
            <Line type="stepAfter" dataKey="weight" stroke="#000" strokeWidth={4} dot={{ r: 8, fill: '#000' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
