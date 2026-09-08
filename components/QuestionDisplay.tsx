'use client';

import React from 'react';
import { SelectedQuestion } from '@/lib/questionSelector';
import { TestState } from '@/context/AssessmentContext';

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
  const isQuestionVisible =
    testState === 'QUESTION_DISPLAYED' ||
    testState === 'ANSWERING_IN_PROGRESS' ||
    testState === 'LAST_QUESTION_DONE';

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[260px] relative overflow-hidden">
      {/* Question progress indicators */}
      <div className="flex items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-indigo-500 shadow-md shadow-indigo-500/50'
                  : idx < currentIndex
                  ? 'w-4 bg-emerald-500/80'
                  : 'w-4 bg-slate-800'
              }`}
              title={`Question ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Main Question Content */}
      <div className="my-auto py-2">
        {isQuestionVisible && question ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              {question.categoryLabel}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              &quot;{question.text}&quot;
            </h2>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-slate-400 text-lg font-medium">
              {testState === 'INITIAL'
                ? 'Click "Start Recording" to enable camera & proceed.'
                : 'Click "Start Question" to display your first prompt.'}
            </p>
          </div>
        )}
      </div>

      {/* Footer controls (Read Aloud TTS) */}
      {isQuestionVisible && question && (
        <div className="flex justify-end pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onReadAloud}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span>Read Prompt Aloud</span>
          </button>
        </div>
      )}
    </div>
  );
}
