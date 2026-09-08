import React from 'react';
import {
  Mic, Users, BookOpen, Zap, BarChart2, ShieldCheck, Sparkles, Building2
} from 'lucide-react';

export function Navigation({ activeTab, setActiveTab, sessionMode, setSessionMode }) {
  const tabs = [
    { id: 'boardroom', label: 'ADB Boardroom Simulation', icon: Mic },
    { id: 'teacher', label: 'Teacher Dashboard', icon: Users },
    { id: 'lexicon', label: 'MDB Lexicon DB (300+)', icon: BookOpen },
    { id: 'sprints', label: 'Collocation Sprints', icon: Zap },
    { id: 'analytics', label: 'Diagnostic Analytics', icon: BarChart2 }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-slate-950 font-black flex items-center justify-center">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-tight text-slate-100 font-serif">
                  FinSpeak <span className="text-cyan-400">ADB</span>
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  MDB Executive Voice
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Asian Development Bank Executive Coaching Platform</p>
            </div>
          </div>

          {/* Mode Switcher: Student Solo vs Teacher Guided */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSessionMode('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sessionMode === 'student'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              Student Solo Practice
            </button>
            <button
              onClick={() => setSessionMode('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sessionMode === 'teacher'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Teacher Guided Review
            </button>
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-200 block">Korean Finance Specialist</span>
              <span className="text-[10px] text-cyan-400 block font-mono">ADB Manila Candidate</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-cyan-400">
              KR
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
