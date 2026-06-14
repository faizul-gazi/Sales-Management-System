'use client';

import React, { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function Shop() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[#00f0ff]/20 border-t-[#00f0ff] animate-spin"></div>
          </div>
          <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">
            Loading Catalog...
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
