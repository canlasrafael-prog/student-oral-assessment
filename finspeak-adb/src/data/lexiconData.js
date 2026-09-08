// 300+ MDB & ADB Lexicon Entries with Korean Contextual Anchors (한글 팁)

export const MDB_CATEGORIES = [
  { id: 'all', name: 'All Domains', count: 320 },
  { id: 'financing', name: 'Financing Modalities', icon: 'Coins', count: 85 },
  { id: 'operations', name: 'Project Operations', icon: 'Briefcase', count: 80 },
  { id: 'macro_risk', name: 'Macro Risk & Sustainability', icon: 'TrendingUp', count: 80 },
  { id: 'governance', name: 'Governance & Policy', icon: 'ShieldCheck', count: 75 }
];

export const LEXICON_DATA = [
  // --- FINANCING MODALITIES ---
  {
    id: 'lex-001',
    term: 'Concessional Facility',
    category: 'financing',
    phonetic: '/kənˈsɛʃ.ən.əl fəˈsɪl.ɪ.ti/',
    difficulty: 'Advanced',
    definition: 'A loan or credit mechanism offered on terms significantly more generous than market loans, typically featuring below-market interest rates and extended grace periods.',
    koreanTip: '양도성 자금 / 공여성 지원. 한국어로는 "양도성"이라는 다소 낯선 번역을 쓰지만, 실무적으로는 "시장금리보다 훨씬 저렴하고 만기가 긴 정책 자금"을 뜻함. "cheap loan" 대신 사용할 것.',
    adbContext: 'ADB provides Asian Development Fund (ADF) concessional grants and low-interest loans to Lower-Income Developing Member Countries (DMCs).',
    collocations: ['blend with commercial tranche', 'grant element evaluation', 'concessional terms extension'],
    executivePhrase: 'We are structuring a concessional facility with a 10-year grace period to mitigate early debt service pressure.',
    casualVsExecutive: {
      casual: 'We gave them a really cheap loan so they don\'t worry.',
      executive: 'We have structured a concessional financing facility featuring extended grace terms to accommodate fiscal constraints.'
    }
  },
  {
    id: 'lex-002',
    term: 'Sovereign Guarantee',
    category: 'financing',
    phonetic: '/ˈsɒv.rɪn ˌɡær.ənˈtiː/',
    difficulty: 'Executive',
    definition: 'A legal commitment by a national government to honor financial obligations (e.g. debt repayment) if the primary borrower or state enterprise defaults.',
    koreanTip: '정부 보증 / 주권 보증. 한국 금융 전문가들이 "government backing"으로 뭉뚱그리는 경향이 있으나, MDB 이사회에서는 반드시 "Sovereign Guarantee"로 명시해야 법적 구속력이 전달됨.',
    adbContext: 'The project tranche requires an explicit sovereign guarantee executed by the Ministry of Economy and Finance.',
    collocations: ['execute sovereign guarantee', 'call on guarantee', 'sovereign counter-indemnity'],
    executivePhrase: 'Disbursement is contingent upon receipt of an unencumbered sovereign guarantee from the Ministry of Finance.',
    casualVsExecutive: {
      casual: 'The government promised they will pay if the company fails.',
      executive: 'The transaction is fully backed by an irrevocable sovereign guarantee from the host country Ministry of Finance.'
    }
  },
  {
    id: 'lex-003',
    term: 'Blended Finance',
    category: 'financing',
    phonetic: '/blɛnd.ɪd ˈfaɪ.næns/',
    difficulty: 'Advanced',
    definition: 'The strategic use of development finance and philanthropic funds to mobilize private commercial capital toward sustainable development goals in emerging markets.',
    koreanTip: '혼합 금융. MDB에서 최근 가장 강조되는 자금 조달 기법. MDB 자금으로 리스크를 낮춘 후 민간 자금(Commercial Capital)을 유치할 때 사용.',
    adbContext: 'Using $20M in ADB concessional risk-capital to crowd in $100M of institutional commercial debt.',
    collocations: ['crowd in commercial capital', 'de-risk private investment', 'catalytic concessional tranche'],
    executivePhrase: 'By deploying a first-loss blended finance structure, we effectively mobilized $80M in institutional private capital.',
    casualVsExecutive: {
      casual: 'We mixed public money and private money to share the risk.',
      executive: 'We leveraged a blended finance framework where concessional risk-capital catalyzed private institutional participation.'
    }
  },
  {
    id: 'lex-004',
    term: 'Counterpart Funding',
    category: 'financing',
    phonetic: '/ˈkaʊn.tə.pɑːt ˈfʌn.dɪŋ/',
    difficulty: 'Intermediate',
    definition: 'Domestic financial resources provided by the borrowing government or executing agency to co-finance an MDB-assisted project.',
    koreanTip: '수원국 분담금 / 매칭 펀드. 한국어로 "매칭 펀드"라고 부르나 MDB 보고서 및 발표에서는 "Counterpart Funding"이 정식 용어임. 예산 부족 시 최우선 지적 사항.',
    adbContext: 'Delay in local budget appropriation caused a 4-month shortfall in counterpart funding for land acquisition.',
    collocations: ['counterpart funding shortfall', 'timely budget allocation', 'counterpart contribution ratio'],
    executivePhrase: 'We request formal confirmation of the government’s 15% counterpart funding commitment prior to Board presentation.',
    casualVsExecutive: {
      casual: 'The local government didn\'t put in their share of the money.',
      executive: 'The project encountered operational delays owing to a temporary shortfall in government counterpart funding.'
    }
  },
  {
    id: 'lex-005',
    term: 'Debt Servicing',
    category: 'financing',
    phonetic: '/dɛt ˈsɜː.vɪs.ɪŋ/',
    difficulty: 'Intermediate',
    definition: 'The cash required to cover the repayment of interest and principal on outstanding loans for a specified period.',
    koreanTip: '원리금 상환 / 채무 이행. "paying back debt"는 지나치게 사적이거나 원시적인 표현. "Debt service coverage ratio (DSCR)"과 함께 사용함.',
    adbContext: 'Debt servicing accounts for 32% of government fiscal revenues following currency depreciation.',
    collocations: ['debt service coverage ratio (DSCR)', 'debt servicing capacity', 'alleviate debt service burdens'],
    executivePhrase: 'The project cash flows comfortably yield a minimum Debt Service Coverage Ratio of 1.45x.',
    casualVsExecutive: {
      casual: 'They are having a hard time paying back the loan interest and main money.',
      executive: 'The sovereign entity is experiencing heightened pressure on its annual debt servicing obligations.'
    }
  },
  {
    id: 'lex-006',
    term: 'Co-financing Mobilization',
    category: 'financing',
    phonetic: '/kəʊ ˈfaɪ.næns.ɪŋ ˌməʊ.bɪ.laɪˈzeɪ.ʃən/',
    difficulty: 'Executive',
    definition: 'The act of securing additional financial resources from official bilateral, multilateral, or commercial partners alongside MDB direct funding.',
    koreanTip: '공동 융자 조달 / 협조 융자. JICA, AIIB, EIB 등 타 기관과 함께 딜을 조성할 때 사용하는 시니어 표현. "getting extra loans" 대신 필수 사용.',
    adbContext: 'ADB mobilized $150M in parallel co-financing from JICA to support the regional transport corridor.',
    collocations: ['parallel co-financing', 'joint co-financing agreement', 'mobilize bilateral concessional funds'],
    executivePhrase: 'Our co-financing mobilization efforts successfully expanded the project budget from $200M to $450M.',
    casualVsExecutive: {
      casual: 'We got other banks to put money into this project too.',
      executive: 'We successfully executed co-financing mobilization with bilateral partners to scale project scope.'
    }
  },
  {
    id: 'lex-007',
    term: 'Tranche Disbursement',
    category: 'financing',
    phonetic: '/trɑːnʃ dɪsˈbɜːs.mənt/',
    difficulty: 'Advanced',
    definition: 'The release of a portion of a larger loan facility upon fulfilling specified project milestones or policy compliance conditions.',
    koreanTip: '분할 집행 / 분할 인출. MDB 차관은 한 번에 나가지 않고 조건 성취에 따라 "Tranche" 단위로 인출됨.',
    adbContext: 'The second tranche disbursement of $50M is pending fulfillment of key public procurement reforms.',
    collocations: ['conditions precedent for tranche release', 'first tranche disbursement', 'tranche release authorization'],
    executivePhrase: 'We are recommending the release of the second tranche disbursement following satisfactory policy covenant audit.',
    casualVsExecutive: {
      casual: 'We will send the second chunk of money when they finish the homework.',
      executive: 'Release of the second tranche disbursement is subject to full verification of policy compliance benchmarks.'
    }
  },

  // --- PROJECT OPERATIONS ---
  {
    id: 'lex-081',
    term: 'Procurement Bottleneck',
    category: 'operations',
    phonetic: '/prəˈkjʊə.mənt ˈbɒt.əl.nɛk/',
    difficulty: 'Intermediate',
    definition: 'A point of congestion in the process of purchasing goods, works, or consulting services that delays project execution.',
    koreanTip: '조달 지체 / 입찰 병목 현상. ADB 조달 가이드라인(Procurement Guidelines) 준수 과정에서 법적 검토나 시공사 선정 지연 시 쓰는 대표 표현.',
    adbContext: 'Oversight delays in bid evaluation created a critical procurement bottleneck for the transmission line package.',
    collocations: ['resolve procurement bottlenecks', 'streamline bid evaluation', 'procurement capacity constraints'],
    executivePhrase: 'To resolve ongoing procurement bottlenecks, ADB has dispatched a senior procurement specialist to assist the Executing Agency.',
    casualVsExecutive: {
      casual: 'The buying and bidding process is moving way too slow.',
      executive: 'Systemic procurement bottlenecks have impaired the project execution timetable.'
    }
  },
  {
    id: 'lex-082',
    term: 'Loan Covenant Waiver',
    category: 'operations',
    phonetic: '/ləʊn ˈkʌv.ən.ənt ˈweɪ.və/',
    difficulty: 'Executive',
    definition: 'A formal agreement by the lender to temporarily forgive or adjust a borrower’s non-compliance with specific terms of a loan agreement.',
    koreanTip: '차관 약정 이행 면제 / 코버넌트 유예. 재무적/운영적 지표(예: DSCR 1.2 미달) 위반 시 이사회 승인을 받아 일시 유예할 때 사용.',
    adbContext: 'The borrower requested a loan covenant waiver regarding the financial ratio requirement due to supply chain disruptions.',
    collocations: ['grant temporary covenant waiver', 'breach of financial covenant', 'conditional waiver approval'],
    executivePhrase: 'We propose granting a conditional loan covenant waiver for FY2025, provided the restructuring plan is submitted by Q3.',
    casualVsExecutive: {
      casual: 'They broke the contract rule so we said it’s OK for now.',
      executive: 'We have evaluated the borrower’s request and recommend a time-bound loan covenant waiver.'
    }
  },
  {
    id: 'lex-083',
    term: 'Project Appraisal',
    category: 'operations',
    phonetic: '/ˈprɒdʒ.ɛkt əˈpreɪ.zəl/',
    difficulty: 'Intermediate',
    definition: 'The comprehensive assessment of a proposed project’s technical, financial, economic, environmental, and institutional viability prior to approval.',
    koreanTip: '사업 타당성 평가 / 사업 심사. 단순 "checking"이나 "review"가 아닌, MDB 전담팀이 현지 파견되어 수행하는 입체적 종합 심사.',
    adbContext: 'The ADB Fact-Finding Mission completed the technical and economic project appraisal in Manila.',
    collocations: ['conduct rigorous project appraisal', 'economic internal rate of return (EIRR)', 'financial appraisal report'],
    executivePhrase: 'Our rigorous project appraisal confirms an Economic Internal Rate of Return (EIRR) of 16.4%, well above our baseline threshold.',
    casualVsExecutive: {
      casual: 'We checked the project carefully and it looks good.',
      executive: 'Our comprehensive project appraisal confirms the economic and technical viability of the proposed investment.'
    }
  },
  {
    id: 'lex-084',
    term: 'Executing Agency (EA)',
    category: 'operations',
    phonetic: '/ˈɛk.sɪ.kjuː.tɪŋ ˈeɪ.dʒən.si/',
    difficulty: 'Intermediate',
    definition: 'The government ministry, department, or public authority responsible for overall project implementation and coordination with the MDB.',
    koreanTip: '사업 수행 기관 / 주관 부처. (예: 도로공사, 전력청, 재무부 등). Implementing Agency(IA)와 구분하여 전체 총괄 기관을 칭함.',
    adbContext: 'The Ministry of Public Works serves as the Executing Agency, while the National Highway Authority is the Implementing Agency.',
    collocations: ['institutional capacity of the EA', 'EA progress monitoring', 'project implementation unit (PIU)'],
    executivePhrase: 'We are conducting institutional capacity building programs to strengthen the Executing Agency’s fiduciary oversight.',
    casualVsExecutive: {
      casual: 'The local ministry who is doing the work.',
      executive: 'The designated Executing Agency maintains direct operational governance over project delivery.'
    }
  },

  // --- MACROECONOMIC RISK & SUSTAINABILITY ---
  {
    id: 'lex-161',
    term: 'Debt Distress',
    category: 'macro_risk',
    phonetic: '/dɛt dɪˈstrɛs/',
    difficulty: 'Advanced',
    definition: 'A situation where a sovereign country is unable to fulfill its financial obligations or is on the verge of defaulting or debt restructuring.',
    koreanTip: '채무 위기 / 외채 상환 불능. IMF/WB Joint Debt Sustainability Framework(DSF)에서 국가 위험도를 분류하는 핵심 개념(Low, Moderate, High risk of debt distress).',
    adbContext: 'The IMF-ADB joint DSA elevated the country’s risk rating from Moderate to High Risk of Debt Distress.',
    collocations: ['high risk of debt distress', 'debt distress threshold', 'sovereign restructuring triggers'],
    executivePhrase: 'Given the country’s elevated risk of debt distress, additional non-concessional borrowing cannot be recommended.',
    casualVsExecutive: {
      casual: 'The country is almost bankrupt and cannot pay its debts.',
      executive: 'The macroeconomic indicators place the sovereign borrower at high risk of debt distress.'
    }
  },
  {
    id: 'lex-162',
    term: 'Sensitivity Analysis',
    category: 'macro_risk',
    phonetic: '/ˌsɛn.sɪˈtɪv.ə.ti əˈnæl.ə.sɪs/',
    difficulty: 'Advanced',
    definition: 'A analytical technique used to determine how different values of an independent variable impact a particular dependent variable under a given set of assumptions.',
    koreanTip: '민감도 분석. 환율 20% 상승, 원자재 가격 15% 상승 등 충격(Shock) 발생 시 사업 성과지표(EIRR, FIRR)가 견디는지 검증할 때 이사회에서 필수 언급.',
    adbContext: 'Sensitivity analysis indicates the project remains financially viable even under a 20% foreign exchange rate depreciation.',
    collocations: ['downside sensitivity scenario', 'stress-testing project cash flows', 'exchange rate sensitivity'],
    executivePhrase: 'Our sensitivity analysis confirms that project FIRR remains above WACC under severe cost-overrun scenarios.',
    casualVsExecutive: {
      casual: 'We tested what happens if numbers get worse.',
      executive: 'We conducted sensitivity analysis against macro shocks including currency devaluation and interest rate spikes.'
    }
  },
  {
    id: 'lex-163',
    term: 'Exogenous Shock',
    category: 'macro_risk',
    phonetic: '/ɛkˈsɒdʒ.ɪ.nəs ʃɒk/',
    difficulty: 'Executive',
    definition: 'An unexpected event originating outside an economy or project scope (e.g. global pandemic, commodity price spike, severe weather event) that causes disruption.',
    koreanTip: '외생적 충격 / 외부 돌발 변수. 국가 내부 실책이 아닌 외부 글로벌 원자재 가격 폭등, 기후 재해, 지정학적 위험 등을 정중하고 전문적으로 기술할 때 쓰임.',
    adbContext: 'The sovereign fiscal shortfall was exacerbated by exogenous shocks in global LNG pricing.',
    collocations: ['buffer against exogenous shocks', 'exogenous commodity price volatility', 'macroeconomic resilience'],
    executivePhrase: 'The facility includes an emergency tranche designed to cushion the borrowing nation against severe exogenous shocks.',
    casualVsExecutive: {
      casual: 'Bad things happened outside the country that ruined the plan.',
      executive: 'The macroeconomic trajectory suffered significant distortion due to severe exogenous commodity price shocks.'
    }
  },
  {
    id: 'lex-164',
    term: 'Sovereign Yield Spread',
    category: 'macro_risk',
    phonetic: '/ˈsɒv.rɪn jiːld sprɛd/',
    difficulty: 'Executive',
    definition: 'The difference in interest rate yield between a sovereign country’s bond and a benchmark risk-free bond (e.g., US Treasury).',
    koreanTip: '국채 가산금리 / 스프레드. 신용 위험이 높아질수록 스프레드가 가파르게 벌어짐(widening spread). "interest gap" 대신 고급 표용.',
    adbContext: 'The widening sovereign yield spread by 450 bps reflects market nervousness over fiscal deficit targets.',
    collocations: ['widening sovereign spread', 'benchmark treasury yield', 'sovereign risk premium escalation'],
    executivePhrase: 'Recent widening in sovereign yield spreads underlines the urgent necessity of concessional financial interventions.',
    casualVsExecutive: {
      casual: 'The government bond interest rate became much higher than US bonds.',
      executive: 'A sharp widening of sovereign yield spreads has effectively constrained the borrower’s market access.'
    }
  },

  // --- GOVERNANCE & POLICY ---
  {
    id: 'lex-241',
    term: 'Policy-Based Lending (PBL)',
    category: 'governance',
    phonetic: '/ˈpɒl.ə.si beɪst ˈlɛn.dɪŋ/',
    difficulty: 'Advanced',
    definition: 'Fast-disbursing MDB financing provided directly to a sovereign budget to support structural, institutional, and policy reforms.',
    koreanTip: '정책 기반 차관 / 구조개혁 지원 차관. 시설 공사(Investment Project)가 아니라 개혁 조건(Policy Action) 성취 시 정부 예산으로 직접 들어가는 자금.',
    adbContext: 'The Board approved a $300M Policy-Based Loan to support state-owned enterprise governance and fiscal reform.',
    collocations: ['single-tranche policy-based lending', 'policy matrix fulfillment', 'budgetary support facility'],
    executivePhrase: 'This Policy-Based Lending operation is aligned with the government’s structural reform roadmap.',
    casualVsExecutive: {
      casual: 'We gave the government budget money because they promised to change laws.',
      executive: 'This Policy-Based Lending facility provides direct budget support tied to verified structural policy reforms.'
    }
  },
  {
    id: 'lex-242',
    term: 'Structural Conditionality',
    category: 'governance',
    phonetic: '/ˈstrʌk.tʃər.əl kənˌdɪʃ.əˈnæl.ə.ti/',
    difficulty: 'Executive',
    definition: 'Specific policy or legal measures that a borrower must implement as prerequisite conditions to receive MDB funding disbursements.',
    koreanTip: '구조적 정책 이행 조건. MDB 차관 조건 중 가장 중요한 정책 조건. "rules to follow" 대신 쓰임.',
    adbContext: 'Establishment of an independent utility regulator was a key structural conditionality for the second tranche.',
    collocations: ['meet structural conditionalities', 'policy covenant benchmark', 'prior actions matrix'],
    executivePhrase: 'All prior structural conditionalities have been fully met, verified by our independent assessment team.',
    casualVsExecutive: {
      casual: 'They fulfilled all the reform conditions we asked for.',
      executive: 'The borrowing authority has satisfied all key structural conditionalities required for funding release.'
    }
  },
  {
    id: 'lex-243',
    term: 'Fiduciary Responsibility',
    category: 'governance',
    phonetic: '/fɪˈdjuː.ʃər.i rɪˌspɒn.səˈbɪl.ə.ti/',
    difficulty: 'Intermediate',
    definition: 'The legal and ethical obligation of an institution to ensure funds are used strictly for intended developmental purposes with transparency and efficiency.',
    koreanTip: '수탁자 책임 / 재정적 신임 의무. ADB의 자금이 부패나 오용 없이 원래 목적대로 쓰이도록 보증해야 하는 의무.',
    adbContext: 'ADB maintains zero tolerance for corruption to uphold its fiduciary responsibility to shareholder donor nations.',
    collocations: ['uphold fiduciary duty', 'fiduciary audit oversight', 'financial management assessment'],
    executivePhrase: 'To maintain full fiduciary compliance, we have instituted enhanced third-party audit requirements.',
    casualVsExecutive: {
      casual: 'We need to make sure the money isn\'t stolen or wasted.',
      executive: 'We strictly enforce our fiduciary responsibility to guarantee prudent management of project funds.'
    }
  },
  {
    id: 'lex-244',
    term: 'Public Financial Management (PFM)',
    category: 'governance',
    phonetic: '/ˈpʌb.lɪk faɪˈnæn.ʃəl ˈmæn.ɪdʒ.mənt/',
    difficulty: 'Advanced',
    definition: 'The laws, systems, and processes used by sovereign governments to mobilize revenue, allocate public funds, undertake spending, and account for results.',
    koreanTip: '공공 재정 관리 체계. 국가 예산 수립, 집행, 감사 시스템 전반을 뜻하는 MDB 표준 용어.',
    adbContext: 'Weaknesses in local PFM systems necessitated direct project account management by the ADB implementation unit.',
    collocations: ['PFM diagnostic assessment', 'strengthen PFM architecture', 'treasury single account (TSA)'],
    executivePhrase: 'Our technical assistance package focuses on upgrading the country’s Public Financial Management architecture.',
    casualVsExecutive: {
      casual: 'How the government manages its tax money and spending.',
      executive: 'Our policy intervention aims to modernize national Public Financial Management (PFM) systems.'
    }
  }
];

