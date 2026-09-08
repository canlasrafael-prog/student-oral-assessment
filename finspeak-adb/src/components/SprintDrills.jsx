import React, { useState, useEffect } from 'react';
import { REWRITE_DRILLS, COLLOCATION_MATCHES } from '../data/sprintDrillsData';
import { speechEngineSingleton } from '../services/speechEngine';
import { sessionStore } from '../services/sessionStore';
import {
  Zap, Volume2, Mic, CheckCircle2, XCircle, RotateCcw, Sparkles,
  Award, ArrowRight, HelpCircle, Flame, Trophy, HelpCircle as QuizIcon, BookOpen
} from 'lucide-react';

export function SprintDrills() {
  const [activeSprint, setActiveSprint] = useState('quiz'); // quiz | rewrite | collocation
  const [rewriteIndex, setRewriteIndex] = useState(0);
  const [userSpeechInput, setUserSpeechInput] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // Multiple Choice Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);

  // Collocation game state
  const [colIndex, setColIndex] = useState(0);
  const [colStreak, setColStreak] = useState(0);
  const [colScore, setColScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuiz = REWRITE_DRILLS[quizIndex];
  const currentRewrite = REWRITE_DRILLS[rewriteIndex];
  const currentCollocation = COLLOCATION_MATCHES[colIndex];

  const handlePlayPromptAudio = (text) => {
    speechEngineSingleton.speakText(text, { pitch: 1.0, rate: 0.95 });
  };

  const handleQuizOptionSelect = (option) => {
    if (isQuizAnswered) return;
    setSelectedQuizOption(option);
    setIsQuizAnswered(true);

    if (option === currentQuiz.modelAnswer) {
      setQuizStreak(prev => prev + 1);
      setQuizScore(prev => prev + 10);
      speechEngineSingleton.speakText(option, { pitch: 1.05, rate: 1.0 });
    } else {
      setQuizStreak(0);
    }
  };

  const handleNextQuiz = () => {
    setSelectedQuizOption(null);
    setIsQuizAnswered(false);
    if (quizIndex < REWRITE_DRILLS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizIndex(0);
    }
  };

  const handleNextRewrite = () => {
    setShowModelAnswer(false);
    setUserSpeechInput('');
    if (rewriteIndex < REWRITE_DRILLS.length - 1) {
      setRewriteIndex(prev => prev + 1);
    } else {
      setRewriteIndex(0);
    }
  };

  const handleCollocationSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentCollocation.correctNoun) {
      setColStreak(prev => prev + 1);
      setColScore(prev => prev + 10);
      speechEngineSingleton.speakText(`${currentCollocation.verb} ${option}`, { pitch: 1.05, rate: 1.0 });
    } else {
      setColStreak(0);
    }
  };

  const handleNextCollocation = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (colIndex < COLLOCATION_MATCHES.length - 1) {
      setColIndex(prev => prev + 1);
    } else {
      setColIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Finance Jargon & Collocation Quiz Bank</h2>
          </div>
          <p className="text-xs text-slate-400">
            Interactive multiple-choice quizzes, casual-to-executive rewrites, and rapid collocation drills.
          </p>
        </div>

        {/* Sprint Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveSprint('quiz')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSprint === 'quiz' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multiple-Choice Quiz ({REWRITE_DRILLS.length})
          </button>
          <button
            onClick={() => setActiveSprint('rewrite')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSprint === 'rewrite' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Voice/Text Speech Practice
          </button>
          <button
            onClick={() => setActiveSprint('collocation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSprint === 'collocation' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rapid Collocation Match
          </button>
        </div>
      </div>

      {/* SPRINT MODE 1: Multiple-Choice Finance Jargon Quiz */}
      {activeSprint === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                Quiz #{quizIndex + 1} of {REWRITE_DRILLS.length} — {currentQuiz.category}
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-2">Convert Casual Expression to MDB Finance Jargon</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold">Streak: {quizStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-emerald-400">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Score: {quizScore} pts</span>
              </div>
            </div>
          </div>

          {/* Casual Expression Prompt Card */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900">
              Casual Everyday Expression
            </span>
            <p className="text-lg font-semibold text-slate-100">"{currentQuiz.casualText}"</p>
          </div>

          {/* Korean Contextual Hint */}
          <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Korean Context Anchor / 한글 팁
            </span>
            <p className="text-xs text-amber-100 font-medium">{currentQuiz.koreanHint}</p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select the Correct Executive MDB Finance Jargon Equivalent:
            </label>
            <div className="grid grid-cols-1 gap-3">
              {currentQuiz.options.map((opt, i) => {
                const isSelected = selectedQuizOption === opt;
                const isCorrect = opt === currentQuiz.modelAnswer;

                let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500";
                if (isQuizAnswered) {
                  if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-bold shadow-lg shadow-emerald-500/10";
                  else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-100";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleQuizOptionSelect(opt)}
                    disabled={isQuizAnswered}
                    className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isQuizAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isQuizAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiz Feedback & Next Button */}
          {isQuizAnswered && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Key Lexicon Terms:</span>
                <div className="flex flex-wrap gap-1">
                  {currentQuiz.keyTerms.map((term, idx) => (
                    <span key={idx} className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-semibold">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextQuiz}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shrink-0"
              >
                Next Quiz Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* SPRINT MODE 2: Voice/Text Speech Practice */}
      {activeSprint === 'rewrite' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                Exercise #{rewriteIndex + 1} of {REWRITE_DRILLS.length} — {currentRewrite.category}
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-2">Casual-to-Executive Register Speech Drill</h3>
            </div>

            <button
              onClick={() => handlePlayPromptAudio(currentRewrite.audioPrompt)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              Listen Audio Prompt
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900">
              Casual Everyday Statement
            </span>
            <p className="text-base font-medium text-slate-200">"{currentRewrite.casualText}"</p>
          </div>

          <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Korean Context Anchor / 한글 팁
            </span>
            <p className="text-xs text-amber-100 font-medium">{currentRewrite.koreanHint}</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">Speak or Type Your MDB Executive Rewrite:</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={userSpeechInput}
                onChange={(e) => setUserSpeechInput(e.target.value)}
                placeholder="Speak or type your executive response here..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => setShowModelAnswer(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all"
              >
                Reveal Model Answer
              </button>
            </div>
          </div>

          {showModelAnswer && (
            <div className="bg-slate-950 border-2 border-emerald-500/60 p-5 rounded-2xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ADB Executive Model Response
                </span>
                <button
                  onClick={() => handlePlayPromptAudio(currentRewrite.modelAnswer)}
                  className="p-1 rounded bg-slate-900 text-cyan-400 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-emerald-100 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40">
                "{currentRewrite.modelAnswer}"
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Key Lexicon Terms:</span>
                <div className="flex flex-wrap gap-1">
                  {currentRewrite.keyTerms.map((term, i) => (
                    <span key={i} className="text-[10px] bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-800 font-semibold">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextRewrite}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition-all"
                >
                  Next Speech Exercise <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SPRINT MODE 3: Rapid Collocation Match */}
      {activeSprint === 'collocation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                Match #{colIndex + 1} of {COLLOCATION_MATCHES.length}
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-2">Rapid Collocation Speed Match</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold">Streak: {colStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-emerald-400">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Score: {colScore} pts</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Institutional Verb</span>
            <h2 className="text-3xl font-extrabold text-cyan-400">{currentCollocation.verb}</h2>
            <p className="text-xs text-slate-400">Select the correct MDB institutional noun that completes the collocation:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCollocation.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentCollocation.correctNoun;

              let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500";
              if (isAnswered) {
                if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-bold";
                else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-100";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleCollocationSelect(opt)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">MDB Collocation Formula</span>
                <p className="text-xs text-slate-200 font-semibold">{currentCollocation.tip}</p>
              </div>
              <button
                onClick={handleNextCollocation}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Next Match <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
