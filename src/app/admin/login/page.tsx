'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, User, Lock, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const { showToast } = useApp();
  const router = useRouter();

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_logged_in') === 'true') {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showToast('Please fill in both username and password.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Login successful! Welcoming admin.', 'success');
        localStorage.setItem('admin_logged_in', 'true');
        router.push('/admin/dashboard');
      } else {
        showToast(data.message || 'Invalid username or password.', 'error');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      showToast('Connection error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center space-y-2 relative">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent shadow-[0_0_15px_rgba(189,0,255,0.15)] mb-3">
            <ShieldAlert className="w-6 h-6 animate-pulse-glow" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">Administrator Portal</h2>
          <p className="text-xs text-gray-400">Access stats, track orders, and view support messages</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-4 relative">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full glass-input text-sm pl-10"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input text-sm pl-10"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-4 glow-btn-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <KeyRound className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-[10px] text-gray-500">
          <span>Protected session. Credentials: admin / admin123</span>
        </div>
      </div>
    </div>
  );
}
