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
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-300 shadow-md cursor-pointer ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-700/80'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
      }`}
      aria-label="Toggle Dark and Light Mode"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {isDark ? (
        <>
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="font-semibold">Light</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <span className="font-semibold">Dark</span>
        </>
      )}
    </button>
  );
}
