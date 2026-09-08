'use client';

import dynamic from 'next/dynamic';

const RegisterClient = dynamic(() => import('./RegisterClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      <div className="animate-pulse flex items-center gap-2">
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping" />
        <span className="text-sm font-medium">Loading assessment registration...</span>
      </div>
    </div>
  ),
});

export default function RegisterPage() {
  return <RegisterClient />;
}
