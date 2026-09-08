'use client';

import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAssessment();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-slate-700/80 shadow-slate-950/60'
          : 'bg-white/95 hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-slate-300/60'
      }`}
      aria-label="Toggle Dark and Light Mode"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {isDark ? (
        <>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
