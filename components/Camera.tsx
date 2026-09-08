'use client';

import React, { useEffect, useRef } from 'react';

interface CameraProps {
  stream: MediaStream | null;
  isRecording: boolean;
  isAnswering: boolean;
  recordingTimeSeconds?: number;
}

export default function Camera({ stream, isRecording, isAnswering, recordingTimeSeconds = 0 }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div className="relative w-full aspect-video bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100" // Mirrored webcam display
          />

          {/* Top Overlay Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
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
