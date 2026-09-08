'use client';

import React, { useEffect, useState } from 'react';
import { SelectedQuestion } from '@/lib/questionSelector';
import { TestState, useAssessment } from '@/context/AssessmentContext';
import { getCategoryTranslation, getQuestionTranslation, getUITranslation } from '@/lib/koreanTranslations';

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
  const { theme, timerSecondsPerQuestion, showKoreanSubtitles } = useAssessment();
  const isDark = theme === 'dark';

  const [timeLeft, setTimeLeft] = useState<number>(timerSecondsPerQuestion);

  const isAnswering = testState === 'ANSWERING_IN_PROGRESS';
  const isQuestionVisible =
    testState === 'QUESTION_DISPLAYED' ||
    testState === 'ANSWERING_IN_PROGRESS' ||
    testState === 'LAST_QUESTION_DONE';

  // Reset timer whenever question changes or answering starts
  useEffect(() => {
    setTimeLeft(timerSecondsPerQuestion);
  }, [currentIndex, testState, timerSecondsPerQuestion]);

  // Countdown interval when answering is active and timer is enabled (> 0)
  useEffect(() => {
    if (!isAnswering || timerSecondsPerQuestion <= 0 || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnswering, timerSecondsPerQuestion, timeLeft]);

  return (
    <div
      className={`w-full backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[260px] relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-slate-950/50'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/60'
      }`}
    >
      {/* Question progress indicators & Timer Badge */}
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

        <div className="flex items-center gap-3">
          {/* Optional Modifiable Countdown Timer Badge */}
          {timerSecondsPerQuestion > 0 && isAnswering && (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors ${
                timeLeft <= 10
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 animate-pulse'
                  : isDark
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{timeLeft}s remaining</span>
            </div>
          )}

          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Question {currentIndex + 1} of {totalQuestions}
            {showKoreanSubtitles && ` (${currentIndex + 1} / ${totalQuestions} 질문)`}
          </span>
        </div>
      </div>

      {/* Main Question Content */}
      <div className="my-auto py-2">
        {isQuestionVisible && question ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                }`}
              >
                {question.categoryLabel}
              </div>
              {showKoreanSubtitles && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span>🇰🇷 {getCategoryTranslation(question.categoryLabel)}</span>
                </div>
              )}
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold leading-relaxed ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              &quot;{question.text}&quot;
            </h2>

            {/* Korean Subtitle Box */}
            {showKoreanSubtitles && (
              <div
                className={`p-4 rounded-2xl border text-sm sm:text-base font-medium flex items-start gap-2.5 transition-all ${
                  isDark
                    ? 'bg-blue-950/30 border-blue-800/40 text-blue-200'
                    : 'bg-blue-50/80 border-blue-200 text-blue-900'
                }`}
              >
                <span className="text-base select-none shrink-0 mt-0.5">🇰🇷</span>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold tracking-wide uppercase opacity-75">한국어 자막 번역</div>
                  <p className="leading-relaxed">&quot;{getQuestionTranslation(question.text)}&quot;</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-1">
            <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {testState === 'INITIAL'
                ? 'Click "Start Recording" to enable camera & proceed.'
                : 'Click "Start Question" to display your first prompt.'}
            </p>
            {showKoreanSubtitles && (
              <p className="text-sm text-blue-400 font-normal">
                {testState === 'INITIAL'
                  ? '🇰🇷 "녹음 시작하기"를 클릭하여 카메라는 켜고 진행하세요.'
                  : '🇰🇷 "질문 시작하기"를 클릭하여 첫 번째 질문을 표시하세요.'}
              </p>
            )}
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
