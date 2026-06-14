'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  upcoming?: boolean;
  description: string;
  specifications: Record<string, string>;
  brand?: string;
  reviews?: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  toasts: Toast[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, change: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: number) => boolean;
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load initial state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart local storage:', e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist local storage:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save to local storage when state changes
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const updateWishlist = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: any) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      updateCart(newCart);
    } else {
      updateCart([...cart, { ...product, quantity: 1 }]);
    }
    showToast(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (productId: number) => {
    const item = cart.find((i) => i.id === productId);
    updateCart(cart.filter((item) => item.id !== productId));
    if (item) showToast(`${item.name} removed from cart`, 'info');
  };

  const updateCartQuantity = (productId: number, change: number) => {
    const newCart = cart
      .map((item) => {
        if (item.id === productId) {
          const qty = item.quantity + change;
          return { ...item, quantity: qty < 1 ? 1 : qty };
        }
        return item;
      });
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const toggleWishlist = (product: any) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      updateWishlist(wishlist.filter((item) => item.id !== product.id));
      showToast(`${product.name} removed from wishlist`, 'info');
    } else {
      updateWishlist([...wishlist, product]);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        toasts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
