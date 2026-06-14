'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShoppingCart, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-nav backdrop-blur-md border-b border-foreground/5 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <h1 className="text-2xl font-black font-display tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all">
              TryUsBD
            </h1>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-all hover:text-primary ${
                    isActive ? 'text-primary drop-shadow-[0_0_4px_rgba(0,240,255,0.4)]' : 'text-muted'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/wishlist" className="relative text-muted hover:text-primary transition-all">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative text-muted hover:text-primary transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-[#090a0f] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            <Link href="/admin/login" className="text-muted hover:text-primary transition-all">
              <User className="w-5 h-5" />
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-foreground/5 text-muted hover:text-primary hover:bg-foreground/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-accent" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-foreground/5 text-muted hover:text-primary transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-primary" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-accent" />
              )}
            </button>

            <Link href="/cart" className="relative text-muted hover:text-primary transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-[#090a0f] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted hover:text-primary transition-all focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-y-0 right-0 w-64 bg-background/95 backdrop-blur-md border-l border-foreground/10 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full py-6 px-6 justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-foreground/10">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-primary focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-semibold transition-all ${
                      isActive ? 'text-primary' : 'text-muted hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-foreground/10 flex items-center justify-around">
            <Link href="/wishlist" onClick={() => setIsOpen(false)} className="relative text-muted hover:text-primary transition-all">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="text-muted hover:text-primary transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-primary" />
              ) : (
                <Moon className="w-6 h-6 text-accent" />
              )}
            </button>

            <Link href="/admin/login" onClick={() => setIsOpen(false)} className="text-muted hover:text-primary transition-all">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
