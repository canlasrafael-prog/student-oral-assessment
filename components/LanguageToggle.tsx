'use client';

import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';

export default function LanguageToggle() {
  const { showKoreanSubtitles, toggleKoreanSubtitles } = useAssessment();

  return (
    <button
      type="button"
      onClick={toggleKoreanSubtitles}
      className={`fixed top-4 right-4 z-50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 ${
        showKoreanSubtitles
          ? 'bg-blue-600/90 hover:bg-blue-600 text-white border border-blue-400/50 shadow-blue-900/60 ring-2 ring-blue-500/50'
          : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 shadow-slate-950/60'
      }`}
      aria-label="Toggle Korean Subtitles"
      title={showKoreanSubtitles ? 'Disable Korean Subtitles (자막 끄기)' : 'Enable Korean Subtitles (한국어 자막 켜기)'}
    >
      <span className="text-sm select-none">🇰🇷</span>
      <span>{showKoreanSubtitles ? 'KR Subtitles ON' : 'KR Subtitles'}</span>
      <span
        className={`w-2 h-2 rounded-full transition-colors ${
          showKoreanSubtitles ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
        }`}
      />
    </button>
  );
}
