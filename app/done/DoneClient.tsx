'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import { uploadRecording, syncWithExternalApp, SyncResponse } from '@/lib/api';

export default function DoneClient() {
  const router = useRouter();
  const { studentInfo, recordedBlob, recordedBlobUrl, resetSession, liveTranscript, saveSubmission } = useAssessment();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResponse | null>(null);

  useEffect(() => {
    if (!studentInfo) {
      router.replace('/register');
      return;
    }

    // Save submission to context & localStorage for Teacher Dashboard
    saveSubmission({
      id: `${studentInfo.name.replace(/\s+/g, '_')}_${Date.now()}`,
      studentName: studentInfo.name,
      grade: studentInfo.grade,
      submittedAt: new Date().toISOString(),
      transcript: liveTranscript,
      questionCount: 5,
      durationSeconds: 120,
    });
  }, [studentInfo, router, liveTranscript, saveSubmission]);

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

  const handleDownloadTranscript = () => {
    const textContent = `STUDENT ORAL ASSESSMENT TRANSCRIPT
=====================================
Student Name: ${studentInfo.name}
Grade Level: ${studentInfo.grade}
Recorded Date: ${new Date().toLocaleString()}
-------------------------------------
TRANSCRIPT:
${liveTranscript || '(No speech transcript recorded for this session)'}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Transcript_${studentInfo.name.replace(/\s+/g, '_')}_${studentInfo.grade}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleStartNew = () => {
    resetSession();
    router.push('/register');
  };

  const videoFileName = `OralAssessment_${studentInfo.name.replace(/\s+/g, '_')}_${studentInfo.grade}.webm`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 transition-colors duration-300">
      {/* Ambient background lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl bg-emerald-600/10" />
      </div>

      <div className="relative w-full max-w-3xl backdrop-blur-xl border border-slate-800 bg-slate-900/90 shadow-slate-950/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 transition-colors duration-300">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Assessment Completed
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Thank You, {studentInfo.name}!
          </h1>
          <p className="text-sm max-w-md mx-auto text-slate-400">
            Your oral response video has been recorded successfully and is ready for review or export.
          </p>
        </div>

        {/* Video Player */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recorded Video Preview
            </h3>
            {recordedBlob && (
              <span className="text-xs font-mono text-slate-500">
                Size: {(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-xl">
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

        {/* Action Buttons: Separate Video & Transcript Downloads + Sync */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Download Video (.webm) */}
          {recordedBlobUrl ? (
            <a
              id="download-recording-link"
              href={recordedBlobUrl}
              download={videoFileName}
              className="py-3.5 px-4 rounded-2xl font-bold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group cursor-pointer text-xs"
            >
              <svg className="w-4 h-4 text-indigo-400 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Download Video (.webm)</span>
            </a>
          ) : (
            <button disabled className="py-3.5 px-4 rounded-2xl font-bold bg-slate-900 text-slate-600 opacity-50 cursor-not-allowed text-xs">
              Video Download Unavailable
            </button>
          )}

          {/* Download Transcript (.txt) Separately */}
          <button
            id="download-transcript-btn"
            type="button"
            onClick={handleDownloadTranscript}
            className="py-3.5 px-4 rounded-2xl font-bold border border-blue-500/40 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group cursor-pointer text-xs"
          >
            <svg className="w-4 h-4 text-blue-400 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Transcript (.txt)</span>
          </button>

          {/* Sync Button */}
          <button
            id="sync-external-app-btn"
            type="button"
            disabled={isSyncing || !recordedBlob}
            onClick={handleSyncData}
            className="py-3.5 px-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs"
          >
            {isSyncing ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
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
        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={handleStartNew}
            className="text-xs font-semibold underline underline-offset-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Start New Assessment Session
          </button>
        </div>
      </div>
    </div>
  );
}
