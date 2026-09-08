import sys

with open("/Users/ezrajosephsaracho/Downloads/Ielts-Focus-Lab-Personalized.html", "r") as f:
    content = f.read()

import re

# Rewrite renderWritingArea, renderReadingArea and handlers with clean index lookup
new_js_logic = """
    function renderWritingArea() {
      const area = document.getElementById("writing-area");
      if (!area) return;

      const qList = WRITING_QUESTIONS[currentWritingSub] || WRITING_QUESTIONS.sva;

      if (currentSkillMode === "practice") {
        area.innerHTML = `
          <div class="space-y-6">
            <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold">
              ℹ️ Guided Practice Mode: Learn risk-free! Practice attempts do NOT lower or change your mastery score.
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
            <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-bold">
              ⚡ Targeted Drill Mode: Scores ARE tracked and update your Dashboard progress bars upon correct answer!
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
              <span>📝 Timed Mastery Test Mode: Results calculate official sub-score mastery!</span>
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
      const qList = WRITING_QUESTIONS[currentWritingSub] || WRITING_QUESTIONS.sva;
      const item = qList[qIdx];
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
      const qList = WRITING_QUESTIONS[currentWritingSub] || WRITING_QUESTIONS.sva;
      const item = qList[qIdx];
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
      const qList = WRITING_QUESTIONS[currentWritingSub] || WRITING_QUESTIONS.sva;
      const item = qList[qIdx];
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
"""

# Replace renderWritingArea down to checkReadingAnswer with clean JS
pattern = r"function renderWritingArea\(\)\s*\{.*?function checkReadingAnswer\(.*?\)\s*\{.*?\}"
content = re.sub(pattern, new_js_logic.strip(), content, flags=re.DOTALL)

with open("/Users/ezrajosephsaracho/Downloads/Ielts-Focus-Lab-Personalized.html", "w") as f:
    f.write(content)

print("CLEAN_CLICK_HANDLERS_APPLIED")
