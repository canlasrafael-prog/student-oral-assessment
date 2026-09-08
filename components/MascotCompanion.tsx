'use client';

import React, { useState, useEffect } from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface MascotCompanionProps {
  testState: TestState;
}

export default function MascotCompanion({ testState }: MascotCompanionProps) {
  const { theme } = useAssessment();
  const isDark = theme === 'dark';
  const [bubbleText, setBubbleText] = useState<string>('Hi there! I am Sparky! I will guide you through your assessment!');

  useEffect(() => {
    switch (testState) {
      case 'INITIAL':
        setBubbleText('Ready to shine? Click "Next" to turn on your camera!');
        break;
      case 'QUESTION_DISPLAYED':
        setBubbleText('Listen or read the prompt carefully. Take a deep breath!');
        break;
      case 'ANSWERING_IN_PROGRESS':
        setBubbleText('🎤 You are live! Speak clearly and share your awesome thoughts!');
        break;
      case 'LAST_QUESTION_DONE':
        setBubbleText('Hooray! You answered all 5 questions! Click Next to submit!');
        break;
      default:
        setBubbleText('You are doing great!');
        break;
    }
  }, [testState]);

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-300">
      {/* Mascot Animated Character */}
      <div className="relative shrink-0 w-12 h-12 flex items-center justify-center animate-bounce-subtle">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md animate-pulse" />
        <svg className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Mascot Speech Bubble */}
      <div
        className={`relative px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-md transition-colors duration-300 ${
          isDark
            ? 'bg-slate-800/90 text-amber-200 border border-amber-500/30'
            : 'bg-amber-50 text-slate-800 border border-amber-200'
        }`}
      >
        <div
          className={`absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 ${
            isDark ? 'bg-slate-800 border-l border-b border-amber-500/30' : 'bg-amber-50 border-l border-b border-amber-200'
          }`}
        />
        <p className="leading-snug">{bubbleText}</p>
      </div>
    </div>
  );
}
