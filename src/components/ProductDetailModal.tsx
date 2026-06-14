'use client';

import React from 'react';
import { useApp, Product } from '@/context/AppContext';
import { Star, StarHalf, X, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  // Generate star rating icons
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < floorRating; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    }
    if (hasHalf) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />);
    }
    const emptyCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyCount; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />);
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#050508]/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 z-10 animate-fade-in-up flex flex-col md:flex-row gap-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all p-1.5 rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Image & Action buttons */}
        <div className="w-full md:w-5/12 flex flex-col justify-between items-center gap-6">
          <div className="w-full aspect-square glass-panel bg-white/2 rounded-2xl p-6 flex items-center justify-center border border-white/5 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallbackImages: Record<string, string> = {
                  headphones: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60',
                  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=60',
                  smartwatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
                  powerbank: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=60'
                };
                target.src = fallbackImages[product.category] || fallbackImages.headphones;
              }}
            />
          </div>

          <div className="w-full flex gap-3">
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isWishlisted
                  ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(189,0,255,0.2)]'
                  : 'border-white/10 text-gray-300 hover:border-accent hover:text-accent hover:bg-accent/5'
              }`}
            >
              <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-accent' : ''}`} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            {!product.upcoming && (
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 px-4 glow-btn-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                Add to Cart
              </button>
            )}
          </div>
          
          {/* Support Badges */}
          <div className="w-full grid grid-cols-3 gap-2 text-[10px] text-gray-400 mt-2">
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white/2 border border-white/2">
              <ShieldCheck className="w-4 h-4 text-primary mb-1" />
              <span>Original Product</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white/2 border border-white/2">
              <Truck className="w-4 h-4 text-primary mb-1" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white/2 border border-white/2">
              <RotateCcw className="w-4 h-4 text-primary mb-1" />
              <span>7 Days Return</span>
            </div>
          </div>
        </div>

        {/* Right column: Specs, rating, reviews */}
        <div className="w-full md:w-7/12 flex flex-col">
          <span className="text-xs uppercase tracking-widest text-primary font-black mb-1">
            {product.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display mb-2">
            {product.name}
          </h2>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-300 font-bold">({product.rating})</span>
          </div>

          <p className="text-2xl font-black text-white font-display mb-6">
            ৳{product.price.toLocaleString()}
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                Description
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                  Specifications
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/2 py-1.5">
                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-gray-300 font-medium text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-b border-white/5 pb-1">
                Reviews ({product.reviews?.length || 0})
              </h4>
              <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/2 border border-white/2 flex flex-col gap-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-300">{rev.user}</span>
                        <span className="text-gray-500">{rev.date}</span>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        {renderStars(rev.rating)}
                      </div>
                      <p className="text-gray-400 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs italic">No reviews yet for this product.</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
