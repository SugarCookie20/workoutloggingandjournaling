import React, { useState } from 'react';
import { api } from '../api/client';
import type { JournalEntry } from '../types';
import { Save } from 'lucide-react';

export const Journal: React.FC = () => {
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState('Neutral');
  const [content, setContent] = useState('');
  const userId = 1;

  const saveEntry = async () => {
    const entry: JournalEntry = {
      energyLevel: energy,
      mood: mood,
      content: content,
      userId: userId
    };
    try {
      await api.journal.create(entry);
      alert("Journal entry saved!");
      setContent('');
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  return (
    <div className="space-y-8">
      <header className="brutalist-card bg-blue-300">
        <h1 className="text-4xl font-black uppercase italic">Journal</h1>
        <p className="font-bold">Mind over matter.</p>
      </header>

      <div className="brutalist-card space-y-6">
        <div>
          <label className="block font-black uppercase mb-2">Energy Level (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full h-8 appearance-none bg-black border-2 border-black"
          />
          <div className="text-center font-black text-2xl mt-2">{energy}</div>
        </div>

        <div>
          <label className="block font-black uppercase mb-2">Mood</label>
          <input
            className="brutalist-input w-full"
            placeholder="e.g. HYPED, TIRED, ANGRY"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-black uppercase mb-2">Notes</label>
          <textarea
            className="brutalist-input w-full h-40"
            placeholder="What's on your mind? Sleep? Diet? Life?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          onClick={saveEntry}
          className="brutalist-button w-full bg-black text-white py-4 text-xl flex justify-center items-center gap-2 uppercase"
        >
          <Save size={24} strokeWidth={3} /> Save Entry
        </button>
      </div>
    </div>
  );
};
