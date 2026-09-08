'use client';

import React, { useEffect, useRef } from 'react';
import { useAssessment } from '@/context/AssessmentContext';

interface CameraProps {
  stream: MediaStream | null;
  isRecording: boolean;
  isAnswering: boolean;
  recordingTimeSeconds?: number;
}

export default function Camera({ stream, isRecording, isAnswering, recordingTimeSeconds = 0 }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isCenteredConfirmed, setCenteredConfirmed, theme } = useAssessment();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show human outline overlay when camera is live, centering is not yet confirmed, and answering hasn't started
  const showHumanOverlay = stream && !isCenteredConfirmed && !isAnswering;

  return (
    <div
      className={`relative w-full aspect-video rounded-3xl border overflow-hidden shadow-2xl flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-300'
      }`}
    >
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100" // Mirrored webcam display
          />

          {/* Human Outline Silhouette Overlay for Student Centering */}
          {showHumanOverlay && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-all duration-500 animate-fade-in z-15">
              {/* Human Head & Shoulders SVG Guide (Enlarged) */}
              <div className="relative w-[75%] h-[82%] max-w-[340px] max-h-[380px] opacity-85 animate-pulse">
                <svg
                  className="w-full h-full text-indigo-400 drop-shadow-[0_0_18px_rgba(99,102,241,0.7)]"
                  viewBox="0 0 240 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head Outline */}
                  <ellipse
                    cx="120"
                    cy="95"
                    rx="62"
                    ry="74"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="10 7"
                  />
                  {/* Shoulders & Upper Body Outline */}
                  <path
                    d="M20 290 C20 215, 65 185, 120 185 C175 185, 220 215, 220 290"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="10 7"
                  />
                  {/* Eye Level Guide Line */}
                  <line
                    x1="68"
                    y1="90"
                    x2="172"
                    y2="90"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-70"
                  />
                  {/* Vertical Center Line */}
                  <line
                    x1="120"
                    y1="30"
                    x2="120"
                    y2="280"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-40"
                  />
                  {/* Center Target Reticle */}
                  <circle cx="120" cy="95" r="5" fill="currentColor" className="animate-ping" />
                </svg>
              </div>
            </div>
          )}

          {/* Centering Prompt Banner with "Yes, I'm Centered" Button */}
          {showHumanOverlay && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 shadow-2xl shadow-indigo-950/60 z-20 animate-bounce-subtle">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Webcam Alignment</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Are you centered inside the outline frame?</p>
                </div>
              </div>

              <button
                id="btn-confirm-centered"
                type="button"
                onClick={() => setCenteredConfirmed(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-emerald-500/30 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>Yes, I&apos;m Centered!</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Top Overlay Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            {/* Live Recording Badge */}
            {isRecording && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wider shadow-lg animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>REC {formatTime(recordingTimeSeconds)}</span>
              </div>
            )}

            {/* Answering Mode Active Badge */}
            {isAnswering ? (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/95 backdrop-blur-md text-slate-950 text-xs sm:text-sm font-extrabold tracking-wider shadow-lg shadow-emerald-500/30 border border-emerald-300/40">
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span>🎤</span>
                  <span>YOU CAN TALK NOW — RECORDING ANSWER...</span>
                </span>
              </div>
            ) : (
              isRecording && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-medium">
                  Camera Active
                </div>
              )
            )}
          </div>

          {/* Visual border glow when in Answering mode */}
          {isAnswering && (
            <div className="absolute inset-0 border-4 border-emerald-400 rounded-3xl pointer-events-none animate-pulse shadow-[inset_0_0_30px_rgba(52,211,153,0.35)]" />
          )}
        </>
      ) : (
        /* Standby state before Start Recording */
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-slate-300 font-semibold text-lg">Webcam Ready</p>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">
              Click &quot;Start Recording&quot; below to enable your camera and begin your assessment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
