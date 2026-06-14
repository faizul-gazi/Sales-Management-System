'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useApp();
  const [authorized, setAuthorized] = useState(false);

  // Authentication guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      if (!isLoggedIn) {
        showToast('Unauthorized access. Please log in first.', 'error');
        router.replace('/admin/login');
      } else {
        setAuthorized(true);
      }
    }
  }, [router, showToast]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    showToast('Logged out successfully.', 'info');
    router.replace('/admin/login');
  };

  if (!authorized) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <ShieldAlert className="w-10 h-10 text-rose-500 animate-bounce" />
        <p className="text-sm tracking-wider uppercase font-bold text-rose-400">Verifying Admin Access...</p>
      </div>
    );
  }

  const menuLinks = [
    { label: 'Analytics', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Manage Orders', path: '/admin/orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Customer Messages', path: '/admin/messages', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 mb-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0d0f19]/60 border border-white/5 p-5 rounded-2xl backdrop-blur-md">
        
        {/* Title */}
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h2 className="text-lg font-black font-display text-white tracking-wide uppercase">
            Admin Console
          </h2>
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {menuLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_0_10px_rgba(0,240,255,0.1)]' 
                    : 'border border-transparent text-gray-400 hover:text-white hover:bg-white/3'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-transparent text-rose-400 hover:bg-rose-500/5 hover:border-rose-500/15 transition-all focus:outline-none cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
}
