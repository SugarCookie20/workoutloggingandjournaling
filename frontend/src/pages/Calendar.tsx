import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { Workout } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export const Calendar: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const userId = 1;

  useEffect(() => {
    api.workouts.getByUser(userId).then(res => setWorkouts(res.data));
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="space-y-8">
      <header className="brutalist-card bg-purple-300">
        <h1 className="text-4xl font-black uppercase italic">Calendar</h1>
        <p className="font-bold">{format(currentMonth, 'MMMM yyyy')}</p>
      </header>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="font-black text-center uppercase border-b-2 border-black pb-2">{d}</div>
        ))}
        {days.map(day => {
          const dayWorkouts = workouts.filter(w => isSameDay(new Date(w.startTime), day));
          return (
            <div key={day.toISOString()} className={`brutalist-card min-h-[100px] p-2 ${dayWorkouts.length > 0 ? 'bg-yellow-200' : ''}`}>
              <div className="font-black">{format(day, 'd')}</div>
              <div className="space-y-1 mt-1">
                {dayWorkouts.map(w => (
                  <div key={w.id} className="text-[10px] font-bold uppercase truncate border border-black bg-white px-1">
                    {w.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
