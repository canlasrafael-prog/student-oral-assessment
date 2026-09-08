// SM-2 Spaced Repetition System (SRS) Service for MDB Lexicon Mastery

const SRS_STORAGE_KEY = 'finspeak_adb_srs_data';

/**
 * SM-2 Algorithm Implementation
 * Quality Rating: 0 (Blackout) -> 5 (Perfect Recall)
 */
export function calculateSM2(quality, repetitions = 0, interval = 1, easeFactor = 2.5) {
  let q = Math.max(0, Math.min(5, quality));
  let newRepetitions = repetitions;
  let newInterval = interval;
  let newEaseFactor = easeFactor;

  if (q >= 3) {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  newEaseFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    interval: newInterval,
    easeFactor: Number(newEaseFactor.toFixed(2)),
    nextReviewDate: nextReview.toISOString(),
    masteryStatus: newRepetitions >= 4 ? 'Mastered' : newRepetitions > 0 ? 'Learning' : 'New'
  };
}

export const srsEngine = {
  getSRSData() {
    try {
      const data = localStorage.getItem(SRS_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  recordReview(termId, quality) {
    try {
      const allData = this.getSRSData();
      const current = allData[termId] || { repetitions: 0, interval: 1, easeFactor: 2.5 };
      const updated = calculateSM2(quality, current.repetitions, current.interval, current.easeFactor);
      
      allData[termId] = {
        termId,
        lastReviewed: new Date().toISOString(),
        ...updated
      };
      
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(allData));
      return allData[termId];
    } catch (e) {
      console.warn('SRS update error:', e);
      return null;
    }
  },

  getDueReviewItems(allTerms) {
    const srsData = this.getSRSData();
    const now = new Date();

    return allTerms.filter(term => {
      const itemSRS = srsData[term.id];
      if (!itemSRS) return true; // New items needing initial review
      return new Date(itemSRS.nextReviewDate) <= now;
    });
  },

  getStats(allTerms) {
    const srsData = this.getSRSData();
    let newCount = 0;
    let learningCount = 0;
    let masteredCount = 0;

    allTerms.forEach(term => {
      const item = srsData[term.id];
      if (!item || item.masteryStatus === 'New') newCount++;
      else if (item.masteryStatus === 'Learning') learningCount++;
      else if (item.masteryStatus === 'Mastered') masteredCount++;
    });

    return { newCount, learningCount, masteredCount, total: allTerms.length };
  }
};
