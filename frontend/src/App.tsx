import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { WorkoutLogger } from './pages/WorkoutLogger';
import { Journal } from './pages/Journal';
import { Progress } from './pages/Progress';
import { Calendar } from './pages/Calendar';
import { PlanManagement } from './pages/PlanManagement';
import { PlusSquare, BookOpen, Home, BarChart2, Calendar as CalendarIcon, ClipboardList } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'workout' | 'journal' | 'progress' | 'calendar' | 'plans'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'workout': return <WorkoutLogger />;
      case 'journal': return <Journal />;
      case 'progress': return <Progress />;
      case 'calendar': return <Calendar />;
      case 'plans': return <PlanManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black p-6 flex flex-col gap-8">
        <div className="text-3xl font-black uppercase italic tracking-tighter">
          Hard<br/>Log
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'dashboard' ? 'bg-yellow-300' : ''}`}
          >
            <Home size={20} /> DASHBOARD
          </button>
          <button
            onClick={() => setCurrentPage('workout')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'workout' ? 'bg-orange-400' : ''}`}
          >
            <PlusSquare size={20} /> LOG WORKOUT
          </button>
          <button
            onClick={() => setCurrentPage('journal')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'journal' ? 'bg-blue-300' : ''}`}
          >
            <BookOpen size={20} /> JOURNAL
          </button>
          <button
            onClick={() => setCurrentPage('progress')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'progress' ? 'bg-green-300' : ''}`}
          >
            <BarChart2 size={20} /> PROGRESS
          </button>
          <button
            onClick={() => setCurrentPage('calendar')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'calendar' ? 'bg-purple-300' : ''}`}
          >
            <CalendarIcon size={20} /> CALENDAR
          </button>
          <button
            onClick={() => setCurrentPage('plans')}
            className={`brutalist-button flex items-center gap-3 ${currentPage === 'plans' ? 'bg-pink-300' : ''}`}
          >
            <ClipboardList size={20} /> PLANS
          </button>
        </div>

        <div className="mt-auto pt-8 border-t-2 border-black hidden md:block">
          <p className="text-xs font-black uppercase">User: Elite Lifter</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
