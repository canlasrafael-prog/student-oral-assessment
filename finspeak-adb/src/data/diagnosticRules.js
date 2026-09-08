// Diagnostic Rules & Analysis Engine for Korean L1 Speech, Phonetics & MDB Lexical Density

export const KOREAN_PHONETIC_PATTERNS = [
  {
    id: 'phon-v-b',
    category: '/v/ → /b/ Shift',
    pattern: /\b(bovereign|baiver|enbiromental|biability|conbenient)\b/i,
    targetSound: '/v/ vs /b/',
    explanation: 'Korean has no native /v/ sound, causing speakers to substitute /b/ (e.g. "bovereign" instead of "sovereign", "biability" instead of "viability").',
    coachingTip: 'Place upper teeth gently on lower lip and vibrate vocal cords to produce friction for /v/.'
  },
  {
    id: 'phon-f-p',
    category: '/f/ → /p/ Shift',
    pattern: /\b(pacility|pinancing|piduciary|pirst|pund)\b/i,
    targetSound: '/f/ vs /p/',
    explanation: 'Korean lacks /f/, causing native speakers to use unvoiced bilabial /p/ (e.g. "pacility" instead of "facility", "pinancing" instead of "financing").',
    coachingTip: 'Touch upper teeth to lower lip without closing lips completely to allow air flow for /f/.'
  },
  {
    id: 'phon-z-j',
    category: '/z/ → /dʒ/ Shift',
    pattern: /\b(amortisasion|organisasion|prioritise|zero)\b/i,
    targetSound: '/z/ vs /dʒ/',
    explanation: 'Korean substitutes the affricate ㅈ /dʒ/ for /z/ (e.g. "amorti-jation" instead of "amorti-zation").',
    coachingTip: 'Keep tongue tip behind teeth and continuously vibrate air for /z/.'
  },
  {
    id: 'phon-r-l',
    category: '/r/ vs /l/ Distinction',
    pattern: /\b(beveraged|repaymel|blended|liabiliry)\b/i,
    targetSound: '/r/ vs /l/',
    explanation: 'Korean liquid consonant ㄹ (rieul) varies between /r/ and /l/ depending on position, causing swap in financial terms like "leveraged" vs "repayment".',
    coachingTip: 'For /l/, press tongue tip firmly against alveolar ridge. For /r/, curl tongue tip backward without touching the roof of the mouth.'
  }
];

export const MDB_SYLLABLE_STRESS_GUIDES = [
  { term: 'Concessionality', stress: 'con-ces-sion-AL-i-ty', audioNote: 'Primary stress on 4th syllable -AL-' },
  { term: 'Fiduciary', stress: 'fi-DU-ci-ar-y', audioNote: 'Primary stress on 2nd syllable -DU-' },
  { term: 'Exogenous', stress: 'ex-OG-e-nous', audioNote: 'Primary stress on 2nd syllable -OG-' },
  { term: 'Amortization', stress: 'am-or-ti-ZA-tion', audioNote: 'Primary stress on 4th syllable -ZA-' },
  { term: 'Sovereignty', stress: 'SOV-er-eign-ty', audioNote: 'Primary stress on 1st syllable SOV-' },
  { term: 'Procurement', stress: 'pro-CURE-ment', audioNote: 'Primary stress on 2nd syllable -CURE-' },
  { term: 'De-risking', stress: 'DE-risk-ing', audioNote: 'Primary stress on prefix DE-' },
  { term: 'Conditionality', stress: 'con-di-tion-AL-i-ty', audioNote: 'Primary stress on 4th syllable -AL-' }
];

