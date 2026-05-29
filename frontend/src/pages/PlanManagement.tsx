import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Plus, Trash2, Save } from 'lucide-react';

export const PlanManagement: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [newTemplateName, setNewTemplateName] = useState('');

  // For MVP, we'll use these to mock the functionality as the backend entities were just added
  const userId = 1;

  return (
    <div className="space-y-8">
      <header className="brutalist-card bg-pink-300">
        <h1 className="text-4xl font-black uppercase italic">Plans & Templates</h1>
        <p className="font-bold">Systematize your gains.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-black uppercase">Exercise Templates</h2>
          <div className="brutalist-card space-y-4">
            <div className="flex gap-2">
              <input
                className="brutalist-input flex-1"
                placeholder="New Exercise (e.g. Overhead Press)"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
              <button className="brutalist-button bg-green-400"><Plus size={20}/></button>
            </div>
            <div className="space-y-2">
               {['Bench Press', 'Squat', 'Deadlift', 'Pullups'].map(t => (
                 <div key={t} className="flex justify-between items-center border-2 border-black p-2 font-bold uppercase">
                   {t}
                   <button className="text-red-500"><Trash2 size={18}/></button>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black uppercase">Workout Plans</h2>
          <div className="brutalist-card bg-white space-y-4">
             <div className="border-4 border-black p-4 bg-yellow-200">
                <h3 className="text-xl font-black italic underline">PUSH / PULL / LEGS</h3>
                <p className="text-sm font-bold mt-1">3 Days / Week split</p>
                <div className="mt-4 flex gap-2">
                   <button className="brutalist-button bg-black text-white text-xs">VIEW</button>
                   <button className="brutalist-button bg-white text-xs">EDIT</button>
                </div>
             </div>

             <button className="brutalist-button w-full bg-blue-300 font-black py-4">
               + CREATE NEW PLAN
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};
