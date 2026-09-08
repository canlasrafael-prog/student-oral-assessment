// Collocation & Transformation Sprints for MDB Executive Fluency (30+ Rewrite Quizzes & Drills)

export const REWRITE_DRILLS = [
  // --- DEBT & SOVEREIGN DISTRESS ---
  {
    id: 'rew-001',
    category: 'Debt & Fiscal Distress',
    casualText: "We checked the budget and they can't pay back the loan.",
    koreanHint: '한국인 피훈련자가 흔히 말하는 "They have no money to pay"를 MDB 정식 외채 지속가능성 평가 언어로 승화시키세요.',
    modelAnswer: "Our due diligence indicates severe sovereign debt distress and impaired debt servicing capacity.",
    options: [
      "Our due diligence indicates severe sovereign debt distress and impaired debt servicing capacity.",
      "They checked the bank account and cannot afford interest.",
      "The country budget is bad so they will default next week.",
      "We gave them a discount on the loan."
    ],
    keyTerms: ["due diligence", "sovereign debt distress", "debt servicing capacity"],
    audioPrompt: "Convert this casual brief into an ADB Board statement: 'We checked the budget and they can't pay back the loan.'"
  },
  {
    id: 'rew-002',
    category: 'Debt & Fiscal Distress',
    casualText: "The country is broke and wants a break on paying interest for a few years.",
    koreanHint: '"Broke" $\\rightarrow$ "experiencing sovereign insolvency", "wants a break" $\\rightarrow$ "requested a time-bound debt moratorium and restructuring".',
    modelAnswer: "The sovereign borrower has formally requested a time-bound debt moratorium and debt service restructuring.",
    options: [
      "The sovereign borrower has formally requested a time-bound debt moratorium and debt service restructuring.",
      "The government has no cash so they want free interest.",
      "They asked us to delay payment until next year.",
      "We will forgive 50% of the loan."
    ],
    keyTerms: ["sovereign borrower", "debt moratorium", "debt service restructuring"],
    audioPrompt: "Rewrite executive: 'The country is broke and wants a break on paying interest for a few years.'"
  },
  {
    id: 'rew-003',
    category: 'Debt & Fiscal Distress',
    casualText: "They owe way too much money compared to what the whole country makes.",
    koreanHint: '"Owe too much money" $\\rightarrow$ "public debt-to-GDP ratio", "what country makes" $\\rightarrow$ "gross domestic product threshold".',
    modelAnswer: "The nation's public debt-to-GDP ratio exceeds sustainable debt distress thresholds under our joint DSA framework.",
    options: [
      "The nation's public debt-to-GDP ratio exceeds sustainable debt distress thresholds under our joint DSA framework.",
      "The country owes more money than its GDP.",
      "The government borrowed too much from foreign banks.",
      "Their debt is very big."
    ],
    keyTerms: ["debt-to-GDP ratio", "debt distress thresholds", "DSA framework"],
    audioPrompt: "Upgrade phrasing: 'They owe way too much money compared to what the whole country makes.'"
  },

  // --- PROCUREMENT & OPERATIONS ---
  {
    id: 'rew-004',
    category: 'Procurement & Delays',
    casualText: "The local office is moving really slow with picking the construction company.",
    koreanHint: '"Moving really slow" 대신 "systemic procurement bottlenecks", "Selecting construction company" 대신 "contract award under ICB guidelines"를 사용하세요.',
    modelAnswer: "The Executing Agency is experiencing systemic procurement bottlenecks in finalizing contract awards.",
    options: [
      "The Executing Agency is experiencing systemic procurement bottlenecks in finalizing contract awards.",
      "The local office is slow to choose a builder.",
      "The procurement team is behind schedule.",
      "Contractors are waiting for a decision."
    ],
    keyTerms: ["Executing Agency", "procurement bottlenecks", "contract awards"],
    audioPrompt: "Express professionally: 'The local office is moving really slow with picking the construction company.'"
  },
  {
    id: 'rew-005',
    category: 'Procurement & Delays',
    casualText: "The builder wants more money because steel and cement got expensive.",
    koreanHint: '"Builder wants more money" $\\rightarrow$ "EPC contractor filed a price adjustment claim", "materials got expensive" $\\rightarrow$ "exogenous commodity price escalation".',
    modelAnswer: "The EPC contractor has submitted a price adjustment claim attributable to exogenous commodity price escalation.",
    options: [
      "The EPC contractor has submitted a price adjustment claim attributable to exogenous commodity price escalation.",
      "The contractor asked for extra cash for steel.",
      "Materials got expensive so building cost went up.",
      "We need to pay more for cement."
    ],
    keyTerms: ["EPC contractor", "price adjustment claim", "commodity price escalation"],
    audioPrompt: "Executive wording for: 'The builder wants more money because steel and cement got expensive.'"
  },
  {
    id: 'rew-006',
    category: 'Procurement & Delays',
    casualText: "They didn't finish building the power lines on time.",
    koreanHint: '"Didn\'t finish on time" $\\rightarrow$ "civil works implementation experienced a timetable slippage".',
    modelAnswer: "Transmission line civil works implementation has encountered a 4-month timetable slippage.",
    options: [
      "Transmission line civil works implementation has encountered a 4-month timetable slippage.",
      "The power line project is late.",
      "They missed the deadline by 4 months.",
      "Building lines took longer than expected."
    ],
    keyTerms: ["civil works", "implementation", "timetable slippage"],
    audioPrompt: "Convert to MDB register: 'They didn't finish building the power lines on time.'"
  },

  // --- CO-FINANCING & PRIVATE CAPITAL ---
  {
    id: 'rew-007',
    category: 'Co-financing & Private Money',
    casualText: "We got other commercial banks to put money in so we don't take all the risk.",
    koreanHint: '"Put money in" $\\rightarrow$ "mobilize commercial liquidity", "don\'t take all risk" $\\rightarrow$ "mitigate single-lender credit exposure via blended risk-sharing".',
    modelAnswer: "We successfully executed co-financing mobilization with commercial banks to mitigate single-lender risk exposure.",
    options: [
      "We successfully executed co-financing mobilization with commercial banks to mitigate single-lender risk exposure.",
      "Other banks put money in to share the risk.",
      "We invited private banks to join the deal.",
      "ADB shared the risk with local banks."
    ],
    keyTerms: ["co-financing mobilization", "mitigate risk exposure", "commercial liquidity"],
    audioPrompt: "Executive rewrite for: 'We got other commercial banks to put money in so we don't take all the risk.'"
  },
  {
    id: 'rew-008',
    category: 'Co-financing & Private Money',
    casualText: "Private banks are scared of poor countries so we put our money first to protect them.",
    koreanHint: '"Private banks are scared" $\\rightarrow$ "commercial lenders exhibit risk aversion", "put our money first" $\\rightarrow$ "first-loss concessional tranche de-risks the asset class".',
    modelAnswer: "Commercial lenders exhibit risk aversion toward frontier markets; our first-loss concessional tranche de-risks the asset class and crowds in institutional liquidity.",
    options: [
      "Commercial lenders exhibit risk aversion toward frontier markets; our first-loss concessional tranche de-risks the asset class and crowds in institutional liquidity.",
      "Private banks don't like poor countries so ADB takes first risk.",
      "We absorb losses so private banks feel safe.",
      "We gave a guarantee to commercial banks."
    ],
    keyTerms: ["risk aversion", "first-loss concessional tranche", "crowds in liquidity"],
    audioPrompt: "Upgrade phrasing: 'Private banks are scared of poor countries so we put our money first to protect them.'"
  },

  // --- GOVERNMENT PROMISES & COVENANTS ---
  {
    id: 'rew-009',
    category: 'Government Promises & Covenants',
    casualText: "The government promised they will follow our environmental rules.",
    koreanHint: '"Promised" $\\rightarrow$ "executed a legally binding loan covenant", "follow environmental rules" $\\rightarrow$ "enforce strict environmental safeguard compliance".',
    modelAnswer: "The borrowing nation has covenanted to enforce strict adherence to ADB environmental safeguard frameworks.",
    options: [
      "The borrowing nation has covenanted to enforce strict adherence to ADB environmental safeguard frameworks.",
      "The government promised to follow environmental rules.",
      "They agreed to respect green laws.",
      "We signed a paper about nature protection."
    ],
    keyTerms: ["covenanted", "adherence", "environmental safeguard frameworks"],
    audioPrompt: "Transform into executive wording: 'The government promised they will follow our environmental rules.'"
  },
  {
    id: 'rew-010',
    category: 'Government Promises & Covenants',
    casualText: "They broke the contract rule about keeping enough cash in the bank to pay debt.",
    koreanHint: '"Broke the contract rule" $\\rightarrow$ "breached the financial covenant", "keeping enough cash" $\\rightarrow "Debt Service Coverage Ratio (DSCR) requirement".',
    modelAnswer: "The borrower has breached the Debt Service Coverage Ratio (DSCR) loan covenant specified in Section 4.02.",
    options: [
      "The borrower has breached the Debt Service Coverage Ratio (DSCR) loan covenant specified in Section 4.02.",
      "They broke the rule about bank cash.",
      "The company failed the DSCR test.",
      "They didn't save enough money for repayment."
    ],
    keyTerms: ["breached", "Debt Service Coverage Ratio", "loan covenant"],
    audioPrompt: "Convert to Board statement: 'They broke the contract rule about keeping enough cash in the bank to pay debt.'"
  },

  // --- CURRENCY & EXCHANGE RATE SHOCKS ---
  {
    id: 'rew-011',
    category: 'Currency & Exchange Rate Shock',
    casualText: "The local money dropped hard so the project costs way more in dollars now.",
    koreanHint: '"Local money dropped hard" $\\rightarrow$ "sharp local currency devaluation / foreign exchange volatility", "costs more" $\\rightarrow$ "induced severe cost overruns".',
    modelAnswer: "Acute local currency devaluation has generated substantial foreign exchange risk and unhedged cost overruns.",
    options: [
      "Acute local currency devaluation has generated substantial foreign exchange risk and unhedged cost overruns.",
      "Local money dropped so dollar price went up.",
      "Exchange rate devaluation made the project expensive.",
      "Currency drop caused a budget gap."
    ],
    keyTerms: ["currency devaluation", "foreign exchange risk", "unhedged cost overruns"],
    audioPrompt: "Speak the executive version: 'The local money dropped hard so the project costs way more in dollars now.'"
  },
  {
    id: 'rew-012',
    category: 'Currency & Exchange Rate Shock',
    casualText: "The central bank ran out of US dollars to pay back foreign loans.",
    koreanHint: '"Ran out of dollars" $\\rightarrow$ "experiencing severe foreign exchange illiquidity and transfer-and-convertibility constraints".',
    modelAnswer: "The central bank is experiencing acute foreign exchange illiquidity and transfer-and-convertibility constraints.",
    options: [
      "The central bank is experiencing acute foreign exchange illiquidity and transfer-and-convertibility constraints.",
      "The central bank has no dollars left for repayment.",
      "Dollar reserves are empty in the country.",
      "Foreign exchange is blocked by the bank."
    ],
    keyTerms: ["foreign exchange illiquidity", "transfer-and-convertibility constraints"],
    audioPrompt: "Executive rewrite for: 'The central bank ran out of US dollars to pay back foreign loans.'"
  },

  // --- POLICY LOANS & REFORMS ---
  {
    id: 'rew-013',
    category: 'Policy Loans & Reforms',
    casualText: "We give them money in chunks whenever they fix a law.",
    koreanHint: '"Money in chunks" $\\rightarrow$ "tranche disbursements", "fix a law" $\\rightarrow$ "fulfill policy matrix structural conditionalities".',
    modelAnswer: "Tranche disbursements under this policy-based loan are contingent upon verified fulfillment of structural conditionalities.",
    options: [
      "Tranche disbursements under this policy-based loan are contingent upon verified fulfillment of structural conditionalities.",
      "We send money in chunks when they pass laws.",
      "Policy money is given after legal reform.",
      "Disbursement happens when conditions are met."
    ],
    keyTerms: ["tranche disbursements", "policy-based loan", "structural conditionalities"],
    audioPrompt: "Convert to executive MDB phrasing: 'We give them money in chunks whenever they fix a law.'"
  },
  {
    id: 'rew-014',
    category: 'Policy Loans & Reforms',
    casualText: "The government promised to stop stealing tax money and fix public budget records.",
    koreanHint: '"Stop stealing tax money" $\\rightarrow$ "strengthen fiduciary PFM architecture and digitized audit controls".',
    modelAnswer: "The government has covenanted to modernize national Public Financial Management (PFM) architecture and enforce digitized audit controls.",
    options: [
      "The government has covenanted to modernize national Public Financial Management (PFM) architecture and enforce digitized audit controls.",
      "The government promised to stop stealing tax money.",
      "They will fix public accounting software.",
      "PFM reform will stop budget corruption."
    ],
    keyTerms: ["covenanted", "Public Financial Management (PFM)", "digitized audit controls"],
    audioPrompt: "Upgrade register: 'The government promised to stop stealing tax money and fix public budget records.'"
  },

  // --- MATCHING FUNDS & BUDGETS ---
  {
    id: 'rew-015',
    category: 'Matching Funds & Budget',
    casualText: "The local government forgot to put their part of the budget into the project.",
    koreanHint: '"Forgot to put their part" $\\rightarrow$ "failed to allocate timely counterpart funding", "project" $\\rightarrow$ "project implementation schedule".',
    modelAnswer: "Project delivery has encountered friction due to a temporary shortfall in government counterpart funding.",
    options: [
      "Project delivery has encountered friction due to a temporary shortfall in government counterpart funding.",
      "The local government didn't pay their matching funds.",
      "Counterpart budget is missing from the local ministry.",
      "The project slowed down without local money."
    ],
    keyTerms: ["shortfall", "counterpart funding", "project delivery"],
    audioPrompt: "Upgrade this statement: 'The local government forgot to put their part of the budget into the project.'"
  },
  {
    id: 'rew-016',
    category: 'Matching Funds & Budget',
    casualText: "We need to check where all the project money went.",
    koreanHint: '"Check where money went" $\\rightarrow$ "conduct a comprehensive fiduciary financial management appraisal".',
    modelAnswer: "We are initiating an independent fiduciary audit and financial management appraisal.",
    options: [
      "We are initiating an independent fiduciary audit and financial management appraisal.",
      "We need to check where all the money went.",
      "We will audit the project bank account.",
      "Checking spending records for corruption."
    ],
    keyTerms: ["fiduciary audit", "financial management appraisal"],
    audioPrompt: "Executive phrasing: 'We need to check where all the project money went.'"
  },

  // --- RISK MITIGATION & DISASTERS ---
  {
    id: 'rew-017',
    category: 'Risk Mitigation',
    casualText: "We made a backup safety net in case a hurricane ruins the power plant.",
    koreanHint: '"Backup safety net" $\\rightarrow$ "contingent risk-mitigation facility", "hurricane ruins power plant" $\\rightarrow$ "catastrophic exogenous climate shock".',
    modelAnswer: "We structured a contingent disaster risk facility to buffer the asset against exogenous climate shocks.",
    options: [
      "We structured a contingent disaster risk facility to buffer the asset against exogenous climate shocks.",
      "We made a safety net for hurricane damage.",
      "Disaster facility will fix the power plant if ruined.",
      "Emergency money is ready for bad storms."
    ],
    keyTerms: ["contingent risk facility", "buffer the asset", "exogenous climate shocks"],
    audioPrompt: "Rewrite for executive presentation: 'We made a backup safety net in case a hurricane ruins the power plant.'"
  },
  {
    id: 'rew-018',
    category: 'Risk Mitigation',
    casualText: "When a big typhoon hits, satellite data gives them instant cash automatically.",
    koreanHint: '"Satellite data gives instant cash" $\\rightarrow$ "upon satellite verification of parametric threshold breaches, automated liquidity is released".',
    modelAnswer: "Upon satellite verification of parametric threshold breaches, the facility triggers automated liquidity release.",
    options: [
      "Upon satellite verification of parametric threshold breaches, the facility triggers automated liquidity release.",
      "Typhoon satellite data gives them instant cash automatically.",
      "Parametric storm data pays out emergency money.",
      "Automatic cash sends when hurricane hits."
    ],
    keyTerms: ["parametric threshold breaches", "automated liquidity release"],
    audioPrompt: "Convert to executive Board phrasing: 'When a big typhoon hits, satellite data gives them instant cash automatically.'"
  }
];

