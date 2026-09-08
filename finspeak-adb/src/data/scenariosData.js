// Comprehensive Bank of 25+ ADB Boardroom Scenarios & Adversarial Challenge Questions

export const SCENARIOS = [
  // --- 1. RENEWABLE ENERGY & CLIMATE INFRASTRUCTURE ---
  {
    id: 'scen-01',
    title: 'Sovereign Guarantee for Floating Solar & Offshore Wind ($250M)',
    category: 'Renewable Energy & Blended Finance',
    location: 'Southeast Asia (Lao PDR / Viet Nam Regional Power Grid)',
    amount: '$250 Million USD',
    modality: 'Concessional Facility + Sovereign Counter-Guarantee',
    brief: 'Presenting a $250M sovereign-backed clean energy facility to the ADB Board. The borrowing nation faces fiscal deficit pressures and recent currency devaluation, requiring a 5-year grace period and first-loss concessional credit enhancement to attract international commercial co-financiers.',
    keyMetrics: {
      EIRR: '17.2%',
      FIRR: '8.4% (vs WACC 6.1%)',
      DebtServiceCoverageRatio: '1.35x',
      CounterpartFunding: '15% ($45M committed by Ministry of Energy)'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '한국인 재무 전문가들이 자주 구사하는 "The government will backup this project" 대신, "The facility is anchored by a legally binding Sovereign Guarantee issued by the Ministry of Economy and Finance"로 표현할 것.',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "You state a 1.35x DSCR, but local currency devalued 18% last quarter. If off-take tariffs are paid in local currency while debt service is in USD, how will the borrower avoid a default cascade without invoking our sovereign guarantee?"'
      },
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "The transmission line route traverses secondary forest habitats. Has the Executing Agency completed the Category A Biodiversity Impact Assessment in accordance with ADB Safeguard Policy Statement 2009?"'
      },
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Land acquisition for the coastal substation is 6 months behind schedule. Why are we seeking Board approval before the Executing Agency finishes land title transfers?"'
      }
    ]
  },
  {
    id: 'scen-02',
    title: 'Pacific SIDS Off-Grid Battery Energy Storage System ($85M)',
    category: 'Renewable Energy & Climate Adaptation',
    location: 'Pacific Island Small Developing States (Fiji / Samoa)',
    amount: '$85 Million USD',
    modality: 'ADF Concessional Grant + Green Climate Fund (GCF) Co-Financing',
    brief: 'Pitching an off-grid solar-plus-battery storage package to replace expensive diesel imports across 14 remote island communities. Funding relies heavily on ADF concessional grants to offset high upfront logistical freight costs.',
    keyMetrics: {
      EIRR: '19.8%',
      FIRR: '4.2% (Grant Supported)',
      DebtServiceCoverageRatio: 'N/A (Grant Modality)',
      CounterpartFunding: '5% ($4.25M in-kind land allocation)'
    },
    suggestedFramework: 'STAR-E',
    koreanFocusTip: '"Island has expensive diesel so we give grant" 대신 "High diesel import dependence drains foreign exchange reserves; our blended ADF grant facility replaces fossil fuel outlays with zero-carbon domestic generation."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Battery storage technologies suffer rapid degradation in tropical marine environments. What operations and maintenance reserve fund exists if the local utility defaults on replacement cells in Year 7?"'
      },
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Lithium battery disposal in isolated SIDS poses severe hazardous waste risks. Where is the contractually mandated e-waste recycling lifecycle plan?"'
      }
    ]
  },
  {
    id: 'scen-03',
    title: 'Central Asian Cross-Border Clean Energy Corridor ($400M)',
    category: 'Regional Cooperation & Integration (RCI)',
    location: 'Central & West Asia (Tajikistan / Kyrgyz Republic / Uzbekistan)',
    amount: '$400 Million USD',
    modality: 'Multi-Country Sovereign Loan + Syndicated Commercial Debt',
    brief: 'Structuring a $400M cross-border 500kV transmission grid connecting hydro-abundant nations with high-demand regional centers. Requires complex multi-sovereign intergovernmental power purchase agreements (PPAs).',
    keyMetrics: {
      EIRR: '21.4%',
      FIRR: '9.6%',
      DebtServiceCoverageRatio: '1.52x',
      CounterpartFunding: '20% ($80M split across 3 ministries)'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Three countries agreed to share power" 대신 "Cross-border energy trade is governed by a legally binding multilateral Power Purchase Agreement (PPA) backed by joint sovereign guarantees."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Geopolitical disputes in Central Asia frequently disrupt cross-border off-take agreements. What sovereign indemnity clause protects ADB if Country B unilaterally cuts off wheeling rights?"'
      },
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Coordinating procurement across three separate state utilities is an operational nightmare. Which single Executing Agency maintains ultimate fiduciary authority?"'
      }
    ]
  },
  {
    id: 'scen-04',
    title: 'Commercial Green Hydrogen & Ammonia Facility ($150M)',
    category: 'Innovative Climate Finance',
    location: 'East Asia (Industrial Port Complex)',
    amount: '$150 Million USD',
    modality: 'Non-Recourse Private Sector Project Finance',
    brief: 'ADB Private Sector Operations Department (PSOD) direct loan to finance a green hydrogen synthesis plant powered by dedicated wind assets for fertilizer export.',
    keyMetrics: {
      EIRR: '15.1%',
      FIRR: '10.5%',
      DebtServiceCoverageRatio: '1.28x',
      CounterpartFunding: '30% Sponsor Equity ($45M)'
    },
    suggestedFramework: 'CAR_RISK',
    koreanFocusTip: '"Green hydrogen is new so banks don\'t like it" 대신 "Commercial off-takers exhibit technology-risk aversion; ADB’s non-recourse senior tranche de-risks the asset class and anchors the debt syndicate."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Green hydrogen technology remains cost-inefficient compared to gray ammonia. If global market prices collapse, how does the sponsor avoid a debt default without MDB recourse?"'
      }
    ]
  },
  {
    id: 'scen-05',
    title: 'Geothermal Deep-Drilling Sub-Sovereign Risk Guarantee ($110M)',
    category: 'Renewable Energy & Risk Mitigation',
    location: 'Indonesia (Volcanic Arc)',
    amount: '$110 Million USD',
    modality: 'Exploration Risk Mitigation Facility',
    brief: 'A specialized risk-sharing facility absorbing upfront geothermal exploration drilling risk to catalyze private power producers.',
    keyMetrics: {
      EIRR: '18.0%',
      FIRR: '8.1%',
      DebtServiceCoverageRatio: '1.40x',
      CounterpartFunding: '15% State Energy Fund'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Drilling for steam is risky" 대신 "Exploration drilling exhibits binary resource risk; our contingent risk-sharing facility absorbs initial exploration losses to crowd in private IPP capital."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "If 4 out of 5 test wells yield dry steam, ADB’s first-loss capital suffers 100% principal impairment. How is this risk modeled in our capital adequacy ratio?"'
      }
    ]
  },

  // --- 2. URBAN TRANSPORT & MEGA INFRASTRUCTURE ---
  {
    id: 'scen-06',
    title: 'Second Tranche Disbursement for Urban Mass Rapid Transit ($180M)',
    category: 'Urban Transport & Infrastructure Operations',
    location: 'South Asia (Metropolitan Transit Authority)',
    amount: '$180 Million USD',
    modality: 'Multi-Tranche Financing Facility (MFF)',
    brief: 'You are defending the release of the second $180M tranche for an urban elevated rail project. Phase 1 experienced a 4-month procurement delay and cost overruns caused by steel price spikes. You must convince the Board that procurement bottlenecks are resolved and covenants are met.',
    keyMetrics: {
      CompletionRate: '64% physical works',
      ProcurementStatus: '8 out of 9 ICB packages awarded',
      CovenantStatus: 'Requesting conditional covenant waiver for FY2025 FIRR target',
      CounterpartDisbursement: '$32M disbursed (92% of target)'
    },
    suggestedFramework: 'SCR',
    koreanFocusTip: '"We had some delay because of steel price" 대신 "Exogenous steel price spikes induced a temporary procurement bottleneck, which has been mitigated through fixed-price EPC indexation."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "You are asking for a covenant waiver on financial returns while requesting $180M. What enforcement mechanism exists if the municipal operator fails to adjust passenger tariffs next year?"'
      },
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "If civil works cost overruns exceed 12%, who absorbs the secondary deficit? Is ADB expected to extend a supplemental loan facility?"'
      }
    ]
  },
  {
    id: 'scen-07',
    title: 'ASEAN Smart Electric Bus Fleet & Charging Infrastructure ($130M)',
    category: 'Urban Mobility & Clean Tech',
    location: 'Southeast Asia (Capital City District)',
    amount: '$130 Million USD',
    modality: 'Sub-Sovereign Municipal Loan + Private Sector Co-Financing',
    brief: 'Financing the replacement of 1,200 diesel municipal buses with zero-emission electric vehicles and depot charging grids under an Availability Payment PPP structure.',
    keyMetrics: {
      EIRR: '16.9%',
      FIRR: '7.5%',
      DebtServiceCoverageRatio: '1.32x',
      CounterpartFunding: '20% Municipal Equity'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"City will buy electric buses" 대신 "The municipal authority is procuring EV bus fleets via an Availability Payment PPP model backed by municipal revenue escrows."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Charging depot grid connection lead times in the city average 14 months. How can operations commence without experiencing severe charging infrastructure bottlenecks?"'
      }
    ]
  },
  {
    id: 'scen-08',
    title: 'Regional Maritime Deep-Water Port Expansion ($290M)',
    category: 'Trade & Logistics Infrastructure',
    location: 'South Asia (Coastal Economic Corridor)',
    amount: '$290 Million USD',
    modality: 'Sovereign Guarantee Loan + Commercial Port Operator Equity',
    brief: 'Dredging and terminal expansion to allow Ultra-Large Container Vessels (ULCV) access, expanding regional export competitiveness.',
    keyMetrics: {
      EIRR: '20.2%',
      FIRR: '9.8%',
      DebtServiceCoverageRatio: '1.45x',
      CounterpartFunding: '25% Port Authority'
    },
    suggestedFramework: 'STAR-E',
    koreanFocusTip: '"Bigger ships can bring goods now" 대신 "Deep-water berth expansion enables Ultra-Large Container Vessel berthing, lowering maritime freight unit costs by 18%."',
    adversarialTriggers: [
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Dredging 4 million cubic meters of coastal sediment threatens coral reef ecosystems. Where is the continuous water turbidity monitoring protocol?"'
      }
    ]
  },
  {
    id: 'scen-09',
    title: 'High-Speed Cross-Border Freight Railway ($500M)',
    category: 'Regional Transportation Corridors',
    location: 'Central Asia Transit Axis',
    amount: '$500 Million USD',
    modality: 'Bilateral Sovereign Loan Facility',
    brief: 'Constructing 320km of electrified heavy-haul rail linking agricultural inland regions to international sea routes.',
    keyMetrics: {
      EIRR: '18.7%',
      FIRR: '6.9%',
      DebtServiceCoverageRatio: '1.30x',
      CounterpartFunding: '20% State Railway'
    },
    suggestedFramework: 'SCR',
    koreanFocusTip: '"Train moves cargo faster" 대신 "Electrified rail freight infrastructure reduces transit times by 60% while bypassing bottlenecked highway checkpoints."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "A $500M loan increases the country’s sovereign debt-to-GDP ratio by 3.4 percentage points. How does the Ministry of Finance plan to maintain debt sustainability?"'
      }
    ]
  },
  {
    id: 'scen-10',
    title: 'Urban Flood Protection & Climate Resilient Drainage ($160M)',
    category: 'Urban Climate Adaptation',
    location: 'Pacific Coastal Megacity',
    amount: '$160 Million USD',
    modality: 'Concessional Sector Loan',
    brief: 'Upgrading sea-walls, retention basins, and pumping stations to protect 2 million residents against 1-in-100-year storm surges.',
    keyMetrics: {
      EIRR: '22.5%',
      FIRR: 'N/A (Public Benefit Asset)',
      DebtServiceCoverageRatio: 'N/A',
      CounterpartFunding: '10% Municipal Budget'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Stopping floods saves homes" 대신 "Investments in urban drainage infrastructure provide significant economic avoided-loss benefits, yielding a 22.5% EIRR."',
    adversarialTriggers: [
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Pumping station construction requires involuntary resettlement of 800 informal settler households along canal banks. Has the LARP compensation framework been approved?"'
      }
    ]
  },

  // --- 3. GOVERNANCE, POLICY-BASED LENDING & PFM ---
  {
    id: 'scen-11',
    title: 'Policy-Based Lending for Public Health System Strengthening ($300M)',
    category: 'Governance & Public Financial Management (PFM)',
    location: 'Central & West Asia',
    amount: '$300 Million USD',
    modality: 'Single-Tranche Policy-Based Loan (PBL)',
    brief: 'Presenting a $300M fast-disbursing policy loan to support sovereign budget stabilization following external economic shocks. Disbursement hinges on the sovereign government implementing structural reforms in public health procurement and medical supply chain transparency.',
    keyMetrics: {
      ReformMatrixProgress: '9 out of 10 prior policy actions verified',
      FiscalDeficitImpact: 'Reduces net financing gap by 22%',
      PFMAuditingStandard: 'Transition to International Public Sector Accounting Standards (IPSAS)'
    },
    suggestedFramework: 'POLICY_4P',
    koreanFocusTip: '"They promised to fix corruption and public budget" 대신 "The policy matrix enforces strict structural conditionalities requiring digitized treasury oversight and independent fiduciary audits."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Policy-based loans disburse directly into general treasury funds. What audit safeguards prevent these funds from being reallocated to non-developmental sovereign expenditures?"'
      },
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Action 7 regarding rural health clinic access omits gender-disaggregated baseline data. How does this align with ADB Gender Equality Mainstreaming mandates?"'
      }
    ]
  },
  {
    id: 'scen-12',
    title: 'Fiscal Sustainability & SOE Governance Reform Program ($350M)',
    category: 'Governance & Structural Adjustment',
    location: 'South Asia Sovereign Borrower',
    amount: '$350 Million USD',
    modality: 'Programmatic Policy-Based Loan (2 Tranches)',
    brief: 'Supporting state-owned enterprise (SOE) restructuring, commercialization of power utilities, and elimination of quasi-fiscal subsidies.',
    keyMetrics: {
      TrancheReleaseCondition: 'Enactment of Independent Utility Tariff Law',
      SubsidiesReduction: '$420M annual savings',
      AuditStandard: 'Full compliance with IPSAS'
    },
    suggestedFramework: 'POLICY_4P',
    koreanFocusTip: '"Fixing government companies" 대신 "Structuring programmatic policy-based lending tied to institutional state-owned enterprise (SOE) reform and financial unbundling."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Parliamentary approval of the tariff law is stalled in committee. If Tranche 1 disburses now, what leverage remains for enforcing Tranche 2 policy conditions?"'
      }
    ]
  },
  {
    id: 'scen-13',
    title: 'Tax Administration Modernization & Anti-Corruption Facility ($220M)',
    category: 'Domestic Resource Mobilization (DRM)',
    location: 'Southeast Asia Developing Member Country',
    amount: '$220 Million USD',
    modality: 'Technical Assistance & Sector Development Loan',
    brief: 'Digitizing tax collection, implementing electronic invoicing, and training audit units to expand tax-to-GDP ratios by 2.5 percentage points.',
    keyMetrics: {
      TaxToGDPIncrease: '11.8% -> 14.3%',
      DigitizationCoverage: '100% corporate tax filing',
      FiduciaryOversight: 'Automated Fraud Audit System'
    },
    suggestedFramework: 'STARE',
    koreanFocusTip: '"Government wants to collect more taxes" 대신 "Enhancing Domestic Resource Mobilization (DRM) through digitized revenue administration architecture."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Tax reform encounters severe political resistance. If tax revenue targets fall short by 40%, how will the country meet debt servicing commitments?"'
      }
    ]
  },
  {
    id: 'scen-14',
    title: 'Financial Sector Resilience & AML/CFT Compliance Facility ($200M)',
    category: 'Financial Sector Development',
    location: 'Pacific Banking Sector',
    amount: '$200 Million USD',
    modality: 'Policy Loan + Institutional Capacity Grant',
    brief: 'Upgrading central bank anti-money laundering (AML) and counter-terrorism financing (CFT) regulatory frameworks to prevent loss of correspondent banking relationships.',
    keyMetrics: {
      FATFStatus: 'Removal from Gray List Priority',
      CorrespondentBanking: '100% clearing line retention',
      RegulatoryScope: 'Non-bank financial institutions included'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Banks need better rules against crime" 대신 "Strengthening Anti-Money Laundering and Countering the Financing of Terrorism (AML/CFT) regulatory compliance to preserve international correspondent banking channels."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "If correspondent banks terminate clearing accounts despite this loan, the country faces severe isolation. What backstop liquidity exists?"'
      }
    ]
  },
  {
    id: 'scen-15',
    title: 'Local Government Fiscal Decentralization Loan ($175M)',
    category: 'Public Sector Management',
    location: 'South Asian Federation',
    amount: '$175 Million USD',
    modality: 'Sub-Sovereign Support Program',
    brief: 'Transferring fiscal allocation formulas and municipal financial management software to 45 provincial local governments.',
    keyMetrics: {
      PFMDigitization: '45 municipal treasuries linked',
      AuditTimeliness: 'Reduced from 24 months to 6 months',
      CounterpartMatch: '15% Provincial Contribution'
    },
    suggestedFramework: 'POLICY_4P',
    koreanFocusTip: '"Local cities need better money software" 대신 "Modernizing sub-sovereign Public Financial Management (PFM) systems to enhance fiscal decentralization and local fiduciary oversight."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Municipal accounting capacity varies drastically across provinces. How can we ensure 100% software adoption without incurring severe technical assistance cost overruns?"'
      }
    ]
  },

  // --- 4. AGRICULTURE, WATER & CLIMATE RESILIENCE ---
  {
    id: 'scen-16',
    title: 'Rural Agri-Tech Climate Resilience Blended Finance Facility ($120M)',
    category: 'Agriculture, Climate Resilience & Private Sector Catalysis',
    location: 'Pacific & East Asia',
    amount: '$120 Million USD',
    modality: 'Blended Concessional Debt + Private Capital Co-Financing',
    brief: 'Pitching a blended finance structure to de-risk micro-irrigation and solar cold-chain logistics for smallholder farmers. ADB provides a $30M first-loss concessional tranche to leverage $90M in private commercial bank credit lines.',
    keyMetrics: {
      LeverageRatio: '1:3 (ADB $30M : Commercial $90M)',
      TargetBeneficiaries: '45,000 smallholder farmer households',
      ClimateAdaptationRatio: '100% adaptation finance taxonomy alignment'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Private banks don\'t like poor farmers so we give money first" 대신 "Commercial lenders exhibit risk aversion toward agricultural credit; our first-loss concessional tranche de-risks the asset class and crowds in institutional liquidity."',
    adversarialTriggers: [
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Smallholder tech adoption often leads to groundwater over-extraction. Are smart metering safeguards contractually enforced in the commercial credit agreements?"'
      },
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "First-loss tranches place ADB capital at primary risk. What is our projected non-performing loan (NPL) threshold before ADB principal suffers impairment?"'
      }
    ]
  },
  {
    id: 'scen-17',
    title: 'Smart Irrigation & Drought Resilience Modernization ($140M)',
    category: 'Water Resources & Climate Adaptation',
    location: 'Central Asia Arid Basin',
    amount: '$140 Million USD',
    modality: 'Sector Investment Loan',
    brief: 'Lining 450km of unpaved irrigation canals and installing automated sluice gates to reduce agricultural water loss by 35%.',
    keyMetrics: {
      WaterEfficiencyGain: '35% reduction in conveyance loss',
      EIRR: '19.1%',
      CounterpartFunding: '15% State Water Board'
    },
    suggestedFramework: 'STARE',
    koreanFocusTip: '"Lining canals stops water leak" 대신 "Modernizing canal conveyance infrastructure reduces agricultural water loss, mitigating drought vulnerability in arid basins."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Construction must occur exclusively during non-irrigation winter months. If canal lining suffers a 60-day delay, farmers lose an entire crop cycle. What is the execution plan?"'
      }
    ]
  },
  {
    id: 'scen-18',
    title: 'Sustainable Forestry & Carbon Credit Co-Financing Facility ($95M)',
    category: 'Nature-Based Solutions & Carbon Markets',
    location: 'Southeast Asia Tropical Rainforest Basin',
    amount: '$95 Million USD',
    modality: 'Results-Based Grant + Commercial Carbon Off-set Monetization',
    brief: 'Protecting 500,000 hectares of primary rainforest while generating Article 6 compliant high-integrity carbon offsets for international trade.',
    keyMetrics: {
      CarbonOffsetVolume: '3.2M tons CO2e annually',
      CommunityRevenueShare: '60% directly to indigenous cooperatives',
      ParisAlignment: '100% Article 6.4 Compliant'
    },
    suggestedFramework: 'CAR_RISK',
    koreanFocusTip: '"Trees make carbon credits" 대신 "Monetizing high-integrity carbon credits under Article 6 of the Paris Agreement to fund long-term forest conservation."',
    adversarialTriggers: [
      {
        personaId: 'esg-lead',
        question: 'Elena Rostova: "Carbon credit markets have suffered severe greenwashing scandals. How do we guarantee satellite-based MRV (Measurement, Reporting, Verification) integrity?"'
      }
    ]
  },
  {
    id: 'scen-19',
    title: 'Coastal Erosion Barrier & Mangrove Restoration Facility ($75M)',
    category: 'Coastal Defense & Biodiversity',
    location: 'Pacific Small Island State',
    amount: '$75 Million USD',
    modality: 'ADF Concessional Grant',
    brief: 'Constructing hybrid living breakwaters and restoring 4,000 hectares of mangrove forests to protect coastal highways against sea level rise.',
    keyMetrics: {
      EIRR: '21.0%',
      ProtectedShoreline: '85km of vital arterial road',
      BiodiversityBenefit: 'Category 1 Marine Sanctuary'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Planting mangroves stops big waves" 대신 "Deploying nature-based coastal protection assets delivers cost-effective wave attenuation while restoring marine biodiversity."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Living breakwaters take 5 to 7 years to establish structural strength. If a Category 5 cyclone strikes next year, what physical protection exists?"'
      }
    ]
  },
  {
    id: 'scen-20',
    title: 'Food Security & Fertilizer Supply Chain Contingency Facility ($210M)',
    category: 'Macro Agriculture & Emergency Relief',
    location: 'South Asian Developing Country',
    amount: '$210 Million USD',
    modality: 'Emergency Sovereign Trade Finance Facility',
    brief: 'Providing emergency trade lines to import essential crop inputs following global fertilizer price spikes and supply disruptions.',
    keyMetrics: {
      ImportVolume: '650,000 tons of urea/NPK',
      DisbursementSpeed: 'Within 30 days of Board approval',
      SovereignBackstop: 'Ministry of Agriculture Escrow'
    },
    suggestedFramework: 'SCR',
    koreanFocusTip: '"Buying fertilizer so farmers don\'t starve"반대말 "Deploying emergency sovereign trade finance facilities to stabilize agricultural input supply chains amidst global commodity price volatility."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Emergency procurement under 30-day timelines creates massive corruption risks. What independent procurement monitoring safeguards are in place?"'
      }
    ]
  },

  // --- 5. MACROECONOMIC RISK & SOVEREIGN RESILIENCE ---
  {
    id: 'scen-21',
    title: 'Parametric Disaster Risk Sovereign Contingency Facility ($200M)',
    category: 'Macroeconomic Risk & Sovereign Resilience',
    location: 'Pacific Small Island Developing States (SIDS)',
    amount: '$200 Million USD',
    modality: 'Contingent Disaster Response Financing (CDF)',
    brief: 'Presenting a quick-disbursing sovereign credit line activated automatically upon severe typhoon or earthquake parametric triggers, preventing catastrophic fiscal reallocation from long-term capital investments.',
    keyMetrics: {
      PayoutLeadTime: 'Within 72 hours of satellite data verification',
      ParametricTrigger: 'Category 4+ Typhoon or Magnitude 7.2+ Seismic event',
      FiscalBuffer: 'Covers 6 months of emergency relief funding'
    },
    suggestedFramework: 'CAR_RISK',
    koreanFocusTip: '"When big storm hits, they get instant cash" 대신 "Upon objective satellite verification of parametric threshold breaches, the contingent facility triggers automated liquidity release to preserve sovereign budget stability."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Parametric models can suffer from basis risk—where actual damage exceeds index payouts. How does this facility protect against basis risk shortfalls?"'
      },
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "In SIDS nations with limited local procurement capacity, how do we ensure rapid disbursement translates into immediate emergency works rather than administrative gridlock?"'
      }
    ]
  },
  {
    id: 'scen-22',
    title: 'Sovereign Yield Spread Stabilization & Debt Restructuring Facility ($450M)',
    category: 'Sovereign Debt & Debt Sustainability',
    location: 'High-Debt Developing Member Country',
    amount: '$450 Million USD',
    modality: 'Debt Buyback Credit Enhancement + Concessional Swap',
    brief: 'Credit-enhancing a sovereign bond exchange to swap expensive short-term commercial Eurobonds for longer-dated concessional MDB-backed debt.',
    keyMetrics: {
      DebtServiceReduction: '$140M annual savings',
      MaturityExtension: 'Extended from 3 years to 15 years',
      IMFProgramAlignment: 'Aligned with IMF EFF Program'
    },
    suggestedFramework: 'CAR_RISK',
    koreanFocusTip: '"Replacing expensive loans with ADB loans" 대신 "Executing a debt conversion transaction that swaps high-coupon commercial debt for longer-tenor concessional MDB facilities to restore sovereign debt sustainability."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "If commercial bondholders refuse the tender offer at a discount, ADB’s guarantee remains unexecuted while sovereign yield spreads widen further. What is Plan B?"'
      }
    ]
  },
  {
    id: 'scen-23',
    title: 'Exogenous Energy Shock LNG Import Buffer Facility ($190M)',
    category: 'Macro Energy Security',
    location: 'South Asian Energy Importer',
    amount: '$190 Million USD',
    modality: 'Emergency Standby Revolving Credit Line',
    brief: 'Providing a standby revolving credit line to fund emergency LNG spot purchases during global energy price spikes, preserving industrial power grids.',
    keyMetrics: {
      RevolvingLimit: '$190M at SOFR + 85 bps',
      GridReliability: 'Prevents 140 hours of industrial blackouts',
      Security: 'Escrowed Utility Revenues'
    },
    suggestedFramework: 'CAR_RISK',
    koreanFocusTip: '"Lending money so lights stay on" 대신 "Providing a standby liquidity buffer facility to cushion national energy utilities against severe exogenous commodity price shocks."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "Revolving credit lines run the risk of becoming permanent debt subsidies if spot prices stay elevated for 2 years. How does the facility enforce cost-reflective tariff adjustments?"'
      }
    ]
  },
  {
    id: 'scen-24',
    title: 'Sovereign Guarantee Liquidity Backstop Facility ($320M)',
    category: 'Infrastructure Risk Enhancement',
    location: 'Southeast Asia Infrastructure Corridor',
    amount: '$320 Million USD',
    modality: 'Partial Credit Guarantee (PCG)',
    brief: 'Providing a Partial Credit Guarantee (PCG) to backstop local currency bond issuances by municipal infrastructure authorities.',
    keyMetrics: {
      BondRatingUpgrade: 'Upgraded from BBB- to AA',
      TenorExtension: 'Extended from 5 years to 20 years',
      GuaranteedPercentage: '50% Principal Backstop'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"We guarantee half the bond so people buy it" 대신 "Deploying a Partial Credit Guarantee (PCG) to crowd in domestic institutional pension funds and extend local currency bond tenors to 20 years."',
    adversarialTriggers: [
      {
        personaId: 'risk-director',
        question: 'Director Pendelton: "If the municipal authority defaults on local currency bonds, ADB’s PCG triggers immediate payout. How will ADB recover capital from a sub-sovereign entity without a direct counter-indemnity?"'
      }
    ]
  },
  {
    id: 'scen-25',
    title: 'Regional Trade Finance Risk Mitigation Program ($260M)',
    category: 'Trade & Supply Chain Finance',
    location: 'Global / Asia-Pacific Regional Banks',
    amount: '$260 Million USD',
    modality: 'Trade & Supply Chain Finance Program (TSCFP)',
    brief: 'Issuing guarantees and loans to local partner banks to support SME import/export letters of credit in frontier markets.',
    keyMetrics: {
      SupportedSMECount: '3,200 small exporters',
      DefaultRate: 'Historically below 0.02%',
      TurnaroundTime: '24-hour approval line'
    },
    suggestedFramework: 'PREP',
    koreanFocusTip: '"Helping small business trade goods" 대신 "Issuing trade finance guarantees to mitigate counterparty bank risk and catalyze international trade flows for local SMEs in frontier markets."',
    adversarialTriggers: [
      {
        personaId: 'ops-lead',
        question: 'Rajiv Menon: "Partner bank vetting in frontier markets is notoriously difficult. What anti-money laundering and Know Your Customer (KYC) screening protocols protect ADB from illicit trade transactions?"'
      }
    ]
  }
];
