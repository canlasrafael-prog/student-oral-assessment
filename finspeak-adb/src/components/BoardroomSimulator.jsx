import React, { useState, useEffect, useRef } from 'react';
import { PERSONAS } from '../data/personasData';
import { SCENARIOS } from '../data/scenariosData';
import { parseADBBoardPaper } from '../services/pdfParser';
import { AudioWaveform } from './AudioWaveform';
import { SpeakingFrameworkScaffold } from './SpeakingFrameworkScaffold';
import { speechEngineSingleton } from '../services/speechEngine';
import { sessionStore } from '../services/sessionStore';
import {
  Mic, MicOff, Play, Pause, Volume2, ShieldAlert, AlertTriangle,
  Send, RefreshCw, Sparkles, UserCheck, Clock, Award, ChevronRight, HelpCircle,
  Headphones, RotateCcw, FileText, Upload, Zap, CheckCircle2, X
} from 'lucide-react';

export function BoardroomSimulator({ onSessionComplete }) {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [scenariosList, setScenariosList] = useState(SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [sessionPhase, setSessionPhase] = useState('idle'); // idle | pitching | interrupted | defending | complete
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [interruptionQuestion, setInterruptionQuestion] = useState(null);
  const [turns, setTurns] = useState([]);
  const [freqData, setFreqData] = useState(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lowLatencyInterrupter, setLowLatencyInterrupter] = useState(true);

  // RRP Document Upload Modal State
  const [showRRPModal, setShowRRPModal] = useState(false);
  const [rrpDocumentText, setRrpDocumentText] = useState('');
  const [rrpFileName, setRrpFileName] = useState('');

  const audioPlayerRef = useRef(null);
  const timerRef = useRef(null);

  // Frequency animation loop for waveform
  useEffect(() => {
    let animId;
    const updateFreq = () => {
      if (isRecording) {
        const data = speechEngineSingleton.getAudioFrequencyData();
        setFreqData(data);
      } else {
        setFreqData(null);
      }
      animId = requestAnimationFrame(updateFreq);
    };
    updateFreq();
    return () => cancelAnimationFrame(animId);
  }, [isRecording]);

  // Timer countdown handler
  useEffect(() => {
    if (isRecording && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording, timerSeconds]);

  const handleStartPitch = () => {
    setSessionPhase('pitching');
    setTimerSeconds(120);
    setTranscript('');
    setTurns([]);
    setInterruptionQuestion(null);
    setRecordedAudioUrl(null);
    setIsRecording(true);

    speechEngineSingleton.startListening(
      (newText) => {
        setTranscript(newText);
        checkForInterruption(newText);
      },
      (err) => console.warn('Speech engine error:', err)
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    speechEngineSingleton.stopListening((url) => {
      if (url) setRecordedAudioUrl(url);
    });
  };

  const triggerAIInterruption = (questionText) => {
    handleStopRecording();
    setSessionPhase('interrupted');
    setInterruptionQuestion(questionText);

    const updatedTurns = [
      ...turns,
      { speaker: 'Student Pitch', text: transcript || 'User delivered ADB pitch brief.' },
      { speaker: selectedPersona.name + ' (' + selectedPersona.title + ')', text: questionText }
    ];
    setTurns(updatedTurns);

    speechEngineSingleton.speakText(
      questionText,
      selectedPersona.voiceSetting,
      () => {
        setSessionPhase('defending');
      }
    );
  };

  const checkForInterruption = (currentText) => {
    if (sessionPhase !== 'pitching') return;

    const wordCount = currentText.trim().split(/\s+/).length;
    const threshold = lowLatencyInterrupter ? 12 : 20;

    if (wordCount >= threshold && !interruptionQuestion) {
      const triggers = selectedScenario.adversarialTriggers.find(t => t.personaId === selectedPersona.id);
      const questionText = triggers ? triggers.question : selectedPersona.sampleQuestions[0];
      triggerAIInterruption(questionText);
    }
  };

  const handleSendManualSpeech = () => {
    if (!manualInput.trim()) return;
    const fullText = (transcript + ' ' + manualInput).trim();
    setTranscript(fullText);
    setManualInput('');

    if (sessionPhase === 'defending') {
      const finalTurns = [
        ...turns,
        { speaker: 'Student Defense', text: manualInput }
      ];
      setTurns(finalTurns);
      setSessionPhase('complete');

      sessionStore.saveSession({
        scenario: selectedScenario.title,
        persona: selectedPersona.name,
        transcript: fullText,
        turns: finalTurns,
        recordedAudioUrl
      });

      if (onSessionComplete) onSessionComplete(fullText, finalTurns, recordedAudioUrl);
    } else {
      checkForInterruption(fullText);
    }
  };

  const handleFinishSession = () => {
    handleStopRecording();
    setSessionPhase('complete');

    const finalTurns = [...turns];
    if (transcript && (!finalTurns.length || finalTurns[finalTurns.length - 1].speaker !== 'Student Pitch')) {
      finalTurns.push({ speaker: 'Student Pitch', text: transcript });
    }

    sessionStore.saveSession({
      scenario: selectedScenario.title,
      persona: selectedPersona.name,
      transcript: transcript || 'Completed simulation session.',
      turns: finalTurns,
      recordedAudioUrl
    });

    if (onSessionComplete) onSessionComplete(transcript, finalTurns, recordedAudioUrl);
  };

  const handleParseRRPFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRrpFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setRrpDocumentText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleProcessParsedRRP = () => {
    if (!rrpDocumentText.trim()) return;
    const customScenario = parseADBBoardPaper(rrpDocumentText, rrpFileName || 'Custom ADB Board Paper');
    setScenariosList(prev => [customScenario, ...prev]);
    setSelectedScenario(customScenario);
    setShowRRPModal(false);
    setRrpDocumentText('');
    setRrpFileName('');
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Scenario Card & Persona Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scenario Selection Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
              {selectedScenario.isParsedRRP ? 'Parsed ADB Board Paper (RRP)' : 'Active Scenario Card'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRRPModal(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload RRP Board Paper
              </button>
              <select
                value={selectedScenario.id}
                onChange={(e) => setSelectedScenario(scenariosList.find(s => s.id === e.target.value))}
                className="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                {scenariosList.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
            {selectedScenario.title}
          </h2>
          <p className="text-xs text-slate-400 mb-4">{selectedScenario.brief}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Modality</span>
              <span className="font-semibold text-slate-200 truncate block">{selectedScenario.modality}</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">EIRR Benchmark</span>
              <span className="font-semibold text-emerald-400 block">{selectedScenario.keyMetrics.EIRR}</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">DSCR Ratio</span>
              <span className="font-semibold text-cyan-400 block">{selectedScenario.keyMetrics.DebtServiceCoverageRatio || '1.45x'}</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Korean Focus Tip</span>
              <span className="font-semibold text-amber-400 text-[10px] truncate block">한글 팁 적용</span>
            </div>
          </div>
        </div>

        {/* AI Director Persona Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Boardroom Opponent
              </span>
              <button
                onClick={() => setLowLatencyInterrupter(!lowLatencyInterrupter)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                  lowLatencyInterrupter ? 'bg-cyan-950 text-cyan-400 border-cyan-800' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
                title="Toggle Full-Duplex Low-Latency AI Interrupter (<300ms sensitivity)"
              >
                {lowLatencyInterrupter ? '⚡ Low-Latency Audio On' : 'Standard Audio'}
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <span className="text-3xl">{selectedPersona.avatar}</span>
              <div>
                <h3 className="font-bold text-sm text-slate-100">{selectedPersona.name}</h3>
                <p className="text-xs text-slate-400">{selectedPersona.title}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mb-3">"{selectedPersona.personality}"</p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {PERSONAS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedPersona.id === p.id
                    ? 'border-cyan-500 bg-cyan-950/30 text-white font-bold'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-lg block">{p.avatar}</span>
                <span className="text-[10px] truncate block mt-0.5">{p.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Conference Roleplay UI */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        {/* Conference Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isRecording ? 'bg-rose-950/40 border-rose-500/50 text-rose-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                ADB Boardroom Roleplay Simulation
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  sessionPhase === 'pitching' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  sessionPhase === 'interrupted' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                  sessionPhase === 'defending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  Phase: {sessionPhase.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Deliver your 1-2 min pitch brief under director oversight</p>
            </div>
          </div>

          {/* Countdown Timer & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-lg font-bold text-slate-100">{formatTime(timerSeconds)}</span>
            </div>

            {sessionPhase === 'idle' || sessionPhase === 'complete' ? (
              <button
                onClick={handleStartPitch}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                Start Boardroom Brief
              </button>
            ) : (
              <button
                onClick={handleFinishSession}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all"
              >
                <MicOff className="w-4 h-4" />
                End & Analyze Session
              </button>
            )}
          </div>
        </div>

        {/* Audio Waveform Meter */}
        <AudioWaveform isActive={isRecording} frequencyData={freqData} />

        {/* Recorded Student Voice Playback Player Bar */}
        {recordedAudioUrl && (
          <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-4 shadow-lg flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayback}
                className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md"
              >
                {isPlayingAudio ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950" />}
              </button>
              <div>
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" />
                  Student Recorded Voice Playback
                </span>
                <p className="text-[11px] text-slate-400">Re-listen to your pitch & defense audio to evaluate pacing and pronunciation</p>
              </div>
            </div>

            <audio
              ref={audioPlayerRef}
              src={recordedAudioUrl}
              onEnded={() => setIsPlayingAudio(false)}
              controls
              className="h-8 max-w-[280px]"
            />
          </div>
        )}

        {/* Adversarial Interruption Alert Box */}
        {interruptionQuestion && (
          <div className="bg-rose-950/40 border-2 border-rose-500/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{selectedPersona.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    Board Director Interruption!
                  </span>
                  <span className="text-[10px] text-slate-400">Audio Probing Active</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{selectedPersona.name} ({selectedPersona.title})</h4>
                <p className="text-sm font-medium text-slate-200 mt-2 bg-slate-950/70 p-3 rounded-xl border border-rose-900/50 italic">
                  "{interruptionQuestion}"
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">Student Task:</span>
                  <span className="text-xs text-slate-300">Defend your position using Diplomatic Pushback (Acknowledge → Pivot → Caveat).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Conversation Stream & Transcript */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Dialogue Stream</h4>
            <span className="text-[10px] text-slate-400">Real-time Speech-to-Text & Audio Simulation</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[140px] max-h-[220px] overflow-y-auto space-y-3 text-sm">
            {turns.length === 0 && !transcript && (
              <p className="text-xs text-slate-400 text-center py-8 italic">
                Press "Start Boardroom Brief" and speak into your microphone, or type below to simulate your presentation.
              </p>
            )}

            {turns.map((t, i) => (
              <div key={i} className={`p-3 rounded-xl border text-xs ${
                t.speaker.includes('Student')
                  ? 'bg-cyan-950/30 border-cyan-800/40 text-cyan-100 ml-6'
                  : 'bg-rose-950/30 border-rose-800/40 text-rose-100 mr-6'
              }`}>
                <span className="font-bold text-[10px] uppercase block mb-1 opacity-80">{t.speaker}</span>
                {t.text}
              </div>
            ))}

            {transcript && (
              <div className="bg-slate-900 border border-slate-700/60 p-3 rounded-xl text-slate-200 text-xs">
                <span className="font-bold text-[10px] uppercase text-cyan-400 block mb-1">Live Audio Stream</span>
                {transcript}
              </div>
            )}
          </div>

          {/* Text/Audio Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendManualSpeech()}
              placeholder={sessionPhase === 'defending' ? 'Type or speak your diplomatic defense response...' : 'Type or speak your ADB project pitch...'}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSendManualSpeech}
              className="bg-cyan-600 hover:bg-cyan-500 text-white p-2.5 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Framework Scaffold Teleprompter */}
        <SpeakingFrameworkScaffold activeFramework={selectedScenario.suggestedFramework} />
      </div>

      {/* RRP Document Upload & Scenario Parser Modal */}
      {showRRPModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                Upload & Parse Real ADB Board Paper (RRP)
              </h3>
              <button
                onClick={() => setShowRRPModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Select Text / RRP File (.txt, .md, .pdf text):</label>
                <input
                  type="file"
                  onChange={handleParseRRPFile}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Or Paste ADB President's Report (RRP) Text Directly:</label>
                <textarea
                  value={rrpDocumentText}
                  onChange={(e) => setRrpDocumentText(e.target.value)}
                  placeholder="Paste section of ADB RRP report (containing project title, loan amount, EIRR, DSCR, risk factors)..."
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowRRPModal(false)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-400 font-bold px-4 py-2 rounded-xl border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessParsedRRP}
                  disabled={!rrpDocumentText.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold px-5 py-2 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  Generate AI Scenario Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
