'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { showToast } = useApp();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(data.message || 'Message sent successfully!', 'success');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        showToast(data.message || 'Failed to submit message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      showToast('Error connecting to server. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Contact Us</h2>
        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
          Have questions about a product or order? Drop us a line and our dedicated gadget expert team will contact you back inside 24 hours.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Contact cards */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-bold font-display text-white text-base border-b border-white/5 pb-2">
              Support Channels
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Helpline Number</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Call our support desk directly</p>
                  <p className="text-sm text-white font-bold mt-1">+880 1867610022</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#bd00ff]/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Email Support</h4>
                  <p className="text-xs text-gray-400 mt-0.5">For queries, orders and bulk updates</p>
                  <p className="text-sm text-white font-bold mt-1">info@tryusbd.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Corporate Address</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Visit our physical headquarters</p>
                  <p className="text-sm text-white font-bold mt-1 leading-relaxed">
                    55/6, North Manikdee, Dhaka Cantonment, Dhaka
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Working Hours</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Operational days and hours</p>
                  <p className="text-sm text-white font-bold mt-1">
                    Sunday - Friday (10:00 AM - 8:00 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Visual Element */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-accent/5">
            <MessageSquare className="w-10 h-10 text-primary flex-shrink-0 animate-pulse-glow" />
            <div>
              <h4 className="font-bold text-white text-sm">Active Live Monitoring</h4>
              <p className="text-xs text-gray-400">All submissions log directly to our database and alert admins immediately.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="flex-grow">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="font-bold font-display text-white text-lg border-b border-white/5 pb-3">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01788XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full glass-input text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you need help with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full glass-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 glow-btn-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50"
              >
                {sending ? 'Sending Message...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
