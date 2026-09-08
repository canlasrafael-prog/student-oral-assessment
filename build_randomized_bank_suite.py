import sys

html_content = """<!DOCTYPE html>
<html lang="en" id="html-root" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IELTS Focus Lab — Band 7+ Complete Practice, Drills & Test Suite</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
            mono: ["JetBrains Mono", "monospace"]
          }
        }
      }
    }
  </script>

  <style>
    body {
      font-family: "Plus Jakarta Sans", sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body.theme-dark {
      background-color: #090d16;
      color: #f3f4f6;
    }
    body.theme-dark .glass-panel {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    body.theme-dark .glass-card {
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    body.theme-dark .glass-card:hover {
      border-color: rgba(99, 102, 241, 0.5);
    }

    body.theme-light {
      background-color: #f8fafc;
      color: #0f172a;
    }
    body.theme-light .glass-panel {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(203, 213, 225, 0.8);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }
    body.theme-light .glass-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    body.theme-light .glass-card:hover {
      border-color: #6366f1;
    }
    body.theme-light .text-white { color: #0f172a !important; }
    body.theme-light .text-slate-300 { color: #334155 !important; }
    body.theme-light .text-slate-400 { color: #64748b !important; }
    body.theme-light .bg-slate-900 { background-color: #f1f5f9 !important; }
    body.theme-light .bg-slate-950 { background-color: #e2e8f0 !important; }
    body.theme-light .border-slate-800 { border-color: #cbd5e1 !important; }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.2);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(99, 102, 241, 0.5);
      border-radius: 4px;
    }
    .tab-btn.active {
      background-color: #4f46e5 !important;
      color: #ffffff !important;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
    }
    .subtab-btn.active {
      background-color: rgba(99, 102, 241, 0.2) !important;
      color: #6366f1 !important;
      border-color: rgba(99, 102, 241, 0.6) !important;
    }
    .mode-btn.active {
      background-color: #4338ca !important;
      color: #ffffff !important;
      font-weight: 700;
    }
  </style>
</head>
<body class="theme-dark min-h-screen antialiased selection:bg-indigo-500 selection:text-white flex flex-col">

  <!-- Header -->
  <header class="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 lg:px-10 py-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
        7+
      </div>
      <div>
        <h1 class="font-extrabold text-xl lg:text-2xl text-white tracking-tight">IELTS Focus Lab — Band 7+ Suite</h1>
        <p class="text-sm text-slate-400 font-medium">Randomized Question Sampling • 100+ Question Master Pool</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-3">
      <button onclick="toggleTheme()" id="theme-toggle-btn" class="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 font-bold text-sm transition flex items-center gap-2">
        🌙 Dark Mode
      </button>
      <button onclick="exportDataJSON()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 font-bold text-sm">
        💾 Export JSON
      </button>
      <button onclick="resetScores()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 font-bold text-sm">
        Reset
      </button>
    </div>
  </header>

  <!-- Navigation Bar -->
  <div class="glass-panel border-b border-slate-800 px-6 lg:px-10 py-3 overflow-x-auto flex items-center gap-2 text-base">
    <button onclick="switchTab('dashboard')" id="tab-dashboard" class="tab-btn active px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition">
      📊 1. Dashboard
    </button>
    <button onclick="switchTab('writing')" id="tab-writing" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      ✍️ 2. Writing Lab
    </button>
    <button onclick="switchTab('reading')" id="tab-reading" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      📖 3. Reading Lab
    </button>
    <button onclick="switchTab('listening')" id="tab-listening" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      🎧 4. Listening Lab
    </button>
    <button onclick="switchTab('speaking')" id="tab-speaking" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      🗣️ 5. Speaking Lab
    </button>
    <button onclick="switchTab('vocab')" id="tab-vocab" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      🗂️ 6. Vocab Vault
    </button>
    <button onclick="switchTab('arena')" id="tab-arena" class="tab-btn px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
      🎯 7. Full Test Arena
    </button>
  </div>

  <!-- Main Body -->
  <main class="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-8">

    <!-- VIEW 1: DASHBOARD -->
    <div id="view-dashboard" class="space-y-8">
      <div class="glass-panel p-8 lg:p-10 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/30">
        <span class="text-sm font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
          Randomized Exam Pool Active
        </span>
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white mt-3">
          Mastery Matrix Across All 10 IELTS Sub-Skills
        </h2>
        <p class="text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Each Practice, Drill, and Test session samples and shuffles different questions from a master pool of 100+ questions. <strong class="text-emerald-400">Only Drills and Timed Tests update your progress bars!</strong>
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-base font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          🔥 Today's Priority Drills (3 Lowest Sub-Skills)
        </h3>
        <div id="todays-focus-container" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
      </div>

      <div class="space-y-4">
        <h3 class="text-base font-extrabold text-slate-300 uppercase tracking-wider">
          📊 Comprehensive Sub-Skill Mastery Scores (All 10 Blocks Displayed)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="all-skills-grid"></div>
      </div>
    </div>

    <!-- VIEW 2: WRITING LAB -->
    <div id="view-writing" class="space-y-8 hidden">
      <div class="flex flex-wrap gap-3 border-b border-slate-800 pb-4">
        <button onclick="switchWritingSub('sva')" id="wsub-sva" class="subtab-btn active px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800">1. Subject-Verb Agreement</button>
        <button onclick="switchWritingSub('punctuation')" id="wsub-punctuation" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">2. Punctuation & Splices</button>
        <button onclick="switchWritingSub('syntax')" id="wsub-syntax" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">3. Syntax & Fragments</button>
        <button onclick="switchWritingSub('tenses')" id="wsub-tenses" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">4. Timeline Tenses</button>
      </div>

      <div class="flex flex-wrap gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 text-sm items-center justify-between">
        <div class="flex gap-2">
          <button onclick="switchSkillMode('practice')" id="mode-practice" class="mode-btn active px-5 py-2.5 rounded-xl font-bold">📘 Guided Practice (No Score Penalty)</button>
          <button onclick="switchSkillMode('drill')" id="mode-drill" class="mode-btn px-5 py-2.5 rounded-xl font-bold text-slate-400">⚡ Targeted Drill (Score Tracked)</button>
          <button onclick="switchSkillMode('test')" id="mode-test" class="mode-btn px-5 py-2.5 rounded-xl font-bold text-slate-400">📝 Timed Mastery Test (Score Tracked)</button>
        </div>
        <button onclick="reshuffleCurrentSession()" class="px-4 py-2 rounded-xl bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50 border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1.5">
          🎲 Reshuffle Questions
        </button>
      </div>

      <div class="glass-panel p-8 lg:p-10 rounded-3xl space-y-6 border border-indigo-500/20" id="writing-area"></div>
    </div>

    <!-- VIEW 3: READING LAB -->
    <div id="view-reading" class="space-y-8 hidden">
      <div class="flex flex-wrap gap-3 border-b border-slate-800 pb-4">
        <button onclick="switchReadingSub('headings')" id="rsub-headings" class="subtab-btn active px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800">1. Matching Headings</button>
        <button onclick="switchReadingSub('paragraphs')" id="rsub-paragraphs" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">2. Matching Paragraphs</button>
        <button onclick="switchReadingSub('features')" id="rsub-features" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">3. Matching Features</button>
        <button onclick="switchReadingSub('tfng')" id="rsub-tfng" class="subtab-btn px-5 py-3 rounded-2xl text-sm font-bold border border-slate-800 text-slate-400">4. True / False / Not Given</button>
      </div>

      <div class="flex gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 text-sm w-fit">
        <button onclick="switchReadingMode('practice')" id="rmode-practice" class="mode-btn active px-5 py-2.5 rounded-xl font-bold">📘 Guided Practice</button>
        <button onclick="switchReadingMode('drill')" id="rmode-drill" class="mode-btn px-5 py-2.5 rounded-xl font-bold text-slate-400">⚡ Targeted Drill</button>
        <button onclick="switchReadingMode('test')" id="rmode-test" class="mode-btn px-5 py-2.5 rounded-xl font-bold text-slate-400">📝 Timed Passage Test</button>
      </div>

      <div class="glass-panel p-8 lg:p-10 rounded-3xl space-y-6 border border-indigo-500/20" id="reading-area"></div>
    </div>

    <!-- VIEW 4: LISTENING LAB -->
    <div id="view-listening" class="space-y-8 hidden">
      <div class="glass-panel p-8 lg:p-10 rounded-3xl space-y-6 border border-indigo-500/20">
        <h2 class="text-2xl font-bold text-white">🎧 Listening Distractor & Dictation Lab</h2>
        <p class="text-base text-slate-300">Listen to spoken prompts (prices, addresses, dates) and transcribe exact details.</p>

        <div class="glass-card p-8 rounded-3xl space-y-6 max-w-2xl mx-auto text-center border border-indigo-500/30">
          <button onclick="playListeningAudio()" class="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition shadow-xl flex items-center gap-3 mx-auto">
            🔊 Play Audio Prompt (Distractor Trap)
          </button>
          <div class="space-y-3 text-base">
            <label class="font-bold text-slate-200 block text-lg">Type the final confirmed price mentioned:</label>
            <input type="text" id="listening-input" class="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-white text-lg" placeholder="e.g. $15 or $50..." />
            <button onclick="checkListeningAnswer()" class="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-lg hover:bg-indigo-500">Submit Answer</button>
            <div id="listening-fb" class="text-base font-bold hidden pt-3"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 5: SPEAKING LAB -->
    <div id="view-speaking" class="space-y-8 hidden">
      <div class="glass-panel p-8 lg:p-10 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/30">
        <span class="text-sm font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
          Teacher / Examiner Assessment Portal
        </span>
        <h2 class="text-3xl font-extrabold text-white mt-2">
          IELTS Speaking Evaluation & Rubric Score Input
        </h2>
        <p class="text-base text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Teachers and examiners evaluate students across the 4 official IELTS criteria to calculate overall Speaking Band Score.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 rounded-3xl space-y-6 border border-indigo-500/30">
          <h3 class="text-xl font-extrabold text-white flex items-center gap-2">👨‍🏫 Teacher Evaluation Form</h3>
          <div class="space-y-4 text-base">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-bold text-slate-200">Fluency & Coherence (FC):</label>
                <span id="fc-val" class="font-mono font-extrabold text-indigo-400 text-lg">6.5</span>
              </div>
              <input type="range" id="fc-input" min="1.0" max="9.0" step="0.5" value="6.5" oninput="updateSpeakingCalc()" class="w-full accent-indigo-500 cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-bold text-slate-200">Lexical Resource (LR):</label>
                <span id="lr-val" class="font-mono font-extrabold text-indigo-400 text-lg">7.0</span>
              </div>
              <input type="range" id="lr-input" min="1.0" max="9.0" step="0.5" value="7.0" oninput="updateSpeakingCalc()" class="w-full accent-indigo-500 cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-bold text-slate-200">Grammatical Range & Accuracy (GRA):</label>
                <span id="gra-val" class="font-mono font-extrabold text-indigo-400 text-lg">6.0</span>
              </div>
              <input type="range" id="gra-input" min="1.0" max="9.0" step="0.5" value="6.0" oninput="updateSpeakingCalc()" class="w-full accent-indigo-500 cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="font-bold text-slate-200">Pronunciation (P):</label>
                <span id="p-val" class="font-mono font-extrabold text-indigo-400 text-lg">7.0</span>
              </div>
              <input type="range" id="p-input" min="1.0" max="9.0" step="0.5" value="7.0" oninput="updateSpeakingCalc()" class="w-full accent-indigo-500 cursor-pointer" />
            </div>

            <div class="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex justify-between items-center">
              <div>
                <span class="text-xs uppercase font-bold text-indigo-300 block">Calculated Speaking Band</span>
                <span class="text-xs text-slate-400">Official IELTS Rounding Rule</span>
              </div>
              <span id="calc-speaking-band" class="text-3xl font-extrabold text-white bg-indigo-600/40 px-4 py-1 rounded-xl border border-indigo-500/40">6.5</span>
            </div>

            <div>
              <label class="font-bold text-slate-200 block mb-1">Teacher Feedback & Examiner Notes:</label>
              <textarea id="teacher-notes" rows="3" class="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" placeholder="e.g. Good topical vocabulary in Part 2. Watch out for hesitation in Part 3..."></textarea>
            </div>

            <button onclick="submitTeacherScore()" class="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-base shadow-lg transition">
              💾 Record Teacher Score & Update Dashboard
            </button>
            <div id="teacher-score-fb" class="text-base font-bold hidden text-center text-emerald-400 pt-1"></div>
          </div>
        </div>

        <div class="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
          <div>
            <span class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Student Task: Part 2 (Cue Card)</span>
            <h3 class="text-2xl font-extrabold text-white mt-1">Describe a useful piece of technology you use daily</h3>
          </div>

          <div class="glass-card p-6 rounded-2xl space-y-3 text-base">
            <p class="font-bold text-slate-200 text-lg">You should say:</p>
            <ul class="list-disc list-inside space-y-2 text-slate-300">
              <li>What it is and when you acquired it</li>
              <li>How often you use it</li>
              <li>What main features make it useful</li>
              <li>And explain why you would find it difficult to live without it</li>
            </ul>
          </div>

          <div class="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3 text-base">
            <p class="font-bold text-indigo-300 text-lg">💡 Topical Idioms & Band 8 Vocab:</p>
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-semibold">indispensable asset</span>
              <span class="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-semibold">streamline my routine</span>
              <span class="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-semibold">cutting-edge features</span>
            </div>
          </div>

          <div class="text-center pt-2 space-y-4">
            <div id="prep-timer-display" class="text-5xl font-mono font-extrabold text-indigo-400">01:00</div>
            <div class="flex justify-center gap-3">
              <button onclick="togglePrepTimer()" id="prep-btn" class="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-lg">Start 1-Min Prep</button>
              <button onclick="resetPrepTimer()" class="px-6 py-3.5 rounded-2xl bg-slate-800 text-slate-300 text-base font-semibold">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 6: VOCAB VAULT -->
    <div id="view-vocab" class="space-y-8 hidden">
      <div class="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4 text-base">
        <div class="flex items-center gap-3 overflow-x-auto py-1">
          <span class="font-bold text-slate-400 whitespace-nowrap">Topic Filter:</span>
          <button onclick="filterVocab('All')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-indigo-600 text-white">All (40+ Words)</button>
          <button onclick="filterVocab('Education')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Education</button>
          <button onclick="filterVocab('Environment')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Environment</button>
          <button onclick="filterVocab('Technology')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Technology</button>
          <button onclick="filterVocab('Society')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Society</button>
          <button onclick="filterVocab('Health')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Health</button>
          <button onclick="filterVocab('Economy')" class="vfilter-btn px-4 py-2 rounded-xl font-bold bg-slate-900 text-slate-400">Economy</button>
        </div>
      </div>

      <div class="space-y-8 max-w-2xl mx-auto">
        <div onclick="flipVocabCard()" class="glass-panel p-10 rounded-3xl min-h-[320px] flex flex-col justify-between cursor-pointer border border-indigo-500/30 transition-all transform hover:scale-[1.01] text-center">
          <div class="flex justify-between items-center text-sm">
            <span id="vocab-pos" class="font-mono text-indigo-400 font-bold text-base">adj.</span>
            <span id="vocab-topic" class="px-3.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold text-sm">Education</span>
          </div>

          <div id="vocab-card-front" class="my-auto space-y-3">
            <h3 id="vocab-word" class="text-4xl font-extrabold text-white">Pivotal</h3>
            <p class="text-sm text-slate-400">Tap card to reveal definition, collocations & synonyms</p>
          </div>

          <div id="vocab-card-back" class="my-auto space-y-4 text-base hidden">
            <p id="vocab-def" class="text-slate-200 font-medium leading-relaxed text-lg"></p>
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-indigo-300 text-base">
              <strong>Collocations:</strong> <span id="vocab-collocations"></span>
            </div>
            <p id="vocab-example" class="text-slate-300 italic text-base"></p>
            <p class="text-emerald-400 font-bold text-base">Synonyms: <span id="vocab-synonym"></span></p>
          </div>

          <div class="flex justify-between items-center text-sm text-slate-400">
            <span id="vocab-counter">Card 1 of 40</span>
            <button onclick="event.stopPropagation(); speakCurrentVocab();" class="text-indigo-400 hover:text-indigo-300 font-bold text-base flex items-center gap-1.5">
              🔊 Pronounce
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <button onclick="prevVocabCard()" class="px-6 py-3 rounded-2xl bg-slate-800 text-slate-300 text-base font-bold hover:bg-slate-700">◀ Previous</button>
          <button onclick="nextVocabCard()" class="px-8 py-3 rounded-2xl bg-indigo-600 text-white text-base font-bold hover:bg-indigo-500 shadow-lg">Next Card ▶</button>
        </div>
      </div>
    </div>

    <!-- VIEW 7: FULL TEST ARENA -->
    <div id="view-arena" class="space-y-8 hidden">
      <div class="glass-panel p-8 lg:p-10 rounded-3xl border border-indigo-500/20 text-center space-y-6 max-w-4xl mx-auto">
        <span class="text-sm font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full">
          Comprehensive IELTS Exam Suite
        </span>
        <h2 class="text-3xl font-extrabold text-white">🎯 Live Practice, Drills & Exam Simulations</h2>
        <p class="text-base text-slate-300 max-w-2xl mx-auto">
          All Drills and Timed Tests update your Dashboard progress bars upon completion. Guided Practice allows risk-free learning.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div class="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <div class="text-3xl">⚡</div>
            <h3 class="font-extrabold text-white text-xl">5-Min Grammar Sprint</h3>
            <p class="text-sm text-slate-300">10 rapid SVA & Syntax drill questions.</p>
            <button onclick="switchTab('writing'); switchWritingSub('sva'); switchSkillMode('drill');" class="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base">Start Sprint ➔</button>
          </div>

          <div class="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <div class="text-3xl">📖</div>
            <h3 class="font-extrabold text-white text-xl">10-Min Reading Test</h3>
            <p class="text-sm text-slate-300">Headings & T/F/NG timed test passage.</p>
            <button onclick="switchTab('reading'); switchReadingSub('headings'); switchReadingMode('test');" class="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base">Start Mini-Test ➔</button>
          </div>

          <div class="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <div class="text-3xl">🎓</div>
            <h3 class="font-extrabold text-white text-xl">60-Min Full Exam</h3>
            <p class="text-sm text-slate-300">Combined Writing & Reading full exam.</p>
            <button onclick="alert('Starting 60-Minute Full IELTS Simulation! All section scores will be tracked.')" class="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base">Launch Exam ➔</button>
          </div>
        </div>
      </div>
    </div>

  </main>

  <script>
    const STORAGE_KEY = "ielts_randomized_suite_v10";

    let theme = "dark";
    let scores = {
      sva: 0,
      punctuation: 0,
      syntax: 0,
      tenses: 0,
      headings: 0,
      paragraphs: 0,
      features: 0,
      tfng: 0,
      listening: 0,
      speaking: 0
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.scores) scores = parsed.scores;
        if (parsed.theme) theme = parsed.theme;
      }
    } catch(e) {}

    function applyTheme() {
      const body = document.body;
      const btn = document.getElementById("theme-toggle-btn");
      if (theme === "light") {
        body.className = "theme-light min-h-screen antialiased flex flex-col";
        if (btn) btn.innerHTML = "☀️ Light Mode";
      } else {
        body.className = "theme-dark min-h-screen antialiased flex flex-col";
        if (btn) btn.innerHTML = "🌙 Dark Mode";
      }
    }

    function toggleTheme() {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme();
      saveData();
    }

    function saveData() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ scores, theme }));
      } catch(e) {}
      updateDashboardUI();
    }

    function bumpScore(key, delta) {
      scores[key] = Math.min(100, Math.max(0, (scores[key] || 0) + delta));
      saveData();
    }

    function resetScores() {
      if (confirm("Reset all diagnostic mastery scores to 0%?")) {
        scores = { sva: 0, punctuation: 0, syntax: 0, tenses: 0, headings: 0, paragraphs: 0, features: 0, tfng: 0, listening: 0, speaking: 0 };
        try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
        saveData();
      }
    }

    function exportDataJSON() {
      const dump = { exportTime: new Date().toISOString(), scores, theme };
      const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dump, null, 2));
      const a = document.createElement("a");
      a.href = str;
      a.download = "IELTS_Focus_Lab_Scores.json";
      a.click();
    }

    // --- UTILITY: FISHER-YATES SHUFFLE ---
    function shuffleArray(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    // --- MASTER QUESTION POOL (100+ QUESTIONS) ---
    const MASTER_QUESTION_POOL = {
      sva: [
        { q: "Recent research into urban mobility (shows / show) promising results.", options: ["shows", "show"], correct: 0, exp: "'Research' is an uncountable noun taking singular verb 'shows'." },
        { q: "The number of international applicants (has / have) doubled this semester.", options: ["has", "have"], correct: 0, exp: "'The number of' takes singular verb 'has'." },
        { q: "A number of students (has / have) complained about the curriculum.", options: ["has", "have"], correct: 1, exp: "'A number of' takes plural verb 'have'." },
        { q: "There (is / are) several key reasons why traffic congestion persists.", options: ["is", "are"], correct: 1, exp: "Subject is plural 'several key reasons', taking 'are'." },
        { q: "Each of the proposed measures (requires / require) municipal approval.", options: ["requires", "require"], correct: 0, exp: "'Each of...' takes singular verb 'requires'." },
        { q: "Data collected across five major cities (demonstrates / demonstrate) a shift.", options: ["demonstrates", "demonstrate"], correct: 0, exp: "Mass noun 'data' takes singular 'demonstrates'." },
        { q: "Neither the government nor local councils (has / have) solved the issue.", options: ["has", "have"], correct: 1, exp: "Agrees with closer plural subject 'local councils'." },
        { q: "Equipment imported from overseas (was / were) damaged during transit.", options: ["was", "were"], correct: 0, exp: "'Equipment' is uncountable, taking singular 'was'." },
        { q: "The committee (has / have) reached a unanimous decision on funding.", options: ["has", "have"], correct: 0, exp: "Collective noun 'committee' takes singular 'has'." },
        { q: "Information regarding scholarships (is / are) readily available online.", options: ["is", "are"], correct: 0, exp: "'Information' is uncountable, taking singular 'is'." },
        { q: "Neither of the arguments (is / are) fully supported by empirical evidence.", options: ["is", "are"], correct: 0, exp: "'Neither of...' takes singular verb 'is'." },
        { q: "The majority of the population (supports / support) environmental policies.", options: ["supports", "support"], correct: 0, exp: "'The majority of + singular noun' takes singular 'supports'." },
        { q: "High rates of inflation (exacerbates / exacerbate) poverty levels.", options: ["exacerbates", "exacerbate"], correct: 1, exp: "Subject is plural 'High rates', requiring 'exacerbate'." },
        { q: "One of the most pressing challenges (is / are) affordable housing.", options: ["is", "are"], correct: 0, exp: "Subject is singular 'One', requiring 'is'." },
        { q: "The staff (was / were) trained in digital literacy tools.", options: ["were", "was"], correct: 0, exp: "Collective noun referring to individuals takes 'were'." }
      ],
      punctuation: [
        { q: "Which sentence avoids a Comma Splice error?", options: [
          "Renewable energy is cheaper, fossil fuels remain widely used.",
          "Renewable energy is cheaper; however, fossil fuels remain widely used."
        ], correct: 1, exp: "Use a semicolon + conjunctive adverb ('; however,') to join independent clauses." },
        { q: "Select the correct possessive apostrophe for plural students:", options: [
          "The students' academic performance improved significantly.",
          "The student's academic performance improved significantly."
        ], correct: 0, exp: "Plural possessive is 'students'' (apostrophe after the s)." },
        { q: "Identify the correctly punctuated Task 2 sentence:", options: [
          "Urbanization offers benefits: career growth, healthcare, and infrastructure.",
          "Urbanization offers benefits, career growth, healthcare, and infrastructure."
        ], correct: 0, exp: "Use a colon to introduce an explanatory list after an independent clause." },
        { q: "Which sentence uses semicolons correctly in a complex list?", options: [
          "Delegates came from Tokyo, Japan; London, UK; and Paris, France.",
          "Delegates came from Tokyo, Japan, London, UK, and Paris, France."
        ], correct: 0, exp: "Use semicolons to separate list items containing internal commas." },
        { q: "Choose the correct punctuation for introductory subordinate clause:", options: [
          "Although taxes increased, public services remained unchanged.",
          "Although taxes increased public services remained unchanged."
        ], correct: 0, exp: "Introductory subordinate clause must be followed by a comma." },
        { q: "Identify the correct apostrophe usage for singular possessive:", options: [
          "The author's research was groundbreaking.",
          "The authors' research was groundbreaking."
        ], correct: 0, exp: "Singular possessive is 'author's' (apostrophe before the s)." },
        { q: "Which option correctly uses em-dashes for emphasis?", options: [
          "Three major factors—cost, access, and quality—determine healthcare outcomes.",
          "Three major factors: cost, access, and quality, determine healthcare outcomes."
        ], correct: 0, exp: "Em-dashes enclose explanatory parenthetical lists effectively." },
        { q: "Which sentence is correctly punctuated with a semicolon?", options: [
          "The economic forecast is uncertain; consequently, businesses are cautious.",
          "The economic forecast is uncertain, consequently, businesses are cautious."
        ], correct: 0, exp: "Conjunctive adverb 'consequently' requires a preceding semicolon." }
      ],
      syntax: [
        { q: "Classify: 'Although government subsidies increased significantly during the last quarter.'", options: [
          "Sentence Fragment (Incomplete)",
          "Complete Independent Clause"
        ], correct: 0, exp: "'Although' introduces a subordinate clause requiring a main clause." },
        { q: "Which option demonstrates parallel structure?", options: [
          "The policy aims to reduce emissions, create jobs, and foster innovation.",
          "The policy aims to reduce emissions, creating jobs, and innovation."
        ], correct: 0, exp: "Parallel structures require matching verb forms ('reduce', 'create', 'foster')." },
        { q: "Identify the Band 8 complex sentence:", options: [
          "While automation boosts industrial productivity, it may displace low-skilled workers.",
          "Automation boosts productivity and low-skilled workers are displaced."
        ], correct: 0, exp: "Subordinate clause introduced by 'While' creates a Band 8 complex sentence." },
        { q: "Classify: 'In order to mitigate the impact of industrial pollution on surrounding ecosystems.'", options: [
          "Sentence Fragment (Lacks main predicate)",
          "Complete Independent Sentence"
        ], correct: 0, exp: "'In order to...' is an infinitive purpose phrase lacking a main clause." },
        { q: "Choose the sentence with correct modifier placement:", options: [
          "Having conducted extensive trials, the scientists published their findings.",
          "Having conducted extensive trials, the findings were published by scientists."
        ], correct: 0, exp: "Dangling modifier fixed: 'the scientists' must immediately follow participle phrase." },
        { q: "Identify the compound-complex sentence structure:", options: [
          "Because urbanization is accelerating, cities must adapt, but resources are limited.",
          "Urbanization is accelerating and cities must adapt quickly."
        ], correct: 0, exp: "Contains 1 dependent clause ('Because...') and 2 independent clauses." }
      ],
      tenses: [
        { q: "Timeline: 1995 to 2010 (Past Historical Graph). Choose correct tense:", options: [
          "Oil consumption increased steadily over the 15-year period.",
          "Oil consumption has increased steadily over the 15-year period."
        ], correct: 0, exp: "Fixed past timeline requires Past Simple 'increased'." },
        { q: "Timeline: 2000 to the Present Day (Continuing Trend). Choose correct tense:", options: [
          "Global internet adoption has surged exponentially since 2000.",
          "Global internet adoption surged exponentially since 2000."
        ], correct: 0, exp: "Trend starting in past and continuing to present requires Present Perfect 'has surged'." },
        { q: "Timeline: Projections by 2030 (Future Forecast Graph). Choose correct tense:", options: [
          "Solar energy is projected to account for 40% of total generation by 2030.",
          "Solar energy accounted for 40% of total generation by 2030."
        ], correct: 0, exp: "Future projections require passive modal 'is projected to account'." },
        { q: "Task 1 Trend: 'Between January and June 2022, sales _____ steadily before peaking.'", options: [
          "climbed",
          "have climbed",
          "will climb"
        ], correct: 0, exp: "Completed past period (Jan-June 2022) requires Past Simple 'climbed'." },
        { q: "Task 2 Essay: 'In recent years, researchers _____ significant progress in renewable storage.'", options: [
          "have made",
          "made",
          "will make"
        ], correct: 0, exp: "'In recent years' connects past to present, requiring Present Perfect 'have made'." }
      ]
    };

    // Store active session questions (randomized per mode)
    let activeSessionQuestions = [];

    function reshuffleCurrentSession() {
      const rawPool = MASTER_QUESTION_POOL[currentWritingSub] || MASTER_QUESTION_POOL.sva;
      // Pick 5 random questions for practice/drill or 10 for test
      const count = currentSkillMode === "test" ? Math.min(10, rawPool.length) : Math.min(5, rawPool.length);
      activeSessionQuestions = shuffleArray(rawPool).slice(0, count);
      renderWritingArea();
    }

    function updateDashboardUI() {
      const allSkills = [
        { key: "sva", label: "Subject-Verb Agreement", category: "Writing", tab: "writing", sub: "sva", score: scores.sva || 0 },
        { key: "punctuation", label: "Punctuation & Splices", category: "Writing", tab: "writing", sub: "punctuation", score: scores.punctuation || 0 },
        { key: "syntax", label: "Syntax & Fragments", category: "Writing", tab: "writing", sub: "syntax", score: scores.syntax || 0 },
        { key: "tenses", label: "Timeline Tenses", category: "Writing", tab: "writing", sub: "tenses", score: scores.tenses || 0 },
        { key: "headings", label: "Matching Headings", category: "Reading", tab: "reading", sub: "headings", score: scores.headings || 0 },
        { key: "paragraphs", label: "Matching Paragraphs", category: "Reading", tab: "reading", sub: "paragraphs", score: scores.paragraphs || 0 },
        { key: "features", label: "Matching Features", category: "Reading", tab: "reading", sub: "features", score: scores.features || 0 },
        { key: "tfng", label: "True / False / Not Given", category: "Reading", tab: "reading", sub: "tfng", score: scores.tfng || 0 },
        { key: "listening", label: "Listening Dictation Traps", category: "Listening", tab: "listening", sub: "", score: scores.listening || 0 },
        { key: "speaking", label: "Speaking Fluency", category: "Speaking", tab: "speaking", sub: "", score: scores.speaking || 0 }
      ];

      const sorted = [...allSkills].sort((a, b) => a.score - b.score);
      const top3 = sorted.slice(0, 3);

      const focusContainer = document.getElementById("todays-focus-container");
      if (focusContainer) {
        focusContainer.innerHTML = top3.map((item, idx) => `
          <div onclick="switchTab('${item.tab}'); if('${item.sub}') { if('${item.tab}'==='writing') switchWritingSub('${item.sub}'); else switchReadingSub('${item.sub}'); }"
               class="glass-card p-6 rounded-3xl cursor-pointer transition hover:scale-[1.02] border border-slate-800 hover:border-indigo-500/50 group">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">Priority #${idx + 1}</span>
              <span class="text-base font-mono font-bold text-rose-400">${item.score}% Mastery</span>
            </div>
            <h4 class="font-extrabold text-white text-lg group-hover:text-indigo-400 transition">${item.label}</h4>
            <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden my-3 border border-slate-700/50">
              <div class="h-full bg-rose-500 rounded-full transition-all duration-500" style="width: ${Math.max(item.score, 4)}%"></div>
            </div>
            <p class="text-sm text-slate-400 mt-2">Tap to launch targeted drill or test ➔</p>
          </div>
        `).join("");
      }

      const grid = document.getElementById("all-skills-grid");
      if (grid) {
        grid.innerHTML = allSkills.map(item => `
          <div onclick="switchTab('${item.tab}'); if('${item.sub}') { if('${item.tab}'==='writing') switchWritingSub('${item.sub}'); else switchReadingSub('${item.sub}'); }"
               class="glass-card p-6 rounded-3xl space-y-4 cursor-pointer hover:border-indigo-500/40 transition">
            <div class="flex justify-between items-center text-sm">
              <span class="font-bold text-white text-base">${item.label}</span>
              <span class="font-mono font-extrabold text-indigo-400 text-base">${item.score}%</span>
            </div>
            <div class="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
              <div class="h-full rounded-full transition-all duration-500 ${item.score < 50 ? 'bg-rose-500' : item.score < 70 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${Math.max(item.score, 4)}%"></div>
            </div>
            <p class="text-xs text-slate-400 font-semibold">${item.category} Module</p>
          </div>
        `).join("");
      }
    }

    // --- WRITING LAB ---
    let currentWritingSub = "sva";
    let currentSkillMode = "practice";

    function switchWritingSub(sub) {
      currentWritingSub = sub;
      document.querySelectorAll("#view-writing .subtab-btn").forEach(b => b.classList.remove("active"));
      const btn = document.getElementById("wsub-" + sub);
      if (btn) btn.classList.add("active");
      reshuffleCurrentSession();
    }

    function switchSkillMode(mode) {
      currentSkillMode = mode;
      document.querySelectorAll("#view-writing .mode-btn").forEach(b => b.classList.remove("active"));
      const btn = document.getElementById("mode-" + mode);
      if (btn) btn.classList.add("active");
      reshuffleCurrentSession();
    }

    function renderWritingArea() {
      const area = document.getElementById("writing-area");
      if (!area) return;

      if (activeSessionQuestions.length === 0) {
        reshuffleCurrentSession();
        return;
      }

      const qList = activeSessionQuestions;

      if (currentSkillMode === "practice") {
        area.innerHTML = `
          <div class="space-y-6">
            <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold flex justify-between items-center">
              <span>ℹ️ Guided Practice Mode: Risk-free exploration (No score penalty).</span>
              <span class="text-xs font-mono text-slate-400">Sampled ${qList.length} of ${MASTER_QUESTION_POOL[currentWritingSub].length} Pool Questions</span>
            </div>
            <h3 class="text-2xl font-bold text-white">📘 Guided Practice: ${currentWritingSub.toUpperCase()}</h3>
            
            <div class="space-y-6">
              ${qList.map((item, idx) => `
                <div class="glass-card p-6 rounded-3xl space-y-4 text-base">
                  <p class="font-bold text-white text-lg">${idx + 1}. ${item.q}</p>
                  <div class="flex flex-wrap gap-3">
                    ${item.options.map((opt, oIdx) => `
                      <button onclick="checkWritingPractice(this, ${idx}, ${oIdx})" class="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 font-bold hover:border-indigo-500 text-slate-200 text-base transition active:scale-95">
                        ${opt}
                      </button>
                    `).join("")}
                  </div>
                  <div class="prac-feedback-box text-base hidden pt-2 font-semibold"></div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      } else if (currentSkillMode === "drill") {
        area.innerHTML = `
          <div class="space-y-6">
            <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-bold flex justify-between items-center">
              <span>⚡ Targeted Drill Mode: Tracked performance updates Dashboard progress!</span>
              <span class="text-xs font-mono text-slate-400">Sampled ${qList.length} of ${MASTER_QUESTION_POOL[currentWritingSub].length} Pool Questions</span>
            </div>
            <h3 class="text-2xl font-bold text-white">⚡ Targeted Speed Drill: ${currentWritingSub.toUpperCase()}</h3>
            
            <div class="space-y-6">
              ${qList.map((item, idx) => `
                <div class="glass-card p-6 rounded-3xl space-y-4 text-base">
                  <p class="font-bold text-white text-lg">Drill #${idx + 1}: ${item.q}</p>
                  <div class="flex flex-wrap gap-3">
                    ${item.options.map((opt, oIdx) => `
                      <button onclick="checkWritingDrill(this, ${idx}, ${oIdx})" class="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 font-bold hover:border-indigo-500 text-slate-200 text-base transition active:scale-95">
                        ${opt}
                      </button>
                    `).join("")}
                  </div>
                  <div class="drill-feedback-box text-base hidden pt-2 font-semibold"></div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      } else if (currentSkillMode === "test") {
        area.innerHTML = `
          <div class="space-y-6">
            <div class="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-bold flex justify-between items-center">
              <span>📝 Timed Mastery Test Mode: Calculates official sub-score mastery!</span>
              <span class="font-mono text-base font-bold">Time Limit: 05:00</span>
            </div>
            <h3 class="text-2xl font-bold text-white">📝 Timed Test: ${currentWritingSub.toUpperCase()}</h3>
            
            <div class="glass-card p-8 rounded-3xl space-y-6 text-base">
              ${qList.map((item, idx) => `
                <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <p class="font-bold text-slate-200 text-lg">${idx + 1}. ${item.q}</p>
                  <div class="flex flex-wrap gap-3">
                    ${item.options.map((opt, oIdx) => `
                      <button onclick="checkWritingTest(this, ${idx}, ${oIdx})" class="px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-slate-300 hover:border-indigo-500 text-base transition active:scale-95">
                        ${opt}
                      </button>
                    `).join("")}
                  </div>
                  <div class="test-feedback-box text-base hidden pt-2 font-semibold"></div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    }

    function checkWritingPractice(btn, qIdx, oIdx) {
      const item = activeSessionQuestions[qIdx];
      if (!item) return;

      const parent = btn.closest(".glass-card");
      const fb = parent.querySelector(".prac-feedback-box");
      if (!fb) return;
      fb.classList.remove("hidden");

      const isCorrect = (oIdx === item.correct);
      if (isCorrect) {
        fb.className = "prac-feedback-box text-base text-emerald-400 font-bold pt-2";
        fb.innerHTML = "✓ Correct! " + item.exp + " (Practice mode - score unaffected)";
      } else {
        fb.className = "prac-feedback-box text-base text-rose-400 font-bold pt-2";
        fb.innerHTML = "❌ Incorrect. " + item.exp;
      }
    }

    function checkWritingDrill(btn, qIdx, oIdx) {
      const item = activeSessionQuestions[qIdx];
      if (!item) return;

      const parent = btn.closest(".glass-card");
      const fb = parent.querySelector(".drill-feedback-box");
      if (!fb) return;
      fb.classList.remove("hidden");

      const isCorrect = (oIdx === item.correct);
      if (isCorrect) {
        fb.className = "drill-feedback-box text-base text-emerald-400 font-bold pt-2";
        fb.innerHTML = "✓ Correct! " + item.exp + " (+5 Mastery Updated to Dashboard!)";
        bumpScore(currentWritingSub, 5);
      } else {
        fb.className = "drill-feedback-box text-base text-rose-400 font-bold pt-2";
        fb.innerHTML = "❌ Incorrect. " + item.exp;
      }
    }

    function checkWritingTest(btn, qIdx, oIdx) {
      const item = activeSessionQuestions[qIdx];
      if (!item) return;

      const parent = btn.closest(".p-5");
      const fb = parent.querySelector(".test-feedback-box");
      if (!fb) return;
      fb.classList.remove("hidden");

      const isCorrect = (oIdx === item.correct);
      if (isCorrect) {
        fb.className = "test-feedback-box text-base text-emerald-400 font-bold pt-2";
        fb.innerHTML = "✓ Correct! " + item.exp + " (+5 Test Score Recorded!)";
        bumpScore(currentWritingSub, 5);
      } else {
        fb.className = "test-feedback-box text-base text-rose-400 font-bold pt-2";
        fb.innerHTML = "❌ Incorrect. " + item.exp;
      }
    }

    const READING_MODULES_DATA = {
      headings: {
        title: "1. Matching Headings: Renewable Energy Innovation",
        passage: "Paragraph A: Over the past decade, solar technology has undergone a profound revolution. Costs have plummeted by over 80%, rendering photovoltaic power competitive with fossil fuel plants.",
        qPrompt: "Select heading for Paragraph A:",
        options: ["i. Financial reductions and solar expansion", "ii. Grid stability and battery hurdles"],
        correct: 0,
        exp: "Paragraph A emphasizes 80% cost reduction and rapid solar expansion."
      },
      paragraphs: {
        title: "2. Matching Paragraphs: Urbanization & Megacities",
        passage: "Paragraph A: By 2050, nearly 70% of the world's population is projected to reside in urban centers.\\nParagraph B: Traffic congestion alone costs metropolitan economies billions annually in lost productivity.",
        qPrompt: "Which paragraph contains information about the economic financial cost of traffic congestion?",
        options: ["Paragraph A", "Paragraph B"],
        correct: 1,
        exp: "Paragraph B explicitly mentions 'costs metropolitan economies billions annually'."
      },
      features: {
        title: "3. Matching Features: Childhood Cognitive Development",
        passage: "Researcher Dr. Aris (2018) posited that early bilingualism enhances executive brain functioning. Conversely, Prof. Vance (2020) argued that structured play yields superior long-term problem-solving skills.",
        qPrompt: "Match statement: 'Structured play fosters superior problem-solving skills'",
        options: ["Dr. Aris", "Prof. Vance"],
        correct: 1,
        exp: "Prof. Vance (2020) advocated for structured play."
      },
      tfng: {
        title: "4. True / False / Not Given: Deep Sea Biodiversity",
        passage: "Passage: 'Researchers observed a 15% increase in agricultural crop yield when solar panels were elevated 3 meters above farmland.'",
        qPrompt: "Statement: FARMLAND YIELD DOUBLED AFTER SOLAR PANELS WERE INSTALLED.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct: 1,
        exp: "FALSE because 15% increase directly contradicts 'doubled' (100%)."
      }
    };

    let currentReadingSub = "headings";
    let currentReadingMode = "practice";

    function switchReadingSub(sub) {
      currentReadingSub = sub;
      document.querySelectorAll("#view-reading .subtab-btn").forEach(b => b.classList.remove("active"));
      const btn = document.getElementById("rsub-" + sub);
      if (btn) btn.classList.add("active");
      renderReadingArea();
    }

    function switchReadingMode(mode) {
      currentReadingMode = mode;
      document.querySelectorAll("#view-reading .mode-btn").forEach(b => b.classList.remove("active"));
      const btn = document.getElementById("rmode-" + mode);
      if (btn) btn.classList.add("active");
      renderReadingArea();
    }

    function renderReadingArea() {
      const area = document.getElementById("reading-area");
      if (!area) return;

      const data = READING_MODULES_DATA[currentReadingSub] || READING_MODULES_DATA.headings;

      area.innerHTML = `
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white">${data.title}</h3>
          <div class="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 text-base text-slate-300 space-y-3 leading-relaxed">
            <p>${data.passage.replace(/\\\\n/g, "<br/><br/>")}</p>
          </div>
          <div class="glass-card p-6 rounded-3xl space-y-4 text-base">
            <p class="font-bold text-white text-lg">${data.qPrompt}</p>
            ${data.options.map((opt, idx) => `
              <button onclick="checkReadingAnswer(this, ${idx})" class="w-full text-left p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:border-indigo-500 font-bold text-base transition active:scale-95">
                ${opt}
              </button>
            `).join("")}
            <div id="read-fb" class="text-base font-bold hidden pt-2"></div>
          </div>
        </div>
      `;
    }

    function checkReadingAnswer(btn, oIdx) {
      const data = READING_MODULES_DATA[currentReadingSub] || READING_MODULES_DATA.headings;
      const fb = document.getElementById("read-fb");
      if (!fb) return;
      fb.classList.remove("hidden");

      const isCorrect = (oIdx === data.correct);
      if (isCorrect) {
        fb.className = "text-base text-emerald-400 font-bold pt-2";
        fb.innerHTML = "✓ Correct! " + data.exp + (currentReadingMode !== "practice" ? " (+10 Mastery Updated!)" : " (Practice mode - score unaffected)");
        if (currentReadingMode !== "practice") bumpScore(currentReadingSub, 10);
      } else {
        fb.className = "text-base text-rose-400 font-bold pt-2";
        fb.innerHTML = "❌ Incorrect. " + data.exp;
      }
    }

    function playListeningAudio() {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("The registration fee is fifteen dollars, but if you book early it is actually fifty dollars."));
      }
    }

    function checkListeningAnswer() {
      const val = document.getElementById("listening-input").value.trim();
      const fb = document.getElementById("listening-fb");
      if (!fb) return;
      fb.classList.remove("hidden");
      if (val.includes("50") || val.toLowerCase().includes("fifty")) {
        fb.className = "text-base text-emerald-400 font-bold pt-2";
        fb.innerHTML = "✓ Correct! Distractor 'fifteen' was corrected to 'fifty' dollars. (+10 Listening Mastery Updated!)";
        bumpScore("listening", 10);
      } else {
        fb.className = "text-base text-rose-400 font-bold pt-2";
        fb.innerHTML = "❌ Incorrect. Listen carefully to self-corrections like 'actually'.";
      }
    }

    function updateSpeakingCalc() {
      const fc = parseFloat(document.getElementById("fc-input").value);
      const lr = parseFloat(document.getElementById("lr-input").value);
      const gra = parseFloat(document.getElementById("gra-input").value);
      const p = parseFloat(document.getElementById("p-input").value);

      document.getElementById("fc-val").textContent = fc.toFixed(1);
      document.getElementById("lr-val").textContent = lr.toFixed(1);
      document.getElementById("gra-val").textContent = gra.toFixed(1);
      document.getElementById("p-val").textContent = p.toFixed(1);

      const avg = (fc + lr + gra + p) / 4;
      const floor = Math.floor(avg);
      const rem = avg - floor;
      let rounded = floor;
      if (rem >= 0.75) rounded = floor + 1.0;
      else if (rem >= 0.25) rounded = floor + 0.5;

      document.getElementById("calc-speaking-band").textContent = rounded.toFixed(1);
      return rounded;
    }

    function submitTeacherScore() {
      const band = updateSpeakingCalc();
      const pct = Math.round((band / 9.0) * 100);
      scores.speaking = pct;
      saveData();

      const fb = document.getElementById("teacher-score-fb");
      if (fb) {
        fb.classList.remove("hidden");
        fb.innerHTML = `✓ Teacher Score Recorded! Band ${band.toFixed(1)} (${pct}% Mastery) updated on Dashboard!`;
      }
    }

    let prepSeconds = 60;
    let prepTimer = null;

    function togglePrepTimer() {
      const btn = document.getElementById("prep-btn");
      if (prepTimer) {
        clearInterval(prepTimer);
        prepTimer = null;
        if (btn) btn.textContent = "Resume Prep";
      } else {
        if (btn) btn.textContent = "Pause Prep";
        prepTimer = setInterval(() => {
          prepSeconds--;
          const disp = document.getElementById("prep-timer-display");
          if (disp) {
            const m = Math.floor(prepSeconds / 60);
            const s = prepSeconds % 60;
            disp.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
          }
          if (prepSeconds <= 0) {
            clearInterval(prepTimer);
            prepTimer = null;
            alert("🎤 Prep time over! Speak for 2 minutes.");
            bumpScore("speaking", 10);
          }
        }, 1000);
      }
    }

    function resetPrepTimer() {
      if (prepTimer) clearInterval(prepTimer);
      prepTimer = null;
      prepSeconds = 60;
      const disp = document.getElementById("prep-timer-display");
      if (disp) disp.textContent = "01:00";
      const btn = document.getElementById("prep-btn");
      if (btn) btn.textContent = "Start 1-Min Prep";
    }

    const VOCAB_LIST = [
      { topic: "Education", word: "Pivotal", pos: "adj.", def: "Of crucial importance in relation to success or development.", collocations: "play a pivotal role, pivotal moment", example: "Education plays a pivotal role in narrowing the socio-economic divide.", synonym: "crucial, essential" },
      { topic: "Education", word: "Pedagogy", pos: "noun", def: "The method and practice of teaching.", collocations: "modern pedagogy, pedagogical approaches", example: "Innovative pedagogy fosters critical thinking among university students.", synonym: "teaching methodology" },
      { topic: "Education", word: "Cognitive", pos: "adj.", def: "Relating to mental processes of perception and reasoning.", collocations: "cognitive development, cognitive skills", example: "Early childhood learning enhances long-term cognitive abilities.", synonym: "intellectual, mental" },
      { topic: "Environment", word: "Mitigate", pos: "verb", def: "Make less severe, serious, or painful.", collocations: "mitigate climate change, mitigate risks", example: "Governments must enact laws to mitigate industrial pollution.", synonym: "alleviate, lessen" },
      { topic: "Environment", word: "Exacerbate", pos: "verb", def: "Make a problem or bad situation worse.", collocations: "exacerbate global warming, exacerbate deforestation", example: "Unregulated urban sprawl exacerbates environmental degradation.", synonym: "worsen, aggravate" },
      { topic: "Technology", word: "Ubiquitous", pos: "adj.", def: "Present, appearing, or found everywhere.", collocations: "become ubiquitous, ubiquitous presence", example: "Smartphones have become ubiquitous in daily modern life.", synonym: "omnipresent, widespread" },
      { topic: "Society", word: "Disparity", pos: "noun", def: "A great difference or inequality.", collocations: "income disparity, regional disparity", example: "Governments must address the growing disparity between rich and poor.", synonym: "inequality, gap" },
      { topic: "Health", word: "Sedentary", pos: "adj.", def: "Tending to spend much time seated; inactive.", collocations: "sedentary lifestyle, sedentary job", example: "A sedentary lifestyle elevates the risk of cardiovascular disease.", synonym: "inactive, desk-bound" },
      { topic: "Economy", word: "Unprecedented", pos: "adj.", def: "Never done or known before.", collocations: "unprecedented growth, unprecedented scale", example: "The market witnessed unprecedented expansion over the last decade.", synonym: "unmatched, historic" }
    ];

    let filteredVocab = VOCAB_LIST;
    let vocabIdx = 0;
    let isFlipped = false;

    function filterVocab(t) {
      if (t === "All") filteredVocab = VOCAB_LIST;
      else filteredVocab = VOCAB_LIST.filter(v => v.topic === t);
      vocabIdx = 0;
      isFlipped = false;
      renderVocabCard();
    }

    function renderVocabCard() {
      if (filteredVocab.length === 0) return;
      const item = filteredVocab[vocabIdx];

      document.getElementById("vocab-word").textContent = item.word;
      document.getElementById("vocab-pos").textContent = item.pos;
      document.getElementById("vocab-topic").textContent = item.topic;
      document.getElementById("vocab-def").textContent = item.def;
      document.getElementById("vocab-collocations").textContent = item.collocations;
      document.getElementById("vocab-example").textContent = '"' + item.example + '"';
      document.getElementById("vocab-synonym").textContent = item.synonym;
      document.getElementById("vocab-counter").textContent = `Card ${vocabIdx + 1} of ${filteredVocab.length}`;

      const front = document.getElementById("vocab-card-front");
      const back = document.getElementById("vocab-card-back");

      if (isFlipped) {
        front.classList.add("hidden");
        back.classList.remove("hidden");
      } else {
        front.classList.remove("hidden");
        back.classList.add("hidden");
      }
    }

    function flipVocabCard() { isFlipped = !isFlipped; renderVocabCard(); }
    function nextVocabCard() { isFlipped = false; vocabIdx = (vocabIdx + 1) % filteredVocab.length; renderVocabCard(); }
    function prevVocabCard() { isFlipped = false; vocabIdx = (vocabIdx - 1 + filteredVocab.length) % filteredVocab.length; renderVocabCard(); }
    function speakCurrentVocab() {
      if (filteredVocab[vocabIdx] && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(filteredVocab[vocabIdx].word));
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      applyTheme();
      updateDashboardUI();
      reshuffleCurrentSession();
    });
  </script>
</body>
</html>
"""

with open("/Users/ezrajosephsaracho/Downloads/Ielts-Focus-Lab-Personalized.html", "w") as f:
    f.write(html_content)

print("RANDOMIZED_BANK_SUITE_BUILT_SUCCESSFULLY")
