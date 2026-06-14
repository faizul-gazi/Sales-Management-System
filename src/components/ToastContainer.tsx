'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5" />;
        let borderClass = 'border-[#00f0ff]/20';
        let glowClass = 'shadow-[0_0_15px_rgba(0,240,255,0.15)]';
        let iconColor = 'text-[#00f0ff]';

        switch (toast.type) {
          case 'success':
            icon = <CheckCircle className="w-5 h-5" />;
            borderClass = 'border-emerald-500/20';
            glowClass = 'shadow-[0_0_15px_rgba(16,185,129,0.15)]';
            iconColor = 'text-emerald-400';
            break;
          case 'error':
            icon = <AlertCircle className="w-5 h-5" />;
            borderClass = 'border-rose-500/20';
            glowClass = 'shadow-[0_0_15px_rgba(244,63,94,0.15)]';
            iconColor = 'text-rose-400';
            break;
          case 'warning':
            icon = <AlertTriangle className="w-5 h-5" />;
            borderClass = 'border-amber-500/20';
            glowClass = 'shadow-[0_0_15px_rgba(245,158,11,0.15)]';
            iconColor = 'text-amber-400';
            break;
          case 'info':
            icon = <Info className="w-5 h-5" />;
            borderClass = 'border-[#bd00ff]/20';
            glowClass = 'shadow-[0_0_15px_rgba(189,0,255,0.15)]';
            iconColor = 'text-[#bd00ff]';
            break;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border bg-[#0d0f19]/90 backdrop-blur-md transition-all duration-300 animate-fade-in-up ${borderClass} ${glowClass}`}
          >
            <div className="flex items-center space-x-3">
              <span className={iconColor}>{icon}</span>
              <p className="text-gray-200 text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-all pl-3 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
