import sys

with open("/Users/ezrajosephsaracho/Downloads/Ielts-Focus-Lab-Personalized.html", "r") as f:
    content = f.read()

# Fix the duplicate/extra closing bracket around updateDashboardUI
fixed_js = """    function updateDashboardUI() {
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
            <div class="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden my-3 border border-slate-700/50">
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
            <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
              <div class="h-full rounded-full transition-all duration-500 ${item.score < 50 ? 'bg-rose-500' : item.score < 70 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${Math.max(item.score, 4)}%"></div>
            </div>
            <p class="text-xs text-slate-400 font-semibold">${item.category} Module</p>
          </div>
        `).join("");
      }
    }"""

import re
content = re.sub(r"function updateDashboardUI\(\)\s*\{.*?\n    \}", fixed_js, content, flags=re.DOTALL)

with open("/Users/ezrajosephsaracho/Downloads/Ielts-Focus-Lab-Personalized.html", "w") as f:
    f.write(content)

print("SYNTAX_FIXED_SUCCESSFULLY")
