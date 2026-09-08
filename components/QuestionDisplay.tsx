'use client';

import React from 'react';
import { SelectedQuestion } from '@/lib/questionSelector';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface QuestionDisplayProps {
  question: SelectedQuestion | null;
  currentIndex: number;
  totalQuestions: number;
  testState: TestState;
  onReadAloud?: () => void;
}

export default function QuestionDisplay({
  question,
  currentIndex,
  totalQuestions,
  testState,
  onReadAloud,
}: QuestionDisplayProps) {
  const { theme } = useAssessment();
  const isDark = theme === 'dark';

  const isQuestionVisible =
    testState === 'QUESTION_DISPLAYED' ||
    testState === 'ANSWERING_IN_PROGRESS' ||
    testState === 'LAST_QUESTION_DONE';

  return (
    <div
      className={`w-full backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[260px] relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-slate-950/50'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/60'
      }`}
    >
      {/* Question progress indicators */}
      <div
        className={`flex items-center justify-between gap-4 mb-4 pb-4 border-b transition-colors duration-300 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-indigo-600 shadow-md shadow-indigo-500/50'
                  : idx < currentIndex
                  ? 'w-4 bg-emerald-500/80'
                  : isDark
                  ? 'w-4 bg-slate-800'
                  : 'w-4 bg-slate-200'
              }`}
              title={`Question ${idx + 1}`}
            />
          ))}
        </div>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Main Question Content */}
      <div className="my-auto py-2">
        {isQuestionVisible && question ? (
          <div className="space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isDark
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700'
              }`}
            >
              {question.categoryLabel}
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold leading-relaxed ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              &quot;{question.text}&quot;
            </h2>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {testState === 'INITIAL'
                ? 'Click "Start Recording" to enable camera & proceed.'
                : 'Click "Start Question" to display your first prompt.'}
            </p>
          </div>
        )}
      </div>

      {/* Footer controls (Read Aloud TTS) */}
      {isQuestionVisible && question && (
        <div
          className={`flex justify-end pt-4 border-t transition-colors duration-300 ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={onReadAloud}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span>Read Prompt Aloud</span>
          </button>
        </div>
      )}
    </div>
  );
}
