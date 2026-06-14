'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: 'Headphones', slug: 'headphones', icon: '🎧', count: products.filter(p => p.category === 'headphones').length },
    { name: 'Wireless Earbuds', slug: 'earbuds', icon: '✨', count: products.filter(p => p.category === 'earbuds').length },
    { name: 'Smartwatches', slug: 'smartwatch', icon: '⌚', count: products.filter(p => p.category === 'smartwatch').length },
    { name: 'Powerbanks', slug: 'powerbank', icon: '🔋', count: products.filter(p => p.category === 'powerbank').length }
  ];

  const upcomingProducts = products.filter((p) => p.upcoming);
  const newArrivals = products.filter((p) => p.isNew && !p.upcoming).slice(0, 4);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-accent/20 border-t-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
        <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">Loading Premium Tech...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20 animate-fade-in-up">
        {/* 1. Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-white/5 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center gap-10 mt-6 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex-1 flex flex-col space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-primary font-bold w-max mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVITY AT YOUR DOORSTEP</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-[1.15]">
            Premium Gadgets <br />
            <span className="bg-gradient-to-r from-primary via-[#a335ff] to-accent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              at Best Prices
            </span>
          </h1>
          
          <p className="text-gray-400 text-base max-w-lg leading-relaxed">
            Discover the next generation of sound, style, and power. Explore handpicked earbuds, high-performance headphones, smartwatch monitors, and elite chargers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Link 
              href="/shop" 
              className="px-8 py-3.5 glow-btn-primary rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              <span>Explore Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3.5 rounded-xl text-center text-sm font-semibold border border-white/10 hover:border-primary text-gray-300 hover:text-primary bg-white/3 hover:bg-primary/5 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero image placeholder or visuals */}
        <div className="flex-1 relative w-full aspect-video md:aspect-square flex items-center justify-center max-w-md">
          <div className="absolute inset-0 rounded-full bg-radial from-primary/10 to-transparent blur-2xl animate-pulse-glow pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" 
            alt="Sony Wireless Headphones" 
            className="w-80 h-80 object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.3)] animate-[float_4s_ease-in-out_infinite]"
          />
        </div>
      </section>

      {/* 2. Key Trust Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Superfast Delivery</h4>
            <p className="text-xs text-gray-400">Dhaka wide inside 24 hours</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[#bd00ff]/10 flex items-center justify-center text-accent flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Real-time Tracking</h4>
            <p className="text-xs text-gray-400">Order verification and logs</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">100% Genuine Tech</h4>
            <p className="text-xs text-gray-400">Official brand warranties</p>
          </div>
        </div>
      </section>

      {/* 3. Category Selector */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Browse Categories</h2>
          <p className="text-gray-400 text-xs mt-1.5">Select a collection to filter your needs</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/shop?category=${cat.slug}`}
              className="group glass-panel glass-panel-hover p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-3"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">{cat.icon}</span>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">{cat.count} Items</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">New Arrivals</h2>
              <p className="text-gray-400 text-xs mt-1">Explore our latest additions to the catalog</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-primary flex items-center space-x-1 hover:underline group">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenDetails={setSelectedProduct} 
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Upcoming Products Slider */}
      {upcomingProducts.length > 0 && (
        <section className="space-y-8 bg-gradient-to-r from-accent/5 via-[#00f0ff]/2 to-transparent rounded-3xl p-8 border border-white/5">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Upcoming Products</h2>
              <p className="text-gray-400 text-xs mt-1">Be the first to review upcoming catalog launches</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-primary flex items-center space-x-1 hover:underline group">
              <span>Filter Shop</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar">
            {upcomingProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] w-72 snap-start flex-shrink-0">
                <ProductCard 
                  product={product} 
                  onOpenDetails={setSelectedProduct} 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Top Rated Section */}
      {topRated.length > 0 && (
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Top Rated Products</h2>
              <p className="text-gray-400 text-xs mt-1">Our highest customer reviewed gadget lineup</p>
            </div>
            <Link href="/shop" className="text-xs font-bold text-primary flex items-center space-x-1 hover:underline group">
              <span>Shop All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRated.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenDetails={setSelectedProduct} 
              />
            ))}
          </div>
        </section>
      )}

      </div>
      
      {/* Product Details Modal Overlay */}
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
