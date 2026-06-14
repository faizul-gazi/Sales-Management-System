'use client';

import React, { useState } from 'react';
import { useApp, Product } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Wishlist() {
  const { wishlist } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-6">
        <div className="w-20 h-20 bg-white/2 rounded-full border border-white/5 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <Heart className="w-8 h-8 text-gray-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-gray-400 text-sm">Save items that you want to buy later here.</p>
        </div>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 px-6 py-3 glow-btn-primary rounded-xl text-sm font-semibold transition-transform"
        >
          <span>Explore Shop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">My Wishlist</h2>
          <p className="text-gray-400 text-xs mt-1">Products you saved for later</p>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase bg-white/3 border border-white/5 px-3.5 py-1.5 rounded-xl">
          {wishlist.length} Saved Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetails={setSelectedProduct}
          />
        ))}
      </div>

      </div>

      {/* Product details overlay modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