export const KOREAN_L1_PATTERNS = [
  {
    id: 'prep-01',
    category: 'Redundant Preposition',
    pattern: /\b(discuss about|explain to the director that|emphasize on|mention about|participate at)\b/i,
    explanation: 'Common Korean L1 transfer error. "Discuss", "mention", and "emphasize" are transitive verbs taking direct objects in English.',
    fix: 'Remove redundant preposition (e.g., "discuss the facility" instead of "discuss about the facility").',
    badge: 'Grammar Precision'
  },
  {
    id: 'prep-02',
    category: 'Missing Preposition',
    pattern: /\b(explain the director|listen the report|comply the rule|approve of loan)\b/i,
    explanation: 'Missing preposition after verbs requiring prepositions (e.g. "explain to someone", "comply with").',
    fix: 'Add required preposition (e.g., "explain to the Board", "comply with safeguards").',
    badge: 'Preposition Alignment'
  },
  {
    id: 'art-01',
    category: 'Article Omission',
    pattern: /\b(project is delayed|borrower will submit|loan covenant was broken|country faces crisis)\b/i,
    explanation: 'Korean has no grammatical articles. Korean native speakers frequently omit definite articles before specific institutional nouns.',
    fix: 'Insert definite article "the" or demonstrative "this" (e.g., "the project is delayed", "the loan covenant was breached").',
    badge: 'Article Precision'
  },
  {
    id: 'verb-01',
    category: 'Casual Verb Choice',
    pattern: /\b(can't pay|check the budget|get money|promised|make sure|moving slow|bad things)\b/i,
    explanation: 'Using low-register everyday English verbs instead of high-register MDB terminology.',
    fix: 'Replace with executive equivalents: "experience debt distress", "conduct fiduciary appraisal", "mobilize capital", "covenanted", "guarantee compliance".',
    badge: 'Executive Register'
  },
  {
    id: 'hedg-01',
    category: 'Excessive Hesitation / Indirectness',
    pattern: /\b(maybe we can|it seems like|kind of hard|sort of delayed|I guess government|probably will try)\b/i,
    explanation: 'Excessive indirect hedging damages executive authority in Boardroom Q&A. MDB Board members expect crisp assertions.',
    fix: 'Use assertive diplomatic hedging: "Our sensitivity analysis demonstrates...", "Our risk mitigation structure guarantees..."',
    badge: 'Diplomatic Stance'
  }
];

export const MDB_KEYWORDS = [
  'concessional', 'sovereign', 'blended finance', 'counterpart funding', 'debt servicing',
  'co-financing', 'tranche', 'disbursement', 'procurement', 'covenant', 'appraisal',
  'executing agency', 'debt distress', 'sensitivity analysis', 'exogenous', 'spread',
  'policy-based', 'conditionality', 'fiduciary', 'public financial management', 'pfm',
  'dscr', 'eirr', 'firr', 'wacc', 'safeguard', 'resettlement', 'taxonomy', 'de-risk',
  'crowd in', 'amortization', 'parliamentary', 'sofr', 'npl', 'liquidity', 'counter-indemnity'
];

/**
 * Analyzes student transcript for Korean L1 errors, phonetics, lexical density, and executive phrasing upgrades.
 */
export function analyzeSpeech(transcriptText) {
  if (!transcriptText || transcriptText.trim().length < 5) {
    return {
      lexicalDensityScore: 0,
      totalWords: 0,
      mdbWordCount: 0,
      l1Issues: [],
      phoneticIssues: [],
      phoneticScore: 92,
      frameworkScore: { prep: 40, scr: 30, hedging: 50, stare: 45 },
      executiveUpgrade: {
        original: "No speech detected yet.",
        upgraded: "Deliver your 1-2 minute pitch to receive live diagnostic analysis.",
        keyChanges: []
      }
    };
  }

  const words = transcriptText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  // Calculate MDB vocabulary density
  let mdbMatchCount = 0;
  MDB_KEYWORDS.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    const matches = transcriptText.match(regex);
    if (matches) mdbMatchCount += matches.length;
  });

  const rawDensity = totalWords > 0 ? (mdbMatchCount / totalWords) * 100 : 0;
  const lexicalDensityScore = Math.min(98, Math.max(25, Math.round(rawDensity * 12 + 35)));

  // Find L1 Grammar Issues
  const l1Issues = [];
  KOREAN_L1_PATTERNS.forEach(rule => {
    const match = transcriptText.match(rule.pattern);
    if (match) {
      l1Issues.push({
        id: rule.id,
        category: rule.category,
        detectedText: match[0],
        explanation: rule.explanation,
        fix: rule.fix,
        badge: rule.badge
      });
    }
  });

  // Find Korean Phonetic Shift Issues
  const phoneticIssues = [];
  KOREAN_PHONETIC_PATTERNS.forEach(phon => {
    const match = transcriptText.match(phon.pattern);
    if (match) {
      phoneticIssues.push({
        id: phon.id,
        category: phon.category,
        detectedText: match[0],
        targetSound: phon.targetSound,
        explanation: phon.explanation,
        coachingTip: phon.coachingTip
      });
    }
  });

  const phoneticScore = Math.max(65, 100 - (phoneticIssues.length * 10));

  // Calculate Framework Scores
  const hasPoint = /point|firstly|core objective|fundamentally|our proposal|position/i.test(transcriptText);
  const hasReason = /because|owing to|given that|rationale|due to|driven by/i.test(transcriptText);
  const hasExample = /for example|specifically|data shows|metrics|eirr|dscr|percent|million/i.test(transcriptText);
  const hasHedging = /while|acknowledge|pivot|nevertheless|mitigate|however/i.test(transcriptText);

  const prepScore = (hasPoint ? 25 : 5) + (hasReason ? 25 : 5) + (hasExample ? 35 : 10) + (totalWords > 40 ? 15 : 5);
  const scrScore = (hasPoint ? 30 : 10) + (hasReason ? 35 : 10) + (hasExample ? 35 : 10);
  const hedgingScore = (hasHedging ? 50 : 20) + (mdbMatchCount > 2 ? 40 : 15) + 10;

  // Executive Upgrade Transcripts
  let upgradedText = transcriptText;
  const keyChanges = [];

  const rewrites = [
    { from: /\bdiscuss about\b/gi, to: 'evaluate', change: 'Removed redundant preposition ("discuss about" → "evaluate")' },
    { from: /\bcan't pay\b/gi, to: 'exhibits severe sovereign debt distress', change: 'Upgraded register ("can\'t pay" → "exhibits severe sovereign debt distress")' },
    { from: /\bcheck the budget\b/gi, to: 'conduct a fiduciary PFM assessment', change: 'Upgraded term ("check budget" → "conduct fiduciary PFM assessment")' },
    { from: /\bget money\b/gi, to: 'mobilize commercial co-financing liquidity', change: 'Upgraded term ("get money" → "mobilize co-financing liquidity")' },
    { from: /\bmoving slow\b/gi, to: 'experiencing procurement bottlenecks', change: 'Upgraded phrasing ("moving slow" → "experiencing procurement bottlenecks")' },
    { from: /\bpromised\b/gi, to: 'executed binding loan covenants', change: 'Upgraded contract term ("promised" → "executed binding loan covenants")' },
    { from: /\bproject is delayed\b/gi, to: 'the project implementation timetable has experienced a delay', change: 'Fixed article drop & low register' }
  ];

  rewrites.forEach(rw => {
    if (rw.from.test(upgradedText)) {
      upgradedText = upgradedText.replace(rw.from, rw.to);
      keyChanges.push(rw.change);
    }
  });

  if (keyChanges.length === 0) {
    keyChanges.push('Polished diplomatic tone and reinforced MDB terminology precision.');
    upgradedText = `Our preliminary appraisal confirms that ${transcriptText.replace(/I think/gi, 'our analysis indicates')}. Furthermore, we have integrated strict fiduciary safeguards to guarantee full alignment with ADB standards.`;
  }

  return {
    lexicalDensityScore,
    totalWords,
    mdbWordCount: mdbMatchCount,
    l1Issues,
    phoneticIssues,
    phoneticScore,
    frameworkScore: {
      prep: Math.min(98, prepScore),
      scr: Math.min(98, scrScore),
      hedging: Math.min(98, hedgingScore),
      stare: Math.min(98, Math.round((prepScore + scrScore) / 2))
    },
    executiveUpgrade: {
      original: transcriptText,
      upgraded: upgradedText,
      keyChanges
    }
  };
}
