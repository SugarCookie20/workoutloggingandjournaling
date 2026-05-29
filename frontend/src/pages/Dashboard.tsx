import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { Workout, JournalEntry } from '../types';
import { Activity, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const userId = 1; // Default for MVP

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wRes, jRes] = await Promise.all([
          api.workouts.getByUser(userId),
          api.journal.getByUser(userId)
        ]);
        setWorkouts(wRes.data);
        setJournalEntries(jRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <header className="brutalist-card bg-yellow-300">
        <h1 className="text-4xl font-black uppercase italic">Dashboard</h1>
        <p className="font-bold">Keep tracking. No excuses.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-2 uppercase">
              <Activity size={32} strokeWidth={3} />
              Recent Workouts
            </h2>
          </div>
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <div className="brutalist-card">No workouts yet. Start moving.</div>
            ) : (
              workouts.slice(0, 3).map(w => (
                <div key={w.id} className="brutalist-card">
                  <h3 className="text-xl font-black">{w.name}</h3>
                  <p className="text-sm font-bold opacity-70">
                    {new Date(w.startTime).toLocaleDateString()}
                  </p>
                  <p className="font-bold mt-2">{w.exercises.length} Exercises completed</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black flex items-center gap-2 uppercase">
            <Zap size={32} strokeWidth={3} />
            Energy & Journal
          </h2>
          <div className="space-y-4">
            {journalEntries.length === 0 ? (
              <div className="brutalist-card">Journal is empty. How do you feel?</div>
            ) : (
              journalEntries.slice(0, 3).map(j => (
                <div key={j.id} className="brutalist-card bg-blue-100">
                  <div className="flex justify-between items-center">
                     <span className="font-black">LEVEL: {j.energyLevel}/10</span>
                     <span className="text-sm font-bold uppercase">{j.mood}</span>
                  </div>
                  <p className="mt-2 font-medium">{j.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
