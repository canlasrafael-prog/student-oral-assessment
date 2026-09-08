'use client';

import React from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface ControlButtonsProps {
  testState: TestState;
  onNext: () => void;
  onRepeatQuestion: () => void;
  onEmergencyStop: () => void;
}

export default function ControlButtons({
  testState,
  onNext,
  onRepeatQuestion,
  onEmergencyStop,
}: ControlButtonsProps) {
  const { theme } = useAssessment();
  const isDark = theme === 'dark';

  // Caption text above the single "Next" button based on internal state
  const getCaptionText = (): string => {
    switch (testState) {
      case 'INITIAL':
        return 'Tap Next to begin';
      case 'QUESTION_DISPLAYED':
        return 'Read or listen to the question, then tap Next when ready to answer';
      case 'ANSWERING_IN_PROGRESS':
        return "🎤 You can talk now! Tap Next when you're done answering";
      case 'LAST_QUESTION_DONE':
        return 'Tap Next to finish and submit';
      default:
        return 'Tap Next to continue';
    }
  };

  const isRepeatVisible =
    testState === 'QUESTION_DISPLAYED' || testState === 'ANSWERING_IN_PROGRESS';

  const isEmergencyStopVisible = testState !== 'INITIAL';

  return (
    <div
      className={`w-full backdrop-blur-xl border rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center space-y-5 transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 shadow-slate-950/50'
          : 'bg-white/95 border-slate-200 shadow-slate-200/60'
      }`}
    >
      {/* Dynamic Status Caption for proctor / older student context */}
      <div className="text-center space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
          Current Step
        </span>
        <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {getCaptionText()}
        </p>
      </div>

      {/* SINGLE LARGE PRIMARY BUTTON: Always hardcoded to "Next" */}
      <button
        id="btn-single-next"
        type="button"
        onClick={onNext}
        className="w-full max-w-md py-5 sm:py-6 px-8 rounded-3xl font-extrabold text-2xl sm:text-3xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:via-purple-500 hover:to-violet-500 active:scale-[0.98] shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group select-none"
      >
        <span>Next</span>
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 group-hover:translate-x-1.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>

      {/* Secondary Controls (Small, Muted Styling) */}
      <div
        className={`w-full max-w-md flex items-center justify-between pt-2 border-t text-xs transition-colors duration-300 ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}
      >
        {/* Small Muted Repeat Button */}
        {isRepeatVisible ? (
          <button
            id="btn-muted-repeat"
            type="button"
            onClick={onRepeatQuestion}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <svg className="w-3.5 h-3.5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>🔁 Repeat Prompt</span>
          </button>
        ) : (
          <div />
        )}

        {/* Small Muted Emergency Stop Button for Proctor */}
        {isEmergencyStopVisible && (
          <button
            id="btn-emergency-stop"
            type="button"
            onClick={onEmergencyStop}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ml-auto ${
              isDark
                ? 'bg-slate-800/50 hover:bg-rose-950/40 text-slate-500 hover:text-rose-300 border-slate-800'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'
            }`}
            title="Proctor Override: Stop test early and save recording"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            <span>Emergency Stop</span>
          </button>
        )}
      </div>
    </div>
  );
}