export const COLLOCATION_MATCHES = [
  { id: 'col-01', verb: 'Mobilize', correctNoun: 'Co-financing', options: ['Co-financing', 'Covenant Waiver', 'Exogenous Shock', 'Grace Period'], tip: 'Mobilize + Co-financing / Private Capital' },
  { id: 'col-02', verb: 'Grant a', correctNoun: 'Covenant Waiver', options: ['Covenant Waiver', 'Sensitivity Analysis', 'Yield Spread', 'Taxonomy'], tip: 'Grant a + Covenant Waiver / Grace Period' },
  { id: 'col-03', verb: 'Mitigate', correctNoun: 'Exogenous Shocks', options: ['Exogenous Shocks', 'Procurement Package', 'Fiduciary Duty', 'Executing Agency'], tip: 'Mitigate + Exogenous Shocks / Foreign Exchange Risk' },
  { id: 'col-04', verb: 'Execute a', correctNoun: 'Sovereign Guarantee', options: ['Sovereign Guarantee', 'Debt Distress', 'Counterpart Shortfall', 'Procurement Delay'], tip: 'Execute a + Sovereign Guarantee / Counter-Indemnity' },
  { id: 'col-05', verb: 'De-risk', correctNoun: 'Private Investments', options: ['Private Investments', 'Auditing Matrix', 'Tranche Release', 'Grace Period'], tip: 'De-risk + Private Investments / Commercial Tranche' },
  { id: 'col-06', verb: 'Disburse the', correctNoun: 'Second Tranche', options: ['Second Tranche', 'Yield Curve', 'Land Title', 'Sovereign Risk'], tip: 'Disburse the + Second Tranche / Loan Facility' },
  { id: 'col-07', verb: 'Conduct a', correctNoun: 'Sensitivity Analysis', options: ['Sensitivity Analysis', 'Blended Finance', 'Loan Covenant', 'Public Procurement'], tip: 'Conduct a + Sensitivity Analysis / Safeguard Audit' },
  { id: 'col-08', verb: 'Crowd in', correctNoun: 'Commercial Capital', options: ['Commercial Capital', 'Executing Agency', 'Disbursement Milestone', 'Debt Ceiling'], tip: 'Crowd in + Commercial Capital / Institutional Liquidity' },
  { id: 'col-09', verb: 'Uphold', correctNoun: 'Fiduciary Duty', options: ['Fiduciary Duty', 'Yield Spread', 'Procurement Bottleneck', 'Grace Terms'], tip: 'Uphold + Fiduciary Duty / Procurement Integrity' },
  { id: 'col-10', verb: 'Suffer from', correctNoun: 'Debt Distress', options: ['Debt Distress', 'Sovereign Guarantee', 'Co-financing', 'Policy Matrix'], tip: 'Suffer from + Debt Distress / Fiscal Shortfall' }
];
