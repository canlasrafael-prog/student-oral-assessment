'use client';

import React, { useState, useEffect } from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface MascotCompanionProps {
  testState: TestState;
}

export default function MascotCompanion({ testState }: MascotCompanionProps) {
  const { showKoreanSubtitles } = useAssessment();
  const [bubbleText, setBubbleText] = useState<string>('Hi there! I am Sparky! I will guide you through your assessment!');
  const [koreanBubbleText, setKoreanBubbleText] = useState<string>('안녕하세요! 저는 스파키예요! 평가 과정을 도와줄게요!');

  useEffect(() => {
    switch (testState) {
      case 'INITIAL':
        setBubbleText('Ready to shine? Click "Next" to turn on your camera!');
        setKoreanBubbleText('시작할 준비가 되셨나요? "다음"을 눌러 카메라는 켜세요!');
        break;
      case 'QUESTION_DISPLAYED':
        setBubbleText('Listen or read the prompt carefully. Take a deep breath!');
        setKoreanBubbleText('질문을 주의 깊게 읽고 들어보세요. 천천히 심호흡하세요!');
        break;
      case 'ANSWERING_IN_PROGRESS':
        setBubbleText('🎤 You are live! Speak clearly and share your awesome thoughts!');
        setKoreanBubbleText('🎤 녹음 중입니다! 목소리를 또박또박하여 멋진 생각을 말해 보세요!');
        break;
      case 'LAST_QUESTION_DONE':
        setBubbleText('Hooray! You answered all 5 questions! Click Next to submit!');
        setKoreanBubbleText('만세! 5개 질문에 모두 답변했습니다! 다음을 눌러 제출하세요!');
        break;
      default:
        setBubbleText('You are doing great!');
        setKoreanBubbleText('정말 잘하고 계십니다!');
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
      <div className="relative px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-md transition-colors duration-300 bg-slate-800/90 text-amber-200 border border-amber-500/30">
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-slate-800 border-l border-b border-amber-500/30" />
        <p className="leading-snug">{bubbleText}</p>
        {showKoreanSubtitles && (
          <p className="mt-1 text-[11px] font-medium text-blue-300 border-t border-amber-500/20 pt-1">
            🇰🇷 {koreanBubbleText}
          </p>
        )}
      </div>
    </div>
  );
}
