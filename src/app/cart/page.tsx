'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, showToast } = useApp();
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState('inside'); // 'inside' or 'outside'
  const [submitting, setSubmitting] = useState(false);

  // Totals calculations
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = delivery === 'inside' ? 60 : 110;
  const total = subtotal + deliveryCharge;

  // Checkout submission handler
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          delivery,
          cartItems: cart,
          subtotal,
          deliveryCharge,
          total,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(data.message || 'Order placed successfully!', 'success');
        
        // Save order details to localStorage for confirmation screen
        const lastOrder = {
          orderId: data.orderId,
          name,
          phone,
          email,
          address,
          delivery,
          items: cart,
          subtotal,
          deliveryCharge,
          total
        };
        localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
        
        // Clear global cart state
        clearCart();
        
        // Redirect to order confirmation page
        router.push('/order-confirmation');
      } else {
        showToast(data.message || 'Failed to place order. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showToast('Error connecting to server. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-6">
        <div className="w-20 h-20 bg-white/2 rounded-full border border-white/5 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <ShoppingBag className="w-8 h-8 text-gray-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-gray-400 text-sm">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 px-6 py-3 glow-btn-primary rounded-xl text-sm font-semibold transition-transform"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-8">Shopping Cart</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Cart items */}
        <div className="flex-grow space-y-4">
          <div className="flex justify-between items-center bg-[#0d0f19]/40 border border-white/5 px-4 py-3 rounded-xl">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items ({cart.length})</span>
            <button 
              onClick={clearCart}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/5"
              >
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-xl border border-white/5 p-2 flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{item.category}</span>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">{item.name}</h3>
                  <p className="text-sm font-semibold text-gray-400 mt-1">৳{item.price.toLocaleString()}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-white/10 rounded-xl bg-white/2 overflow-hidden h-9">
                  <button 
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="px-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all focus:outline-none"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-sm text-white font-bold min-w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="px-3 hover:bg-white/5 text-gray-400 hover:text-white transition-all focus:outline-none"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 border border-white/5 hover:border-rose-500/35 text-gray-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all"
                  title="Remove from Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Form & Total */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 sticky top-28">
            <h3 className="font-bold font-display text-white text-lg border-b border-white/5 pb-3 flex items-center gap-2">
              <CreditCard className="w-4.5 h-4.5 text-primary" />
              Checkout Details
            </h3>

            {/* Calculations summary */}
            <div className="space-y-3.5 border-b border-white/5 pb-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
              </div>
              
              {/* Delivery selectors */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Shipping Option
                </span>
                <div className="flex gap-3">
                  <label className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    delivery === 'inside' 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-white/5 text-gray-400 hover:border-white/10'
                  }`}>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="inside"
                      checked={delivery === 'inside'}
                      onChange={() => setDelivery('inside')}
                      className="hidden" 
                    />
                    <div className="text-xs font-bold">Inside Dhaka</div>
                    <div className="text-[10px] opacity-75 mt-0.5">৳60</div>
                  </label>
                  <label className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    delivery === 'outside' 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-white/5 text-gray-400 hover:border-white/10'
                  }`}>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="outside"
                      checked={delivery === 'outside'}
                      onChange={() => setDelivery('outside')}
                      className="hidden" 
                    />
                    <div className="text-xs font-bold">Outside Dhaka</div>
                    <div className="text-[10px] opacity-75 mt-0.5">৳110</div>
                  </label>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-400 pt-2">
                <span>Shipping Charge</span>
                <span className="font-semibold text-white">৳{deliveryCharge}</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center text-base font-bold text-white">
              <span>Total Amount</span>
              <span className="text-xl font-black text-primary font-display">৳{total.toLocaleString()}</span>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckout} className="space-y-4 pt-2 border-t border-white/5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
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

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email (Optional)</label>
                <input 
                  type="email" 
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Delivery Address *</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="House, Road, Area, District"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full glass-input text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 mt-2 glow-btn-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? 'Processing Order...' : 'Place Cash on Delivery Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
