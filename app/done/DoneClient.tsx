'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import { uploadRecording, syncWithExternalApp, SyncResponse } from '@/lib/api';
import ThemeToggle from '@/components/ThemeToggle';

export default function DoneClient() {
  const router = useRouter();
  const { studentInfo, recordedBlob, recordedBlobUrl, resetSession, theme } = useAssessment();
  const isDark = theme === 'dark';

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResponse | null>(null);

  useEffect(() => {
    if (!studentInfo) {
      router.replace('/register');
    }
  }, [studentInfo, router]);

  if (!studentInfo) {
    return null;
  }

  const handleSyncData = async () => {
    if (!recordedBlob) return;
    setIsSyncing(true);
    setSyncResult(null);

    try {
      // 1. Upload to storage stub
      const uploadRes = await uploadRecording(recordedBlob, studentInfo);

      // 2. Sync metadata with external Vercel app endpoint
      const result = await syncWithExternalApp(studentInfo, {
        storageUrl: uploadRes.storageUrl,
        blobSizeBytes: uploadRes.sizeBytes,
      });

      setSyncResult(result);
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: err.message || 'An unexpected error occurred during sync.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleStartNew = () => {
    resetSession();
    router.push('/register');
  };

  const fileName = `OralAssessment_${studentInfo.name.replace(/\s+/g, '_')}_${studentInfo.grade}.webm`;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Ambient background lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl ${
            isDark ? 'bg-emerald-600/10' : 'bg-emerald-200/40'
          }`}
        />
      </div>

      {/* Top Header Controls */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div
        className={`relative w-full max-w-3xl backdrop-blur-xl border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 transition-colors duration-300 ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 shadow-slate-950/50'
            : 'bg-white/95 border-slate-200 shadow-slate-300/50'
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Assessment Completed
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Thank You, {studentInfo.name}!
          </h1>
          <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Your oral response video has been recorded successfully and is ready for review or export.
          </p>
        </div>

        {/* Video Player */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Recorded Video Preview
            </h3>
            {recordedBlob && (
              <span className={`text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Size: {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
          </div>

          <div
            className={`relative aspect-video rounded-2xl overflow-hidden border shadow-xl ${
              isDark ? 'bg-black border-slate-800' : 'bg-slate-900 border-slate-300'
            }`}
          >
            {recordedBlobUrl ? (
              <video
                src={recordedBlobUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                No video recording found for this session.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Local Download + Sync */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Local Download Button */}
          {recordedBlobUrl ? (
            <a
              id="download-recording-link"
              href={recordedBlobUrl}
              download={fileName}
              className={`py-4 px-6 rounded-2xl font-bold border active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 shadow-lg group cursor-pointer text-sm ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
              }`}
            >
              <svg className="w-5 h-5 text-indigo-500 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Video (.webm)</span>
            </a>
          ) : (
            <button disabled className="py-4 px-6 rounded-2xl font-bold bg-slate-900 text-slate-600 opacity-50 cursor-not-allowed text-sm">
              Download Unavailable
            </button>
          )}

          {/* Sync Button */}
          <button
            id="sync-external-app-btn"
            type="button"
            disabled={isSyncing || !recordedBlob}
            onClick={handleSyncData}
            className="py-4 px-6 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
          >
            {isSyncing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Syncing with Vercel App...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Sync with Vercel App</span>
              </>
            )}
          </button>
        </div>

        {/* Sync Result Feedback */}
        {syncResult && (
          <div
            className={`p-4 rounded-2xl text-sm border flex items-start gap-3 ${
              syncResult.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
            }`}
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {syncResult.success ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <div>
              <p className="font-semibold">{syncResult.message}</p>
              {syncResult.syncedAt && (
                <p className="text-xs opacity-75 mt-1">Timestamp: {syncResult.syncedAt}</p>
              )}
            </div>
          </div>
        )}

        {/* Reset / Start New Assessment */}
        <div className={`pt-4 border-t flex justify-center ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={handleStartNew}
            className={`text-xs font-semibold underline underline-offset-4 transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Start New Assessment Session
          </button>
        </div>
      </div>
    </div>
  );
}
