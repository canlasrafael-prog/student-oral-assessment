'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TestState, useAssessment } from '@/context/AssessmentContext';

interface LiveTranscriptProps {
  testState: TestState;
}

export default function LiveTranscript({ testState }: LiveTranscriptProps) {
  const { liveTranscript, setLiveTranscript, studentInfo } = useAssessment();
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

    recognition.onend = () => {
      // Auto-restart recognition if answering is still active
      if (recognitionRef.current && (window as any).__isAnsweringActive) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
    };

    recognitionRef.current = recognition;
  }, [setLiveTranscript]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__isAnsweringActive = isAnswering;
    }
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

  const handleDownloadTranscript = () => {
    const studentName = studentInfo?.name || 'Student';
    const studentGrade = studentInfo?.grade || 'OralAssessment';
    const textContent = `STUDENT ORAL ASSESSMENT TRANSCRIPT
=====================================
Student Name: ${studentName}
Grade Level: ${studentGrade}
Recorded Date: ${new Date().toLocaleString()}
-------------------------------------
TRANSCRIPT:
${liveTranscript || '(No speech transcript recorded yet)'}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Transcript_${studentName.replace(/\s+/g, '_')}_${studentGrade}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isSupported) {
    return (
      <div className="w-full p-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs">
        ℹ️ Auto Voice Transcription is supported in Chrome, Edge, and Safari.
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-200 transition-colors duration-300 space-y-3">
      <div className="flex items-center justify-between">
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

      {/* Direct Download Transcript (.txt) Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleDownloadTranscript}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
          title="Download the current speech transcript as a .txt file"
        >
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Transcript (.txt)</span>
        </button>
      </div>
    </div>
  );
}
