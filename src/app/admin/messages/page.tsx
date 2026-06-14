'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useApp } from '@/context/AppContext';
import { Search, MessageSquare, User, Phone, Mail, Calendar, HelpCircle } from 'lucide-react';

export default function AdminMessages() {
  const { showToast } = useApp();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching admin messages:', error);
      showToast('Failed to load customer messages.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages by search query
  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = msg.name?.toLowerCase().includes(query);
    const phoneMatch = msg.phone?.includes(query);
    const emailMatch = msg.email?.toLowerCase().includes(query);
    const textMatch = msg.message?.toLowerCase().includes(query);
    
    return nameMatch || phoneMatch || emailMatch || textMatch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">Loading Messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <AdminHeader />

      <div className="space-y-6">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0d0f19]/40 border border-white/5 p-4 rounded-2xl">
          <h2 className="text-base font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4.5 h-4.5 text-primary" />
            Customer Messages ({filteredMessages.length})
          </h2>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name, email, query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/2 border border-white/5 text-xs text-white focus:outline-none focus:border-primary/50"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Message Cards List */}
        {filteredMessages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-4 relative overflow-hidden"
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                    <div className="flex items-center space-x-2 text-white font-bold text-sm">
                      <User className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{msg.name}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-[10px] gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{msg.phone}</span>
                    </div>
                    {msg.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{msg.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message text */}
                <div className="flex-grow">
                  <p className="text-gray-300 text-xs leading-relaxed bg-white/2 border border-white/2 p-3.5 rounded-xl font-mono whitespace-pre-line italic">
                    "{msg.message}"
                  </p>
                </div>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/2 rounded-full blur-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-16 text-center border border-white/5">
            <HelpCircle className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 font-medium text-xs">No customer support messages found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
