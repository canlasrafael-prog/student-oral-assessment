'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAssessment, AssessmentSubmission } from '@/context/AssessmentContext';

export default function TeacherClient() {
  const { submissions, updateSubmissionRubric, theme } = useAssessment();
  const isDark = theme === 'dark';

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(
    submissions.length > 0 ? submissions[0].id : null
  );
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [rubricFluency, setRubricFluency] = useState<number>(4);
  const [rubricPronunciation, setRubricPronunciation] = useState<number>(4);
  const [rubricVocabulary, setRubricVocabulary] = useState<number>(4);
  const [rubricComprehension, setRubricComprehension] = useState<number>(4);
  const [teacherNotes, setTeacherNotes] = useState<string>('');

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesGrade = filterGrade === 'all' || sub.grade.toLowerCase() === filterGrade.toLowerCase();
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const activeSubmission = submissions.find((s) => s.id === selectedSubmissionId) || null;

  const handleSelectSubmission = (sub: AssessmentSubmission) => {
    setSelectedSubmissionId(sub.id);
    if (sub.rubricScores) {
      setRubricFluency(sub.rubricScores.fluency);
      setRubricPronunciation(sub.rubricScores.pronunciation);
      setRubricVocabulary(sub.rubricScores.vocabulary);
      setRubricComprehension(sub.rubricScores.comprehension);
    } else {
      setRubricFluency(4);
      setRubricPronunciation(4);
      setRubricVocabulary(4);
      setRubricComprehension(4);
    }
    setTeacherNotes(sub.notes || '');
  };

  const handleSaveRubric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmission) return;

    updateSubmissionRubric(
      activeSubmission.id,
      {
        fluency: rubricFluency,
        pronunciation: rubricPronunciation,
        vocabulary: rubricVocabulary,
        comprehension: rubricComprehension,
      },
      teacherNotes
    );

    alert(`Saved evaluation rubric scores for ${activeSubmission.studentName}!`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto space-y-6">
        {/* Header Navigation */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 shadow-xl shadow-slate-950/50'
              : 'bg-white/95 border-slate-200 shadow-md shadow-slate-200/50'
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-500 text-xs font-bold uppercase tracking-wider">
                Proctor & Teacher Portal
              </span>
              <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Oral Assessment Review
              </h1>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Review student video recordings, transcripts, and submit evaluation rubrics.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Student Assessment</span>
          </Link>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Submissions List */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search & Filter Bar */}
            <div
              className={`p-4 rounded-2xl border space-y-3 transition-colors duration-300 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student name..."
                className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Grade Filter:
                </span>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="all">All Grades</option>
                  <option value="grade1">Grade 1</option>
                  <option value="grade2">Grade 2</option>
                  <option value="grade3">Grade 3</option>
                  <option value="grade4">Grade 4</option>
                  <option value="grade5">Grade 5</option>
                  <option value="grade6">Grade 6</option>
                </select>
              </div>
            </div>

            {/* Submissions Cards */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => {
                  const isSelected = sub.id === selectedSubmissionId;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => handleSelectSubmission(sub)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80'
                          : 'bg-white border-slate-200 hover:bg-slate-100/80 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {sub.studentName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 text-[10px] font-extrabold uppercase">
                          {sub.grade.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] mt-2 opacity-75">
                        <span>{sub.questionCount} Prompts Completed</span>
                        <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                      </div>

                      {sub.rubricScores && (
                        <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-semibold text-emerald-500">
                          <span>Evaluated</span>
                          <span>
                            Score: {sub.rubricScores.fluency + sub.rubricScores.pronunciation + sub.rubricScores.vocabulary + sub.rubricScores.comprehension}/20
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className={`p-8 rounded-2xl border text-center ${isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-400'}`}>
                  <p className="text-xs font-semibold">No student submissions found.</p>
                  <p className="text-[11px] mt-1 opacity-75">Complete an oral assessment session to view recordings here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Review Panel & Rubric Evaluation */}
          <div className="lg:col-span-8 space-y-6">
            {activeSubmission ? (
              <>
                {/* Selected Student Details Card */}
                <div
                  className={`p-6 rounded-3xl border space-y-6 transition-colors duration-300 ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {activeSubmission.studentName}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 text-xs font-extrabold uppercase">
                          {activeSubmission.grade.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Submitted on {new Date(activeSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Transcript Viewer */}
                  <div className="space-y-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Speech Transcript & Spoken Content
                    </h4>
                    <div
                      className={`p-4 rounded-2xl border text-xs leading-relaxed max-h-40 overflow-y-auto ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {activeSubmission.transcript ? (
                        <p>&quot;{activeSubmission.transcript}&quot;</p>
                      ) : (
                        <p className="italic opacity-60">No automated transcript recorded for this session.</p>
                      )}
                    </div>
                  </div>

                  {/* Oral Assessment Rubric Evaluation Form */}
                  <form onSubmit={handleSaveRubric} className="space-y-4 pt-2 border-t border-slate-700/50">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Teacher Evaluation Rubric (1 to 5 Stars)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Fluency */}
                      <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">1. Fluency & Flow</span>
                          <span className="text-xs font-mono font-extrabold text-indigo-500">{rubricFluency}/5</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={rubricFluency}
                          onChange={(e) => setRubricFluency(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Pronunciation */}
                      <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">2. Pronunciation & Clarity</span>
                          <span className="text-xs font-mono font-extrabold text-indigo-500">{rubricPronunciation}/5</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={rubricPronunciation}
                          onChange={(e) => setRubricPronunciation(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Vocabulary */}
                      <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">3. Vocabulary & Expression</span>
                          <span className="text-xs font-mono font-extrabold text-indigo-500">{rubricVocabulary}/5</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={rubricVocabulary}
                          onChange={(e) => setRubricVocabulary(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Comprehension */}
                      <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">4. Prompt Comprehension</span>
                          <span className="text-xs font-mono font-extrabold text-indigo-500">{rubricComprehension}/5</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={rubricComprehension}
                          onChange={(e) => setRubricComprehension(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Teacher Feedback Notes */}
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Teacher Feedback Notes
                      </label>
                      <textarea
                        rows={3}
                        value={teacherNotes}
                        onChange={(e) => setTeacherNotes(e.target.value)}
                        placeholder="Write feedback notes for student report..."
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md cursor-pointer"
                    >
                      Save Rubric Evaluation
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div
                className={`p-12 rounded-3xl border text-center ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
                }`}
              >
                <svg className="w-12 h-12 mx-auto text-indigo-500/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-base font-bold text-slate-300">Select a Student Submission</h3>
                <p className="text-xs mt-1 opacity-75">Select a student from the left panel to review their oral assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
