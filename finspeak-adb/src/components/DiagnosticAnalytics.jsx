import React, { useMemo } from 'react';
import { analyzeSpeech, MDB_SYLLABLE_STRESS_GUIDES } from '../data/diagnosticRules';
import { speechEngineSingleton } from '../services/speechEngine';
import {
  BarChart2, AlertTriangle, CheckCircle2, Award, Sparkles, RefreshCw,
  TrendingUp, ShieldCheck, FileText, ArrowRight, Zap, Target, BookOpen,
  Volume2, Mic, Activity
} from 'lucide-react';

export function DiagnosticAnalytics({ activeTranscript }) {
  const sampleSpeech = activeTranscript ||
    "We checked the budget and discussed about Laos solar energy project. The local government has some biability problem with pinancing and pacility because currency devalued. I think we should give them loan covenant waiver and wait for second tranche disbursement.";

  const analysis = useMemo(() => analyzeSpeech(sampleSpeech), [sampleSpeech]);

  const handlePlayStressAudio = (termText) => {
    speechEngineSingleton.speakText(termText, { pitch: 1.0, rate: 0.85 });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <BarChart2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Multi-Layer Speech Diagnostics & Phonetic Analytics</h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time calculation of MDB lexical density, Korean L1 transfer error auditing, phonetic shift diagnostics, and executive upgrade side-by-side transcripts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Audited Word Count:</span>
            <span className="font-mono font-bold text-cyan-400">{analysis.totalWords} words</span>
          </div>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Lexical Sophistication Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Lexical Score</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{analysis.lexicalDensityScore}</span>
            <span className="text-xs text-slate-400">/ 100 PTS</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${analysis.lexicalDensityScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">{analysis.mdbWordCount} MDB terms</p>
        </div>

        {/* Korean L1 Grammar Audit */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">L1 Grammar Audit</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{analysis.l1Issues.length}</span>
            <span className="text-xs text-slate-400">Flags</span>
          </div>
          <p className="text-[10px] text-slate-400">Preposition & Article Drops</p>
        </div>

        {/* Korean Phonetic Audit Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Phonetic Score</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{analysis.phoneticScore}</span>
            <span className="text-xs text-slate-400">/ 100 PTS</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${analysis.phoneticScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">{analysis.phoneticIssues.length} Sound Shift Flags</p>
        </div>

        {/* Framework Compliance Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Framework Score</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{analysis.frameworkScore.prep}%</span>
            <span className="text-xs text-slate-400">Adherence Index</span>
          </div>
          <p className="text-[10px] text-slate-400">PREP / SCR Alignment</p>
        </div>
      </div>

      {/* Side-by-Side Executive Upgrade Transcript */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
              Side-by-Side Transcript Diagnostic
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-2">Executive Upgrade Transcripts</h3>
          </div>

          <span className="text-xs text-slate-400 font-mono">Automated Reframing Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Original Student Speech */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/50 px-2.5 py-1 rounded border border-rose-900 inline-block">
              What You Said (Raw Transcript)
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-900 p-4 rounded-xl border border-slate-800">
              "{analysis.executiveUpgrade.original}"
            </p>
          </div>

          {/* Upgraded Executive Director Phrasing */}
          <div className="bg-slate-950 border-2 border-cyan-500/60 p-5 rounded-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800 inline-block">
              Executive Director Phrasing (Upgraded)
            </span>
            <p className="text-xs text-cyan-100 leading-relaxed font-mono bg-cyan-950/30 p-4 rounded-xl border border-cyan-900/50">
              "{analysis.executiveUpgrade.upgraded}"
            </p>
          </div>
        </div>

        {/* Key Reframing Adjustments */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Key Executive Reframing Highlights:</span>
          <ul className="space-y-1 text-xs text-slate-300">
            {analysis.executiveUpgrade.keyChanges.map((change, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Korean L1 Phonetic Audit Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Korean L1 Phonetic Shift Audit (/v/, /f/, /z/, /r/-/l/)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Identifies native Korean sound substitutions impacting executive delivery</p>
          </div>

          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
            Phonetic Audit Active
          </span>
        </div>

        {analysis.phoneticIssues.length === 0 ? (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
            No Korean L1 phonetic sound shifts detected in this speech sample! Your /v/, /f/, and /z/ pronunciations were clear.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.phoneticIssues.map((phon, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 uppercase text-[10px] bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    {phon.category}
                  </span>
                  <span className="text-slate-400 text-[10px]">Detected: "{phon.detectedText}"</span>
                </div>
                <p className="text-slate-300 font-medium">{phon.explanation}</p>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-amber-300 font-semibold text-[11px]">
                  💡 Mouth Coaching Tip: {phon.coachingTip}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MDB Syllable Stress Guides */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Volume2 className="w-4 h-4 text-cyan-400" />
          MDB Intonation & Syllable Stress Guides
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MDB_SYLLABLE_STRESS_GUIDES.map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-100 text-xs block">{item.term}</span>
                <span className="font-mono text-cyan-400 text-xs font-bold block">{item.stress}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{item.audioNote}</span>
              </div>
              <button
                onClick={() => handlePlayStressAudio(item.term)}
                className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 text-[10px] font-bold py-1.5 rounded-lg border border-slate-800 transition-all mt-2"
              >
                <Volume2 className="w-3 h-3" />
                Listen Stress
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
