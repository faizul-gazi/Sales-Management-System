'use client';

import React from 'react';
import { useApp, Product } from '@/context/AppContext';
import { Star, ShoppingCart, Heart, StarHalf } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
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

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(product);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-primary text-[#090a0f] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            New
          </span>
        )}
        {product.upcoming && (
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-accent text-white shadow-[0_0_10px_rgba(189,0,255,0.4)]">
            Upcoming
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative aspect-square w-full bg-white/2 overflow-hidden flex items-center justify-center border-b border-white/5 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallbacks for broken image links
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

      {/* Info container */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold mb-1">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-white group-hover:text-primary transition-all line-clamp-1 mb-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1.5 mb-3">
          <div className="flex items-center space-x-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-400 font-medium">({product.rating})</span>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-lg font-black text-white font-display">
            ৳{product.price.toLocaleString()}
          </span>
          
          <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-lg border transition-all ${
                isWishlisted 
                  ? 'bg-accent/10 border-accent text-accent shadow-[0_0_10px_rgba(189,0,255,0.25)]' 
                  : 'border-white/10 text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/5'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-accent' : ''}`} />
            </button>
            
            {!product.upcoming && (
              <button
                onClick={() => addToCart(product)}
                className="p-2 rounded-lg bg-primary text-[#090a0f] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all font-semibold flex items-center justify-center hover:scale-105"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
