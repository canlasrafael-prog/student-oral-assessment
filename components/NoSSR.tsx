'use client';

import React, { useEffect, useState } from 'react';

export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400" suppressHydrationWarning>
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping" />
          <span className="text-sm font-medium">Loading session...</span>
        </div>
      </div>
    );
  }

  return <div suppressHydrationWarning>{children}</div>;
}
