'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';

export default function RegisterClient() {
  const router = useRouter();
  const { registerStudent } = useAssessment();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('grade1');
  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name to proceed.');
      return;
    }

    if (!consentGiven) {
      setErrorMsg('Please confirm video recording consent to proceed.');
      return;
    }

    setErrorMsg('');
    registerStudent(name.trim(), grade, consentGiven);
    router.push('/test');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background ambient light */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Oral Response Assessment
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Student Registration
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Please enter your information to start your grade-adapted oral assessment session.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="student-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Student Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="grade-level" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Grade Level <span className="text-rose-400">*</span>
            </label>
            <select
              id="grade-level"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="kinder">Kindergarten</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
              <option value="grade4">Grade 4</option>
              <option value="grade5">Grade 5</option>
              <option value="grade6">Grade 6</option>
              <option value="grade7">Grade 7</option>
              <option value="grade8">Grade 8</option>
              <option value="grade9">Grade 9</option>
              <option value="grade10">Grade 10</option>
              <option value="grade11">Grade 11</option>
              <option value="grade12">Grade 12</option>
              <option value="adult">Adult Level</option>
            </select>
          </div>

          {/* Privacy & Recording Notice */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/50 space-y-3">
            <div className="flex items-start gap-3">
              <input
                id="consent-checkbox"
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer"
              />
              <label htmlFor="consent-checkbox" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                <strong className="text-indigo-300">Media Recording Consent Notice:</strong> This session will be video recorded (webcam & microphone) for educational oral assessment purposes. By checking this box, you confirm permission to record this session.
              </label>
            </div>
          </div>

          <button
            id="start-assessment-btn"
            type="submit"
            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Proceed to Oral Assessment</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
