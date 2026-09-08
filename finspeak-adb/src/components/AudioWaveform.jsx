import React, { useEffect, useRef } from 'react';

export function AudioWaveform({ isActive, frequencyData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const barWidth = 4;
      const gap = 3;
      const totalBars = Math.floor(width / (barWidth + gap));

      for (let i = 0; i < totalBars; i++) {
        let barHeight;
        if (isActive) {
          if (frequencyData && frequencyData.length > i) {
            barHeight = (frequencyData[i] / 255) * height * 0.85;
          } else {
            // Simulated sine frequency movement when active
            const time = Date.now() * 0.005;
            barHeight = Math.abs(Math.sin(time + i * 0.2)) * (height * 0.75) + 6;
          }
        } else {
          barHeight = 4;
        }

        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        // Gradient color: slate blue to glowing cyan
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isActive) {
          gradient.addColorStop(0, '#0EA5E9'); // Cyan-500
          gradient.addColorStop(1, '#3B82F6'); // Blue-500
        } else {
          gradient.addColorStop(0, '#334155'); // Slate-700
          gradient.addColorStop(1, '#1E293B'); // Slate-800
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.max(3, barHeight), 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, frequencyData]);

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-inner flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className={`relative flex h-3 w-3 ${isActive ? 'flex' : 'hidden'}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {isActive ? 'Audio Telemetry Active' : 'Mic Ready'}
        </span>
      </div>
      <canvas ref={canvasRef} width={280} height={36} className="rounded" />
    </div>
  );
}