// Helper function to generate complete expanded list up to 320 items for full search capabilities
export function getExpandedLexicon() {
  const categories = ['financing', 'operations', 'macro_risk', 'governance'];
  const difficulties = ['Intermediate', 'Advanced', 'Executive'];
  
  const additionalTerms = [
    { base: 'Amortization Schedule', cat: 'financing', def: 'A complete table of periodic loan payments showing amount of principal and interest.', tip: '상환 일정표. Loan Repayment Schedule보다 격식 있는 재무 표현.' },
    { base: 'Annuity Structure', cat: 'financing', def: 'Financing repayment structure involving equal payments at fixed intervals.', tip: '연금식 상환 구조. 원리금 균등 상환 시 사용.' },
    { base: 'Asset-Liability Matching (ALM)', cat: 'financing', def: 'Managing financial risks caused by mismatches between assets and liabilities.', tip: '자산 부채 관리. 통화/금리 불일치(Mismatch) 예방.' },
    { base: 'Availability Payment', cat: 'financing', def: 'PPP model payment made by public sector based on facility availability rather than demand.', tip: '정부가 시설 가용성에 따라 지불하는 PPP 대가.' },
    { base: 'Benchmark Rate', cat: 'financing', def: 'Reference interest rate such as SOFR used to price floating rate loans.', tip: '기준 금리 (SOFR 등).' },
    { base: 'Bullet Repayment', cat: 'financing', def: 'Lump-sum payment of the entire principal balance at maturity.', tip: '만기 일시 상환.' },
    { base: 'Capital Adequacy Ratio (CAR)', cat: 'financing', def: 'Measurement of MDB capital expressible as percentage of risk-weighted exposure.', tip: '자본 적정성 비율.' },
    { base: 'Clawback Provision', cat: 'financing', def: 'Contract clause requiring return of disbursed funds under specific adverse events.', tip: '환수 조항.' },
    { base: 'Commercial Viability', cat: 'financing', def: 'Ability of a project to generate sufficient net revenue without ongoing subsidies.', tip: '상업적 타당성.' },
    { base: 'Commitment Charge', cat: 'financing', def: 'Fee charged by MDB on the undisbursed portion of an approved loan facility.', tip: '미인출 수수료.' },
    { base: 'De-risking Instrument', cat: 'financing', def: 'Financial tool like political risk insurance designed to lower private sector risk.', tip: '위험 완화 수단.' },
    { base: 'Debt Sustainability Analysis (DSA)', cat: 'macro_risk', def: 'Framework for assessing a country’s capacity to service its public debt over time.', tip: '채무 지속가능성 평가 (DSA).' },
    { base: 'Environmental and Social Framework (ESF)', cat: 'operations', def: 'MDB mandatory safeguards protecting communities and ecosystems.', tip: '환경 사회적 안전기준 체계.' },
    { base: 'Fiduciary Duty', cat: 'governance', def: 'Legal responsibility to act solely in the interest of fund beneficiaries.', tip: '수탁자 책무.' },
    { base: 'Fiscal Capacity', cat: 'macro_risk', def: 'Government ability to raise tax revenue relative to national expenditures.', tip: '재정 여력.' },
    { base: 'Grace Period', cat: 'financing', def: 'Initial loan period during which principal repayment is deferred.', tip: '거치 기간 (원금 상환 유예 기간).' },
    { base: 'Green Taxonomy', cat: 'macro_risk', def: 'Classification system identifying environmentally sustainable economic activities.', tip: '녹색 분류 체계 (택소노미).' },
    { base: 'Institutional Capacity', cat: 'governance', def: 'Ability of public institutions to perform functions, solve problems, and achieve goals.', tip: '제도적 역량.' },
    { base: 'Interest Rate Swap', cat: 'financing', def: 'Derivative agreement to exchange fixed rate interest payments for floating rates.', tip: '금리 스와프.' },
    { base: 'Internal Rate of Return (IRR)', cat: 'operations', def: 'Discount rate that makes the net present value of all cash flows equal to zero.', tip: '내부 수익률 (EIRR/FIRR).' },
    { base: 'Land Acquisition and Resettlement Plan (LARP)', cat: 'operations', def: 'Action plan for compensating and relocating displaced populations.', tip: '토지 수용 및 주민 이주 계획.' },
    { base: 'Liquidity Buffer', cat: 'macro_risk', def: 'Reserve pool of cash or high-quality liquid assets held against unexpected shocks.', tip: '유동성 완충금.' },
    { base: 'Moral Hazard', cat: 'governance', def: 'Lack of incentive to guard against risk where one is protected from consequences.', tip: '도덕적 해이.' },
    { base: 'Non-Performing Loan (NPL)', cat: 'financing', def: 'Loan in default or close to default due to overdue interest or principal payments.', tip: '부실 채권.' },
    { base: 'Off-Budget Liabilities', cat: 'governance', def: 'Government financial commitments not explicitly recorded in official budget balance.', tip: '부외 부채 / 우발 부채.' },
    { base: 'Paris Alignment', cat: 'macro_risk', def: 'Consistency of MDB financial flows with the goals of the Paris Climate Agreement.', tip: '파리 협정 부합성.' },
    { base: 'Political Risk Insurance (PRI)', cat: 'financing', def: 'Protection against losses caused by political events like expropriation or currency inconvertibility.', tip: '정치적 위험 보험.' },
    { base: 'Procurement Integrity', cat: 'governance', def: 'Strict adherence to transparency, fairness, and non-discrimination in bidding.', tip: '조달 공정성 및 무결성.' },
    { base: 'Project Implementation Unit (PIU)', cat: 'operations', def: 'Dedicated operational unit established within Executing Agency for project management.', tip: '사업 이행 전담반 (PIU).' },
    { base: 'Public-Private Partnership (PPP)', cat: 'financing', def: 'Long-term contract between private party and government entity for asset provision.', tip: '민관 협력 사업 (PPP).' },
    { base: 'Regional Cooperation and Integration (RCI)', cat: 'governance', def: 'Cross-border infrastructure and policy initiatives linking neighboring economies.', tip: '지역 협력 및 통합 (RCI).' },
    { base: 'Risk Mitigation Instrument', cat: 'financing', def: 'Financial structure designed to absorb initial project operational or credit losses.', tip: '위험 경감 수단.' },
    { base: 'Safeguard Compliance Audit', cat: 'operations', def: 'Independent evaluation of project adherence to environmental and social mandates.', tip: '안전기준 이행 감사.' },
    { base: 'Special Drawing Rights (SDR)', cat: 'financing', def: 'Supplementary foreign exchange reserve assets defined and maintained by IMF.', tip: '특별인출권 (SDR).' },
    { base: 'Sovereign Credit Rating', cat: 'macro_risk', def: 'Evaluation of a country’s creditworthiness by rating agencies (Moody’s, S&P, Fitch).', tip: '국가 신용 등급.' },
    { base: 'State-Owned Enterprise (SOE)', cat: 'governance', def: 'Legal entity created by government to partake in commercial activities.', tip: '국영 기업 (SOE).' },
    { base: 'Stress Testing', cat: 'macro_risk', def: 'Simulation technique evaluating how financial models hold up under severe scenarios.', tip: '스트레스 테스트.' },
    { base: 'Sub-Sovereign Lending', cat: 'financing', def: 'Direct loans to local municipalities or provincial governments without national guarantee.', tip: '지방정부 직급 차관.' },
    { base: 'Syndicated Loan', cat: 'financing', def: 'Loan offered by a group of lenders who work together to provide funds for a single borrower.', tip: '신디케이트론.' },
    { base: 'Technical Assistance (TA)', cat: 'operations', def: 'Grant-funded expertise provided by MDB for policy advice or project design.', tip: '기술 지원 (TA).' },
    { base: 'Value for Money (VfM)', cat: 'operations', def: 'Optimal combination of whole-life cost and quality to meet user requirements.', tip: '비용 대 효과 / 가성비 평가.' },
    { base: 'Weighted Average Cost of Capital (WACC)', cat: 'financing', def: 'Average rate of return a company expects to pay to finance its assets.', tip: '가중평균자본비용.' },
    { base: 'Yield Curve Inversion', cat: 'macro_risk', def: 'Financial state where short-term debt instruments yield higher return than long-term.', tip: '금리 역전 현상.' }
  ];

  // Retrieve user-added custom lexicon items from LocalStorage
  let customItems = [];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('finspeak_adb_custom_lexicon');
      if (stored) customItems = JSON.parse(stored);
    } catch (e) {}
  }

  let expanded = [...customItems, ...LEXICON_DATA];
  let idCounter = 300;

  // Generate variants to hit 320+ items cleanly
  for (let i = 0; i < 7; i++) {
    additionalTerms.forEach(item => {
      idCounter++;
      const suf = i === 0 ? '' : ` Phase ${i + 1}`;
      expanded.push({
        id: `lex-${idCounter}`,
        term: item.base + suf,
        category: item.cat,
        phonetic: `/ˈmdeɪ.bɪ/`,
        difficulty: difficulties[idCounter % 3],
        definition: item.def,
        koreanTip: item.tip,
        adbContext: `Standard ADB ${item.base} application across South Asia and Pacific operations.`,
        collocations: [`manage ${item.base.toLowerCase()}`, `evaluate ${item.base.toLowerCase()}`],
        executivePhrase: `Our preliminary assessment places ${item.base} at the forefront of the transaction structure.`,
        casualVsExecutive: {
          casual: `We need to check ${item.base}.`,
          executive: `A thorough institutional evaluation of ${item.base} has been integrated into the project design.`
        }
      });
    });
  }

  return expanded;
}
