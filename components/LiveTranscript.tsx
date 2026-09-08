'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface LiveTranscriptProps {
  testState: TestState;
}

export default function LiveTranscript({ testState }: LiveTranscriptProps) {
  const { liveTranscript, setLiveTranscript, theme } = useAssessment();
  const isDark = theme === 'dark';
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  const isAnswering = testState === 'ANSWERING_IN_PROGRESS';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let currentText = '';
      for (let i = 0; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript + ' ';
      }
      setLiveTranscript(currentText.trim());
    };

    recognition.onerror = (err: any) => {
      console.warn('Speech recognition error:', err);
    };

    recognitionRef.current = recognition;
  }, [setLiveTranscript]);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isAnswering) {
      try {
        recognition.start();
      } catch (err) {
        // Recognition might already be active
      }
    } else {
      try {
        recognition.stop();
      } catch (err) {}
    }
  }, [isAnswering]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      className={`w-full p-4 rounded-2xl border transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 text-slate-200'
          : 'bg-white/90 border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {isAnswering && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isAnswering ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Speech Transcript
          </span>
        </div>
        {isAnswering && (
          <span className="text-[10px] font-mono font-semibold text-emerald-500 animate-pulse">
            Listening...
          </span>
        )}
      </div>

      <div
        className={`min-h-[48px] max-h-24 overflow-y-auto p-2.5 rounded-xl text-xs font-sans leading-relaxed ${
          isDark ? 'bg-slate-950/60 border border-slate-800/80' : 'bg-slate-50 border border-slate-200'
        }`}
      >
        {liveTranscript ? (
          <p className="text-slate-300 font-medium italic">&quot;{liveTranscript}&quot;</p>
        ) : (
          <p className="text-slate-500 italic">
            {isAnswering
              ? 'Start speaking to see your live transcript appear here...'
              : 'Live transcript will appear here when you answer prompts.'}
          </p>
        )}
      </div>
    </div>
  );
}
