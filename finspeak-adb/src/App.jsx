import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { BoardroomSimulator } from './components/BoardroomSimulator';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LexiconDatabase } from './components/LexiconDatabase';
import { SprintDrills } from './components/SprintDrills';
import { DiagnosticAnalytics } from './components/DiagnosticAnalytics';
import { Building2, ShieldCheck, Sparkles, Globe, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('boardroom');
  const [sessionMode, setSessionMode] = useState('student');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [sessionTurns, setSessionTurns] = useState([]);

  const handleSessionComplete = (finalTranscript, turns) => {
    setCurrentTranscript(finalTranscript);
    setSessionTurns(turns);
    // Automatically navigate to Diagnostic Analytics upon completion
    setActiveTab('analytics');
  };

  const handleModeChange = (mode) => {
    setSessionMode(mode);
    if (mode === 'teacher') {
      setActiveTab('teacher');
    } else {
      setActiveTab('boardroom');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sessionMode={sessionMode}
        setSessionMode={handleModeChange}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'boardroom' && (
          <BoardroomSimulator onSessionComplete={handleSessionComplete} />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard
            activeTranscript={currentTranscript}
            sessionTurns={sessionTurns}
          />
        )}

        {activeTab === 'lexicon' && (
          <LexiconDatabase />
        )}

        {activeTab === 'sprints' && (
          <SprintDrills />
        )}

        {activeTab === 'analytics' && (
          <DiagnosticAnalytics activeTranscript={currentTranscript} />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">FinSpeak ADB</span>
            <span>— Executive Speaking & Coaching for Korean MDB Professionals</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ADB Safeguards Aligned
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Korean L1 Context Anchors
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
