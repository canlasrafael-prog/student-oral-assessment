import React, { useState, useMemo } from 'react';
import { MDB_CATEGORIES, getExpandedLexicon } from '../data/lexiconData';
import { MDB_SYLLABLE_STRESS_GUIDES } from '../data/diagnosticRules';
import { sessionStore } from '../services/sessionStore';
import { srsEngine } from '../services/srsEngine';
import { speechEngineSingleton } from '../services/speechEngine';
import {
  Search, BookOpen, Volume2, Bookmark, Coins, Briefcase, TrendingUp, ShieldCheck,
  Sparkles, Filter, ChevronRight, Check, ArrowRight, Plus, X, Tag, FileText,
  RotateCcw, Brain, CheckCircle2, Award
} from 'lucide-react';

export function LexiconDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [bookmarks, setBookmarks] = useState(sessionStore.getBookmarks());
  const [activeTab, setActiveTab] = useState('all'); // all | bookmarks | srs_due | custom
  const [showAddModal, setShowAddModal] = useState(false);

  // Custom Jargon Form State
  const [newTerm, setNewTerm] = useState('');
  const [newCategory, setNewCategory] = useState('financing');
  const [newDifficulty, setNewDifficulty] = useState('Executive');
  const [newDefinition, setNewDefinition] = useState('');
  const [newKoreanTip, setNewKoreanTip] = useState('');
  const [newCollocations, setNewCollocations] = useState('');
  const [newCasual, setNewCasual] = useState('');
  const [newExecutive, setNewExecutive] = useState('');

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const allLexicon = useMemo(() => {
    return getExpandedLexicon();
  }, [refreshTrigger]);

  const srsStats = useMemo(() => {
    return srsEngine.getStats(allLexicon);
  }, [allLexicon, refreshTrigger]);

  const dueSRSItems = useMemo(() => {
    return srsEngine.getDueReviewItems(allLexicon);
  }, [allLexicon, refreshTrigger]);

  const filteredLexicon = useMemo(() => {
    return allLexicon.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.koreanTip.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      const matchesBookmark = activeTab !== 'bookmarks' || bookmarks.includes(item.id);
      const matchesCustom = activeTab !== 'custom' || item.isCustom;
      const matchesSRS = activeTab !== 'srs_due' || dueSRSItems.some(d => d.id === item.id);

      return matchesSearch && matchesCat && matchesDiff && matchesBookmark && matchesCustom && matchesSRS;
    });
  }, [allLexicon, searchTerm, selectedCategory, selectedDifficulty, activeTab, bookmarks, dueSRSItems]);

  const handleToggleBookmark = (id) => {
    const updated = sessionStore.toggleBookmark(id);
    setBookmarks(updated);
  };

  const handleRecordSRS = (termId, quality) => {
    srsEngine.recordReview(termId, quality);
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePlayAudio = (termText) => {
    speechEngineSingleton.speakText(termText, { pitch: 1.0, rate: 0.9 });
  };

  const handleCreateCustomJargon = (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newDefinition.trim()) return;

    sessionStore.addCustomLexicon({
      term: newTerm.trim(),
      category: newCategory,
      difficulty: newDifficulty,
      phonetic: '/ˈkʌs.təm/',
      definition: newDefinition.trim(),
      koreanTip: newKoreanTip.trim() || '사용자 지정 맞춤형 MDB 금융 전문 용어.',
      adbContext: `Custom student practice phrase for ${newTerm.trim()}.`,
      collocations: newCollocations.split(',').map(c => c.trim()).filter(Boolean),
      casualVsExecutive: newCasual && newExecutive ? { casual: newCasual, executive: newExecutive } : null
    });

    setNewTerm('');
    setNewDefinition('');
    setNewKoreanTip('');
    setNewCollocations('');
    setNewCasual('');
    setNewExecutive('');
    setShowAddModal(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">MDB Executive Lexicon & SM-2 Spaced Repetition Engine</h2>
          </div>
          <p className="text-xs text-slate-400">
            300+ verified MDB terms, adaptive SM-2 spaced repetition (SRS), Korean context anchors (한글 팁), and custom jargon creator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Custom Jargon / Phrase
          </button>
        </div>
      </div>

      {/* SRS Mastery Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Due for Review</span>
            <span className="text-xl font-extrabold text-cyan-400">{dueSRSItems.length} Terms</span>
          </div>
          <Brain className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">New Queue</span>
            <span className="text-xl font-extrabold text-amber-400">{srsStats.newCount} Terms</span>
          </div>
          <RotateCcw className="w-5 h-5 text-amber-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Learning Queue</span>
            <span className="text-xl font-extrabold text-blue-400">{srsStats.learningCount} Terms</span>
          </div>
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Mastered Terms</span>
            <span className="text-xl font-extrabold text-emerald-400">{srsStats.masteredCount} Terms</span>
          </div>
          <Award className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Filter & Sub-Tab Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Entries ({allLexicon.length})
            </button>
            <button
              onClick={() => setActiveTab('srs_due')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'srs_due' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SRS Due Review ({dueSRSItems.length})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'bookmarks' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bookmarked ({bookmarks.length})
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'custom' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Added ({sessionStore.getCustomLexicon().length})
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono">Showing {filteredLexicon.length} entries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="md:col-span-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms, definitions, Korean tips..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {MDB_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 border-cyan-500/60 text-cyan-400 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center justify-end gap-1.5">
            {['all', 'Intermediate', 'Advanced', 'Executive'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-950 border-cyan-800 text-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {diff.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lexicon Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLexicon.length === 0 ? (
          <div className="col-span-2 text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No lexicon terms found matching your criteria. Click "+ Add Custom Jargon / Phrase" above to add your own!
          </div>
        ) : (
          filteredLexicon.map((item) => {
            const isBookmarked = bookmarks.includes(item.id);
            const stressGuide = MDB_SYLLABLE_STRESS_GUIDES.find(s => s.term.toLowerCase() === item.term.toLowerCase());

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg space-y-3.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-100">{item.term}</h3>
                        {item.isCustom && (
                          <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                            Custom Jargon
                          </span>
                        )}
                        <button
                          onClick={() => handlePlayAudio(item.term)}
                          className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                          title="Listen to native audio pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                      </div>
                      
                      {stressGuide ? (
                        <span className="text-[11px] font-mono text-cyan-400 font-bold block mt-0.5">
                          Stress: {stressGuide.stress}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">{item.phonetic}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        item.difficulty === 'Executive' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                        item.difficulty === 'Advanced' ? 'bg-cyan-950 text-cyan-400 border-cyan-800' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {item.difficulty}
                      </span>
                      <button
                        onClick={() => handleToggleBookmark(item.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-medium mb-3">{item.definition}</p>

                  {/* Korean Context Anchor (한글 팁) */}
                  <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl space-y-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Korean Context Anchor / 한글 팁
                    </span>
                    <p className="text-xs text-amber-100 font-medium">{item.koreanTip}</p>
                  </div>

                  {/* ADB Context & Collocations */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">ADB Real-World Context</span>
                      <p className="text-slate-300 italic">{item.adbContext}</p>
                    </div>

                    {item.collocations && item.collocations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.collocations.map((col, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-950 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                            + {col}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SM-2 Spaced Repetition Quality Rating Bar */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 mt-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">SM-2 Practice Recall:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleRecordSRS(item.id, 1)}
                      className="px-2 py-1 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded text-[10px] font-bold border border-rose-800"
                      title="Forgot completely (Interval resets to 1 day)"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleRecordSRS(item.id, 3)}
                      className="px-2 py-1 bg-amber-950 hover:bg-amber-900 text-amber-300 rounded text-[10px] font-bold border border-amber-800"
                      title="Hard recall"
                    >
                      Hard
                    </button>
                    <button
                      onClick={() => handleRecordSRS(item.id, 4)}
                      className="px-2 py-1 bg-blue-950 hover:bg-blue-900 text-blue-300 rounded text-[10px] font-bold border border-blue-800"
                      title="Good recall"
                    >
                      Good
                    </button>
                    <button
                      onClick={() => handleRecordSRS(item.id, 5)}
                      className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded text-[10px] font-bold border border-emerald-800"
                      title="Perfect recall (Mastered)"
                    >
                      Easy
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Jargon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Custom Jargon, Collocation & Phrase
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomJargon} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Term / Jargon Name *</label>
                <input
                  type="text"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="e.g., Sovereign Counter-Indemnity"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Domain Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="financing">Financing Modalities</option>
                    <option value="operations">Project Operations</option>
                    <option value="macro_risk">Macro Risk & Sustainability</option>
                    <option value="governance">Governance & Policy</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Difficulty Register</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Definition & Institutional Meaning *</label>
                <textarea
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  placeholder="Explain the precise development finance definition..."
                  rows={2}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Korean Context Anchor / 한글 팁</label>
                <input
                  type="text"
                  value={newKoreanTip}
                  onChange={(e) => setNewKoreanTip(e.target.value)}
                  placeholder="한국어 실무 뉘앙스 및 흔한 누락 팁..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Institutional Collocations (Comma separated)</label>
                <input
                  type="text"
                  value={newCollocations}
                  onChange={(e) => setNewCollocations(e.target.value)}
                  placeholder="e.g., execute counter-indemnity, sovereign guarantee backing"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-400 font-bold px-4 py-2 rounded-xl border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl shadow-lg"
                >
                  Save Jargon to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
