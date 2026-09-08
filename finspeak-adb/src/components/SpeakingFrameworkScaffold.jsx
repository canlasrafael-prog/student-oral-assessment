import React, { useState } from 'react';
import { Target, AlertCircle, ShieldAlert, Sparkles, ChevronRight, FileCheck, Layers, AlertTriangle } from 'lucide-react';

export function SpeakingFrameworkScaffold({ activeFramework = 'PREP', onSelectFramework }) {
  const [selectedTab, setSelectedTab] = useState(activeFramework);

  const frameworks = {
    PREP: {
      name: 'PREP Framework',
      tagline: 'Crisp 60-second Boardroom Status Briefs',
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
      icon: Target,
      steps: [
        { label: 'P - Point', text: 'State core recommendation/finding upfront.', example: 'Our due diligence supports a $250M sovereign guarantee facility.' },
        { label: 'R - Reason', text: 'Provide fiscal & operational rationale.', example: 'Given Lao PDR’s temporary liquidity constraint following energy shocks.' },
        { label: 'E - Example / Data', text: 'Cite exact financial ratios & metrics.', example: 'The FIRR stands at 8.4% with a debt service coverage ratio of 1.35x.' },
        { label: 'P - Point', text: 'Reiterate executive conclusion & next step.', example: 'We request Board authorization for single-tranche release in Q3.' }
      ]
    },
    SCR: {
      name: 'SCR Framework',
      tagline: 'Project Restructuring & Risk Status Updates',
      color: 'border-blue-500/50 bg-blue-950/20 text-blue-400',
      icon: AlertCircle,
      steps: [
        { label: 'S - Situation', text: 'Define project baseline & initial scope.', example: 'Phase 1 of the Metro Rapid Transit project reached 64% completion.' },
        { label: 'C - Complication', text: 'Highlight exogenous shock or procurement bottleneck.', example: 'Acute steel price spikes generated a 12% cost overrun and 4-month delay.' },
        { label: 'R - Resolution', text: 'Present restructured covenants & action plan.', example: 'We recommend a time-bound covenant waiver paired with EPC price indexation.' }
      ]
    },
    Hedging: {
      name: 'Diplomatic Pushback',
      tagline: 'Boardroom Debates & Adversarial Pushback',
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
      icon: ShieldAlert,
      steps: [
        { label: 'Acknowledge', text: 'Validate the Director’s concern with respect.', example: 'While I fully appreciate Director Pendelton’s concern regarding FX volatility...' },
        { label: 'Pivot', text: 'Transition using authoritative evidence.', example: '...our stress-testing model demonstrates that the first-loss concessional tranche...' },
        { label: 'Caveat', text: 'Establish clear boundary & safeguard condition.', example: '...provided the Ministry of Finance executes the counter-indemnity agreement.' }
      ]
    },
    STARE: {
      name: 'STAR-E Framework',
      tagline: 'MDB Project Appraisal & Execution Review',
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
      icon: FileCheck,
      steps: [
        { label: 'S - Situation', text: 'Describe the macro/regional project context.', example: 'The Pacific Island country faced acute energy tariff spikes.' },
        { label: 'T - Task', text: 'Detail the MDB mandate & technical assistance goal.', example: 'ADB was tasked with structuring a $45M solar microgrid facility.' },
        { label: 'A - Action', text: 'Explain procurement & institutional execution.', example: 'We mobilized JICA co-financing and established a PIU within the Energy Ministry.' },
        { label: 'R - Result', text: 'Highlight operational milestone achievement.', example: 'Civil works completed 2 months ahead of schedule with 0 safeguard breaches.' },
        { label: 'E - Economic Impact', text: 'Quantify EIRR & long-term development outcome.', example: 'Yielded a 15.8% EIRR while offsetting 120,000 tons of carbon emissions annually.' }
      ]
    },
    POLICY_4P: {
      name: '4P Policy Pitch',
      tagline: 'Policy-Based Lending & Structural Reforms',
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-400',
      icon: Layers,
      steps: [
        { label: 'P - Problem', text: 'Identify sovereign fiscal deficit or institutional flaw.', example: 'SOE debt obligations threaten sovereign fiscal sustainability.' },
        { label: 'P - Policy Intervention', text: 'Introduce policy matrix & structural conditionalities.', example: 'Conditioning loan disbursement on enacting independent utility tariff regulation.' },
        { label: 'P - Proof / Data', text: 'Present PFM diagnostic audit & baseline evidence.', example: 'Supported by World Bank-ADB PFM diagnostic confirming 18% cost efficiency gains.' },
        { label: 'P - Proposal', text: 'Deliver the financing recommendation & tranche schedule.', example: 'We recommend immediate approval of the $300M single-tranche policy loan.' }
      ]
    },
    CAR_RISK: {
      name: 'CAR Risk Framework',
      tagline: 'Macroeconomic Sensitivity & Exogenous Shocks',
      color: 'border-rose-500/50 bg-rose-950/20 text-rose-400',
      icon: AlertTriangle,
      steps: [
        { label: 'C - Context', text: 'State macro exposure or market vulnerability.', example: 'The sovereign borrower maintains 70% of public debt in USD.' },
        { label: 'A - Adverse Exposure', text: 'Quantify worst-case shock & currency depreciation.', example: 'A 25% currency devaluation elevates the debt-to-GDP ratio to 68%.' },
        { label: 'R - Risk Mitigation', text: 'Detail credit enhancement & contingent liquidity.', example: 'Our first-loss guarantee tranche and 5-year grace period insulate against default.' }
      ]
    }
  };

  const current = frameworks[selectedTab] || frameworks.PREP;
  const IconComponent = current.icon;

  const handleSelect = (key) => {
    setSelectedTab(key);
    if (onSelectFramework) onSelectFramework(key);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-200">Interactive MDB Speaking Scaffolds</h3>
            <p className="text-[11px] text-slate-400">6 Specialized Executive Teleprompters & Framework Cards</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {Object.keys(frameworks).map((key) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTab === key
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {key.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className={`p-3.5 rounded-xl border ${current.color} flex items-center justify-between`}>
          <div>
            <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <IconComponent className="w-4 h-4" />
              {current.name}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">{current.tagline}</p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Active Teleprompter
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {current.steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-3 rounded-xl transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-cyan-400">{step.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <p className="text-xs text-slate-300 font-medium mb-1">{step.text}</p>
              <p className="text-[11px] text-slate-400 italic bg-slate-900/90 p-2 rounded border border-slate-800/50">
                "{step.example}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
