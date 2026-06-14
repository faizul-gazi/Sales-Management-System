'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight, ClipboardCheck, User, Phone, MapPin, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (e) {
        console.error('Failed to parse confirmation order data:', e);
      }
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-6">
        <div className="w-20 h-20 bg-white/2 rounded-full border border-white/5 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <ShoppingBag className="w-8 h-8 text-gray-500 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">No Order Found</h2>
          <p className="text-gray-400 text-sm">We couldn't retrieve your last order details.</p>
        </div>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 glow-btn-primary rounded-xl text-sm font-semibold"
        >
          <span>Go to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      {/* Status card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 text-center space-y-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Order Placed Successfully!</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Thank you for shopping with us. Your cash on delivery order has been logged and is being processed.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3 border border-white/5 text-sm">
          <ClipboardCheck className="w-4.5 h-4.5 text-primary" />
          <span className="text-gray-400 font-semibold">Order ID:</span>
          <span className="text-white font-black">#TBD-{order.orderId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Customer info */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <h3 className="font-bold font-display text-white text-base border-b border-white/5 pb-2">
            Shipping Information
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center text-gray-300">
              <User className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span className="font-semibold">{order.name}</span>
            </li>
            <li className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span>{order.phone}</span>
            </li>
            <li className="flex items-start text-gray-300">
              <MapPin className="w-4 h-4 mr-3 text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{order.address}</span>
            </li>
            <li className="flex items-center text-gray-300">
              <Truck className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
              <span className="capitalize">{order.delivery === 'inside' ? 'Inside Dhaka (24hr Delivery)' : 'Outside Dhaka (2-3 days Delivery)'}</span>
            </li>
          </ul>
        </div>

        {/* Pricing info */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <h3 className="font-bold font-display text-white text-base border-b border-white/5 pb-2">
            Pricing Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">৳{Number(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping Charge</span>
              <span className="font-semibold text-white">৳{order.deliveryCharge}</span>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between text-base font-bold text-white">
              <span>Total Amount</span>
              <span className="text-lg font-black text-primary font-display">৳{Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 mb-8">
        <h3 className="font-bold font-display text-white text-base border-b border-white/5 pb-2">
          Ordered Items
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {order.items?.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/2 last:border-0 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/5 p-1 flex items-center justify-center flex-shrink-0">
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
                <div>
                  <h4 className="font-bold text-white leading-snug line-clamp-1">{item.name}</h4>
                  <span className="text-xs text-gray-500">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</span>
                </div>
              </div>
              <span className="font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 px-8 py-3.5 glow-btn-primary rounded-xl text-sm font-semibold hover:scale-[1.02] transition-all"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
