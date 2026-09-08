'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface LiveTranscriptProps {
  testState: TestState;
}

export default function LiveTranscript({ testState }: LiveTranscriptProps) {
  const { liveTranscript, setLiveTranscript } = useAssessment();
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
    return (
      <div className="w-full p-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs">
        ℹ️ Auto Voice Transcription is supported in Chrome, Edge, and Safari.
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-200 transition-colors duration-300">
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
            Auto Speech Transcription
          </span>
        </div>
        {isAnswering && (
          <span className="text-[10px] font-mono font-semibold text-emerald-400 animate-pulse">
            Transcribing Live Speech...
          </span>
        )}
      </div>

      <div className="min-h-[48px] max-h-28 overflow-y-auto p-2.5 rounded-xl text-xs font-sans leading-relaxed bg-slate-950/60 border border-slate-800/80">
        {liveTranscript ? (
          <p className="text-slate-200 font-medium italic">&quot;{liveTranscript}&quot;</p>
        ) : (
          <p className="text-slate-500 italic">
            {isAnswering
              ? 'Start speaking into your mic to see your live voice transcript accumulate here...'
              : 'Auto voice transcript will appear here as you answer prompts.'}
          </p>
        )}
      </div>
    </div>
  );
}
