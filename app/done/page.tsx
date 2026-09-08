'use client';

import dynamic from 'next/dynamic';

const DoneClient = dynamic(() => import('./DoneClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      <div className="animate-pulse flex items-center gap-2">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
        <span className="text-sm font-medium">Loading summary...</span>
      </div>
    </div>
  ),
});

export default function DonePage() {
  return <DoneClient />;
}
