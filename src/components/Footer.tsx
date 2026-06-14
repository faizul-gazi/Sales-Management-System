'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/5 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent w-max">
            TryUsBD
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            TechGadget BD is your trusted source for premium gadgets, headphones, smartwatches, and chargers in Bangladesh.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-muted hover:bg-primary hover:text-background transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-muted hover:bg-accent hover:text-white transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-muted hover:bg-primary hover:text-background transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-foreground font-semibold font-display text-base tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'Shop Catalog', path: '/shop' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact Us', path: '/contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="text-muted hover:text-primary text-sm flex items-center group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 group-hover:translate-x-1 transition-transform" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-foreground font-semibold font-display text-base tracking-wide">
            Top Categories
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'Headphones', path: '/shop?category=headphones' },
              { label: 'Wireless Earbuds', path: '/shop?category=earbuds' },
              { label: 'Smartwatches', path: '/shop?category=smartwatch' },
              { label: 'Powerbanks & Chargers', path: '/shop?category=powerbank' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.path} className="text-muted hover:text-primary text-sm flex items-center group transition-all">
                  <ChevronRight className="w-3.5 h-3.5 mr-1 group-hover:translate-x-1 transition-transform" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-foreground font-semibold font-display text-base tracking-wide">
            Contact Info
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center text-muted">
              <Mail className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span>info@tryusbd.com</span>
            </li>
            <li className="flex items-center text-muted">
              <Phone className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span>+880 1867610022</span>
            </li>
            <li className="flex items-start text-muted">
              <MapPin className="w-4 h-4 mr-3 text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                55/6, North Manikdee,<br />Dhaka Cantonment, Dhaka
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-foreground/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted/70 gap-4">
        <p>&copy; {new Date().getFullYear()} Gazi Faizul Islam. All rights reserved.</p>
        <p>Premium Gadgets at Best Prices</p>
      </div>
    </footer>
  );
}
