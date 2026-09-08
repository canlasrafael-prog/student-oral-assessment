'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AudioLevelMeterProps {
  stream: MediaStream | null;
}

export default function AudioLevelMeter({ stream }: AudioLevelMeterProps) {
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!stream || stream.getAudioTracks().length === 0) {
      setAudioLevel(0);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      mediaStreamSource.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setAudioLevel(normalized);

        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.warn('Could not initialize audio visualizer:', err);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stream]);

  const bars = [15, 30, 50, 75, 95];

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-300 shadow-lg shadow-black/40 backdrop-blur-md transition-colors duration-300"
      title={`Live Mic Volume: ${audioLevel}%`}
    >
      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-wider">Mic Level</span>
      <div className="flex items-end gap-0.5 h-3 w-10">
        {bars.map((threshold, idx) => {
          const isActive = audioLevel >= threshold;
          return (
            <div
              key={idx}
              className={`w-1.5 rounded-sm transition-all duration-75 ${
                isActive
                  ? idx > 3
                    ? 'bg-rose-500 h-3'
                    : idx > 2
                    ? 'bg-amber-400 h-2.5'
                    : 'bg-emerald-400 h-2'
                  : 'bg-slate-800 h-1'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
