import React, { useState } from 'react';
import { sessionStore } from '../services/sessionStore';
import { speechEngineSingleton } from '../services/speechEngine';
import {
  Users, MessageSquare, Plus, Trash2, Volume2, Sparkles, AlertCircle,
  CheckCircle2, Clock, Pin, Filter, Eye, ShieldCheck, CornerDownRight, BookOpen
} from 'lucide-react';

export function TeacherDashboard({ activeTranscript, sessionTurns = [] }) {
  const [annotations, setAnnotations] = useState(sessionStore.getTeacherAnnotations());
  const [newNote, setNewNote] = useState('');
  const [selectedTag, setSelectedTag] = useState('L1 Korean Interference');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categorized Bank of 30+ Challenge Questions
  const challengeQuestionBank = [
    // --- RISK PROBING ---
    { id: 'q-01', category: 'Risk Probing', question: "Given the foreign exchange volatility you mentioned, what is the exact debt service coverage ratio under a 20% local currency depreciation scenario?", reason: 'Challenges student on currency sensitivity analysis.' },
    { id: 'q-02', category: 'Risk Probing', question: "Your DSCR is 1.35x, but sovereign yield spreads widened 350 bps last month. How does the borrower plan to refinance near-term debt maturities?", reason: 'Tests refinancing risk and sovereign bond yield exposure.' },
    { id: 'q-03', category: 'Risk Probing', question: "If the first-loss concessional tranche absorbs initial non-performing loan (NPL) losses, what is ADB's principal impairment threshold?", reason: 'Evaluates capital adequacy and first-loss risk allocation.' },
    { id: 'q-04', category: 'Risk Probing', question: "What parametric trigger threshold activates the contingent disaster liquidity release, and how do you protect against basis risk shortfalls?", reason: 'Tests parametric index design and catastrophe risk modeling.' },
    { id: 'q-05', category: 'Risk Probing', question: "If commercial off-takers default on power purchase payments, does the sovereign counter-indemnity cover 100% of missed debt service?", reason: 'Verifies sovereign guarantee indemnity terms.' },
    { id: 'q-06', category: 'Risk Probing', question: "How does a 12% construction cost overrun impact the Economic Internal Rate of Return (EIRR) relative to our 12% baseline hurdle rate?", reason: 'Checks EIRR sensitivity against cost inflation.' },

    // --- SAFEGUARDS & ESG ---
    { id: 'q-07', category: 'Safeguards', question: "You referenced community support, but has the Executing Agency published the Category A Environmental Safeguard Audit for public disclosure?", reason: 'Probes compliance with ADB Safeguard Policy Statement.' },
    { id: 'q-08', category: 'Safeguards', question: "Land acquisition for the transmission corridor affects 450 informal settler households. Has the Land Acquisition and Resettlement Plan (LARP) been executed?", reason: 'Tests involuntary resettlement safeguard protocols.' },
    { id: 'q-09', category: 'Safeguards', question: "Does this infrastructure package strictly comply with the ADB Climate Change Action Plan 2024–2030, or are we seeking a policy exception?", reason: 'Verifies Paris Agreement taxonomy alignment.' },
    { id: 'q-10', category: 'Safeguards', question: "Lithium battery disposal in island communities poses severe hazardous waste risks. Where is the contractually mandated e-waste lifecycle plan?", reason: 'Probes e-waste & hazardous material safeguards.' },
    { id: 'q-11', category: 'Safeguards', question: "Dredging 4 million cubic meters of sediment threatens coastal coral reefs. Where is the continuous water turbidity monitoring protocol?", reason: 'Evaluates marine biodiversity protection standards.' },
    { id: 'q-12', category: 'Safeguards', question: "How does the project incorporate gender-disaggregated baseline indicators in accordance with ADB Gender Equality Mainstreaming mandates?", reason: 'Checks gender mainstreaming policy compliance.' },

    // --- PROCUREMENT OVERSIGHT ---
    { id: 'q-13', category: 'Procurement', question: "Phase 1 suffered procurement bottlenecks. What contractual indexation clause prevents identical cost overruns in Phase 2?", reason: 'Tests execution capability and procurement knowledge.' },
    { id: 'q-14', category: 'Procurement', question: "The Executing Agency missed three consecutive procurement deadlines. Why should the Board believe Phase 2 won't suffer identical delays?", reason: 'Challenges institutional execution bottlenecks.' },
    { id: 'q-15', category: 'Procurement', question: "Has the local Ministry of Finance deposited their required 20% counterpart funding into the escrow account, or are we funding 100% of upfront civil works?", reason: 'Probes counterpart funding shortfall risks.' },
    { id: 'q-16', category: 'Procurement', question: "If the EPC contractor defaults under local arbitration rules, what is our immediate operational contingency plan?", reason: 'Tests EPC contract enforcement and dispute resolution.' },
    { id: 'q-17', category: 'Procurement', question: "Coordinating procurement across three separate state utilities is an operational nightmare. Which single Executing Agency maintains fiduciary authority?", reason: 'Verifies PIU governance structure.' },
    { id: 'q-18', category: 'Procurement', question: "Under 30-day emergency procurement timelines, what independent audit safeguards prevent procurement integrity breaches?", reason: 'Audits emergency procurement governance.' },

    // --- GOVERNANCE & PFM ---
    { id: 'q-19', category: 'Governance', question: "Policy-based loans disburse directly into general treasury funds. What audit safeguards prevent these funds from being reallocated to non-developmental outlays?", reason: 'Audits PFM budget support safeguards.' },
    { id: 'q-20', category: 'Governance', question: "Parliamentary approval of the utility tariff law is stalled in committee. If Tranche 1 disburses now, what leverage remains for Tranche 2?", reason: 'Challenges structural conditionality compliance.' },
    { id: 'q-21', category: 'Governance', question: "Weaknesses in local PFM systems required direct project account management. Has the Executing Agency transitioned to IPSAS auditing standards?", reason: 'Evaluates PFM accounting standards.' },
    { id: 'q-22', category: 'Governance', question: "If correspondent banks terminate clearing accounts despite this loan, what backstop liquidity exists to preserve international trade channels?", reason: 'Tests AML/CFT correspondent banking compliance.' },
    { id: 'q-23', category: 'Governance', question: "How does the policy matrix enforce anti-corruption covenants in state-owned enterprise (SOE) procurement?", reason: 'Checks SOE anti-corruption governance.' },
    { id: 'q-24', category: 'Governance', question: "Municipal accounting capacity varies drastically across provinces. How can we ensure 100% PFM software adoption without technical assistance overruns?", reason: 'Audits sub-sovereign capacity building.' },

    // --- MACROECONOMIC STRESS ---
    { id: 'q-25', category: 'Macro Stress', question: "The IMF-ADB Joint Debt Sustainability Analysis elevated the country to High Risk of Debt Distress. How can ADB justify non-concessional lending?", reason: 'Challenges sovereign debt distress thresholds.' },
    { id: 'q-26', category: 'Macro Stress', question: "Revolving credit lines run the risk of becoming permanent debt subsidies if spot LNG prices stay elevated for 2 years. What is the exit strategy?", reason: 'Tests energy subsidy exit strategies.' },
    { id: 'q-27', category: 'Macro Stress', question: "A $500M loan increases the country's sovereign debt-to-GDP ratio by 3.4 percentage points. How will the Ministry of Finance maintain fiscal balance?", reason: 'Evaluates debt-to-GDP fiscal space impact.' },
    { id: 'q-28', category: 'Macro Stress', question: "If commercial bondholders refuse the tender offer at a discount, ADB's guarantee remains unexecuted while yield spreads widen. What is Plan B?", reason: 'Probes debt restructuring tender offers.' },
    { id: 'q-29', category: 'Macro Stress', question: "If a Category 5 cyclone strikes before living breakwaters establish structural strength, what physical asset protection exists?", reason: 'Tests climate shock physical resilience.' },
    { id: 'q-30', category: 'Macro Stress', question: "How does the transaction structure mitigate unhedged foreign exchange exposure when user tariffs are pegged to domestic inflation?", reason: 'Audits FX mismatch risk in tariffs.' }
  ];

  const filteredQuestions = selectedCategory === 'All'
    ? challengeQuestionBank
    : challengeQuestionBank.filter(q => q.category === selectedCategory);

  const handleAddAnnotation = () => {
    if (!newNote.trim()) return;
    const updated = sessionStore.addTeacherAnnotation({
      text: newNote,
      tag: selectedTag,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    setAnnotations(updated);
    setNewNote('');
  };

  const handleTriggerFollowUp = (qText) => {
    speechEngineSingleton.speakText(qText, { pitch: 1.0, rate: 1.0 });
    sessionStore.addTeacherAnnotation({
      text: `Teacher injected AI follow-up challenge: "${qText}"`,
      tag: 'Teacher Intervention',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    setAnnotations(sessionStore.getTeacherAnnotations());
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Teacher Observation & Large Challenge Question Bank</h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time student speech telemetry sync paired with 30+ categorized ADB Boardroom challenge questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
            Live Telemetry Sync Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Transcript & Challenge Question Bank (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-Time Transcript & Audio Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                Live Session Stream & Audio Telemetry
              </h3>
              <span className="text-xs text-slate-400">Turn-by-Turn Audio Record</span>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 min-h-[180px] max-h-[260px] overflow-y-auto space-y-3">
              {sessionTurns.length === 0 && !activeTranscript ? (
                <div className="text-center py-10 text-slate-400 text-xs italic">
                  Waiting for student to initiate boardroom brief... Live turns will stream here in real-time.
                </div>
              ) : (
                sessionTurns.map((turn, i) => (
                  <div key={i} className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-cyan-400">{turn.speaker}</span>
                      <span className="text-slate-500">Segment #{i + 1}</span>
                    </div>
                    <p className="text-xs text-slate-200">{turn.text}</p>
                  </div>
                ))
              )}

              {activeTranscript && (
                <div className="bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl text-xs text-cyan-100">
                  <span className="font-bold text-[10px] text-cyan-400 block mb-1 uppercase">Active Audio Stream</span>
                  {activeTranscript}
                </div>
              )}
            </div>
          </div>

          {/* Large Categorized Bank of Challenge Questions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Categorized Bank of 30+ Boardroom Challenge Questions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select domain category to trigger instant 1-click teacher voice injection into student session.
                </p>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">
                {filteredQuestions.length} Questions
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Risk Probing', 'Safeguards', 'Procurement', 'Governance', 'Macro Stress'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Question Cards List */}
            <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto">
              {filteredQuestions.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      {rec.category}
                    </span>
                    <p className="text-xs font-semibold text-slate-200">"{rec.question}"</p>
                    <p className="text-[11px] text-slate-400 italic">{rec.reason}</p>
                  </div>
                  <button
                    onClick={() => handleTriggerFollowUp(rec.question)}
                    className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition-all shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Speak Aloud
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Teacher Manual Intervention & Annotations (1 Col) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Pin className="w-4 h-4 text-cyan-400" />
              Manual Intervention Tool
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Annotation Category</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
                >
                  <option value="L1 Korean Interference">L1 Korean Interference (Preposition/Article)</option>
                  <option value="Incorrect Collocation">Incorrect Collocation</option>
                  <option value="Low Executive Register">Low Executive Register</option>
                  <option value="Teacher Intervention">Teacher Intervention Prompt</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Teacher Feedback / Corrective Note</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Annotate timestamp, highlight collocation error, or type instant teacher prompt..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleAddAnnotation}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition-all"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                Pin Teacher Annotation
              </button>
            </div>
          </div>

          {/* Timestamped Teacher Annotation History */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pinned Session Annotations</h4>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {annotations.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">No teacher annotations pinned yet.</p>
              ) : (
                annotations.map((note) => (
                  <div key={note.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-cyan-400 uppercase">{note.tag}</span>
                      <span className="text-slate-500">{note.time}</span>
                    </div>
                    <p className="text-slate-300 font-medium">{note.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
