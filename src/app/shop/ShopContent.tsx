'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Search, SlidersHorizontal, RefreshCw, X } from 'lucide-react';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [priceRangeLimit, setPriceRangeLimit] = useState<number>(100000);
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load products & check URL params
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          
          // Calculate max price from products to set limits
          const prices = data.map((p) => p.price);
          const maxP = prices.length > 0 ? Math.max(...prices) : 100000;
          setPriceRangeLimit(maxP);
          setMaxPrice(maxP);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Update categories from search parameters on load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Extract all categories & brands dynamically from products list
  const categoriesList = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const brandsList = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[];
  }, [products]);

  // Handle category checkbox toggle
  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  // Handle brand checkbox toggle
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(priceRangeLimit);
    setSortBy('default');
    router.replace('/shop');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.includes(product.category);
      
      const matchesBrand = selectedBrands.length === 0 || 
                           (product.brand && selectedBrands.includes(product.brand));
      
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Apply Sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        </div>
        <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">Loading Catalog...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-bold font-display text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Filters
              </h3>
              <button 
                onClick={handleClearFilters}
                className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/2 border border-white/5 text-sm text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</label>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {categoriesList.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="rounded bg-white/5 border-white/10 text-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-primary"
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Brands</label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {brandsList.map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded bg-white/5 border-white/10 text-primary focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-primary"
                    />
                    <span className="capitalize">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</label>
              <input
                type="range"
                min="0"
                max={priceRangeLimit}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary bg-white/10 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center gap-2 text-xs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-20 px-2 py-1 bg-white/2 border border-white/5 rounded text-center text-white focus:outline-none"
                />
                <span className="text-gray-500">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 px-2 py-1 bg-white/2 border border-white/5 rounded text-center text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <div className="flex-grow space-y-6">
          {/* Shop Header Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0d0f19]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white font-display">
              All Products ({filteredProducts.length})
            </h2>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {/* Mobile filter toggle */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-primary rounded-xl text-xs font-semibold text-gray-300 w-1/2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/2 border border-white/5 text-xs text-gray-300 w-1/2 sm:w-44 focus:outline-none cursor-pointer"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid of Product Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-16 text-center border border-white/5">
              <p className="text-gray-400 font-medium text-base mb-2">No products match your filters</p>
              <button
                onClick={handleClearFilters}
                className="text-xs text-primary hover:underline font-bold"
              >
                Reset Filters and Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-[#050508]/80 backdrop-blur-sm" 
          />
          {/* Drawer content */}
          <div className="absolute inset-y-0 right-0 w-80 max-w-xs bg-[#0a0b10] border-l border-white/5 p-6 flex flex-col justify-between shadow-2xl z-10 animate-fade-in-up">
            <div className="space-y-6 overflow-y-auto flex-grow pr-1">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-bold font-display text-white flex items-center gap-2 text-base">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/2 border border-white/5 text-sm text-white focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</label>
                <div className="flex flex-col gap-2">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded bg-white/5 border-white/10 text-primary w-4 h-4 accent-primary"
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Brands</label>
                <div className="flex flex-col gap-2">
                  {brandsList.map((brand) => (
                    <label key={brand} className="flex items-center space-x-3 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded bg-white/5 border-white/10 text-primary w-4 h-4 accent-primary"
                      />
                      <span className="capitalize">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max={priceRangeLimit}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-white/10 h-1 rounded-lg"
                />
                <div className="flex justify-between items-center gap-2 text-xs">
                  <span className="text-gray-400">৳{minPrice}</span>
                  <span className="text-gray-400">৳{maxPrice}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-400 hover:text-white"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-2.5 glow-btn-primary rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
