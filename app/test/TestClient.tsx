'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import { getCameraAndMicStream, getSupportedMimeType, stopStreamTracks } from '@/lib/recording';
import Camera from '@/components/Camera';
import QuestionDisplay from '@/components/QuestionDisplay';
import ControlButtons from '@/components/ControlButtons';
import MascotCompanion from '@/components/MascotCompanion';
import LiveTranscript from '@/components/LiveTranscript';

export default function TestClient() {
  const router = useRouter();
  const {
    studentInfo,
    questions,
    currentQuestionIndex,
    currentQuestion,
    testState,
    setTestState,
    advanceToNextQuestion,
    setRecordedBlob,
  } = useAssessment();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Redirect to registration if student has not registered
  useEffect(() => {
    if (!studentInfo) {
      router.replace('/register');
    }
  }, [studentInfo, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStreamTracks(stream);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [stream]);

  if (!studentInfo || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium bg-slate-950 text-slate-400">
        Loading assessment session...
      </div>
    );
  }

  // Text-To-Speech Helper
  const handleReadQuestionAloud = (customText?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    const textToRead = customText || currentQuestion?.text;
    if (!textToRead) return;

    window.speechSynthesis.cancel(); // Cancel active speech
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower speed for young students
    window.speechSynthesis.speak(utterance);
  };

  // Helper to start webcam stream and recording
  const startCameraAndRecorder = async (): Promise<boolean> => {
    setCameraError('');
    try {
      const userStream = await getCameraAndMicStream();
      setStream(userStream);

      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(userStream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.start(1000); // 1s slice interval
      mediaRecorderRef.current = recorder;

      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      return true;
    } catch (err: any) {
      console.error('Camera/Mic permission error:', err);
      setCameraError(
        err.message || 'Could not access camera/microphone. Please ensure permissions are granted.'
      );
      return false;
    }
  };

  // Helper to finalize recording and navigate to summary screen
  const finalizeRecordingAndNavigate = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = () => {
        const mimeType = recorder.mimeType || 'video/webm';
        const finalBlob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedBlob(finalBlob);
        stopStreamTracks(stream);
        router.push('/done');
      };
      recorder.stop();
    } else {
      const finalBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(finalBlob);
      stopStreamTracks(stream);
      router.push('/done');
    }
  };

  // SINGLE "NEXT" BUTTON CLICK HANDLER (Branches on internal test state)
  const handleNext = async () => {
    switch (testState) {
      case 'INITIAL': {
        // Step 1: Start recording and immediately display Question 1
        const success = await startCameraAndRecorder();
        if (success) {
          setTestState('QUESTION_DISPLAYED');
          handleReadQuestionAloud();
        }
        break;
      }
      case 'QUESTION_DISPLAYED': {
        // Step 2: Switch to "Answering" mode
        setTestState('ANSWERING_IN_PROGRESS');
        break;
      }
      case 'ANSWERING_IN_PROGRESS': {
        // Step 3: Finish answering current question
        if (currentQuestionIndex < questions.length - 1) {
          // Advance to next question index and show Question N+1 immediately
          advanceToNextQuestion();
          setTestState('QUESTION_DISPLAYED');
          // Speak next question aloud
          const nextQ = questions[currentQuestionIndex + 1];
          if (nextQ) {
            handleReadQuestionAloud(nextQ.text);
          }
        } else {
          // All 5 questions done -> LAST_QUESTION_DONE
          setTestState('LAST_QUESTION_DONE');
        }
        break;
      }
      case 'LAST_QUESTION_DONE': {
        // Step 4: Finish session and submit
        finalizeRecordingAndNavigate();
        break;
      }
      default:
        break;
    }
  };

  // Secondary Muted Actions
  const handleRepeatQuestion = () => {
    handleReadQuestionAloud();
  };

  const handleEmergencyStop = () => {
    finalizeRecordingAndNavigate();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-indigo-900/10" />
      </div>

      <div className="max-w-7xl w-full mx-auto space-y-6 relative z-10">
        {/* Header Bar with Mascot */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl border border-slate-800 bg-slate-900/80 shadow-slate-950/40 rounded-3xl p-5 shadow-lg transition-colors duration-300">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Student Oral Assessment
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                {studentInfo.grade.toUpperCase()}
              </span>
            </div>
            <p className="text-xs mt-0.5 text-slate-400">
              Student: <strong className="text-slate-200">{studentInfo.name}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MascotCompanion testState={testState} />
            <div className="text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Session Progress
              </span>
              <span className="text-xs font-mono font-bold text-indigo-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
          </div>
        </header>

        {/* Camera Error Banner */}
        {cameraError && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{cameraError}</span>
            </div>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 cursor-pointer"
            >
              Retry Camera
            </button>
          </div>
        )}

        {/* Main 2-Column Grid: Camera + Question Display & Live Transcript */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Camera Feed */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Camera
              stream={stream}
              isRecording={testState !== 'INITIAL'}
              isAnswering={testState === 'ANSWERING_IN_PROGRESS'}
              recordingTimeSeconds={recordingSeconds}
            />
          </div>

          {/* Right Column: Question Card & Live Transcript */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <QuestionDisplay
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              testState={testState}
              onReadAloud={handleRepeatQuestion}
            />

            <LiveTranscript testState={testState} />
          </div>
        </div>

        {/* Kid-Friendly Control Panel: Single "Next" Button */}
        <ControlButtons
          testState={testState}
          onNext={handleNext}
          onRepeatQuestion={handleRepeatQuestion}
          onEmergencyStop={handleEmergencyStop}
        />
      </div>
    </div>
  );
}
