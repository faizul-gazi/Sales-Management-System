'use client';

import React from 'react';
import { Target, Award, Users, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up space-y-16">
      
      {/* Introduction Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black font-display text-white">About TryUsBD</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        <p className="text-gray-400 text-base leading-relaxed">
          Founded in Dhaka, Bangladesh, TryUsBD was created to solve a persistent challenge in the local gadget market: finding 100% genuine, premium-quality products at competitive prices, backed by authentic warranty support.
        </p>
      </section>

      {/* Core Values grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Authenticity First</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            We bypass middlemen and import directly from global authorized distributors. Every headphone, earbud, and watch we sell is verified genuine.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto shadow-[0_0_15px_rgba(189,0,255,0.1)]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Customer Obsession</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            From checkout support to official brand warranties and quick replacements, your shopping satisfaction is our highest KPI.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">Rapid Operations</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            With our own dedicated delivery partners, we ensure that orders placed within Dhaka Cantonment and Dhaka city are shipped to your doorstep inside 24 hours.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="glass-panel rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold font-display text-white">Our Product Philosophy</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            We understand that technology isn't just about utility; it's an extension of your lifestyle. That's why we focus on curating gadgets that meet three strict criteria:
          </p>
          <ul className="space-y-3.5 text-xs text-gray-300">
            <li className="flex items-center">
              <Award className="w-4 h-4 mr-2.5 text-primary flex-shrink-0" />
              <span><strong>Design Excellence</strong>: Award-winning aesthetics that look premium on you.</span>
            </li>
            <li className="flex items-center">
              <Target className="w-4 h-4 mr-2.5 text-primary flex-shrink-0" />
              <span><strong>Acoustic & Hardware Precision</strong>: Uncompromising specs, battery life, and durability.</span>
            </li>
            <li className="flex items-center">
              <Users className="w-4 h-4 mr-2.5 text-primary flex-shrink-0" />
              <span><strong>High Reviews</strong>: Proven customer ratings across global tech forums.</span>
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60" 
            alt="Bose Headphones design" 
            className="rounded-2xl w-full max-w-sm aspect-video object-cover border border-white/5"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-6 py-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Ready to upgrade your tech game?</h3>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 px-8 py-3.5 glow-btn-primary rounded-xl text-sm font-semibold hover:scale-102 transition-transform"
        >
          <span>Browse the Catalog</span>
        </Link>
      </section>

    </div>
  );
}
