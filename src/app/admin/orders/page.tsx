'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useApp } from '@/context/AppContext';
import { Search, ChevronDown, ChevronUp, CheckCircle, PackageOpen, HelpCircle } from 'lucide-react';

export default function AdminOrders() {
  const { showToast } = useApp();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search query & expanded items tracking
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching admin orders:', error);
      showToast('Failed to load orders list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Toggle detail rows
  const toggleExpandOrder = (id: number) => {
    setExpandedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Mark an order as completed
  const handleCompleteOrder = async (orderId: number) => {
    setCompletingId(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}/complete`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        showToast(`Order #TBD-${orderId} marked as completed.`, 'success');
        // Reload list
        await fetchOrders();
      } else {
        showToast(data.message || 'Failed to complete order.', 'error');
      }
    } catch (error) {
      console.error('Error completing order:', error);
      showToast('Connection error. Please try again.', 'error');
    } finally {
      setCompletingId(null);
    }
  };

  // Filter orders by search query
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const idMatch = `#tbd-${order.id}`.includes(query) || String(order.id).includes(query);
    const nameMatch = order.customer_name?.toLowerCase().includes(query);
    const phoneMatch = order.phone?.includes(query);
    const addressMatch = order.address?.toLowerCase().includes(query);
    
    return idMatch || nameMatch || phoneMatch || addressMatch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">Loading Orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <AdminHeader />

      <div className="space-y-6">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0d0f19]/40 border border-white/5 p-4 rounded-2xl">
          <h2 className="text-base font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <PackageOpen className="w-4.5 h-4.5 text-primary" />
            Manage Orders ({filteredOrders.length})
          </h2>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by ID, name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/2 border border-white/5 text-xs text-white focus:outline-none focus:border-primary/50"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            {filteredOrders.length > 0 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider font-extrabold bg-[#0d0f19]/20">
                    <th className="py-4 px-4 w-10"></th>
                    <th className="py-4 px-2">Order ID</th>
                    <th className="py-4 px-2">Customer Details</th>
                    <th className="py-4 px-2">Total Amount</th>
                    <th className="py-4 px-2">Status</th>
                    <th className="py-4 px-2">Shipping</th>
                    <th className="py-4 px-2">Date</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/2 text-gray-300">
                  {filteredOrders.map((ord) => {
                    const isExpanded = expandedOrders.includes(ord.id);
                    return (
                      <React.Fragment key={ord.id}>
                        <tr 
                          onClick={() => toggleExpandOrder(ord.id)}
                          className="hover:bg-white/2 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-4 text-center">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </td>
                          <td className="py-4 px-2 font-bold text-white">#TBD-{ord.id}</td>
                          <td className="py-4 px-2 max-w-xs truncate">
                            <span className="font-bold text-white block">{ord.customer_name}</span>
                            <span className="text-gray-500 text-[10px] block mt-0.5">{ord.phone}</span>
                          </td>
                          <td className="py-4 px-2 font-semibold text-white">
                            ৳{ord.total_amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                              ord.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 capitalize font-semibold">
                            {ord.delivery_location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
                          </td>
                          <td className="py-4 px-2 text-gray-500">
                            {new Date(ord.order_date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            {ord.status === 'pending' && (
                              <button
                                onClick={() => handleCompleteOrder(ord.id)}
                                disabled={completingId === ord.id}
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-[#090a0f] hover:bg-emerald-400 transition-all font-bold text-[10px] uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)] disabled:opacity-50"
                              >
                                {completingId === ord.id ? 'Processing...' : 'Complete'}
                              </button>
                            )}
                          </td>
                        </tr>

                        {/* Collapsible item details drawer */}
                        {isExpanded && (
                          <tr className="bg-[#0c0d16]/30">
                            <td colSpan={8} className="py-4 px-8 border-b border-white/5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px]">
                                <div className="space-y-2.5">
                                  <h5 className="font-black text-gray-400 uppercase tracking-widest text-[9px]">
                                    Complete Address
                                  </h5>
                                  <p className="text-gray-300 bg-white/2 p-3 rounded-xl border border-white/2 leading-relaxed">
                                    {ord.address}
                                  </p>
                                  {ord.email && (
                                    <div className="text-[10px] text-gray-500">
                                      <span>Email Address: </span>
                                      <span className="text-gray-300 font-bold">{ord.email}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-2.5">
                                  <h5 className="font-black text-gray-400 uppercase tracking-widest text-[9px]">
                                    Ordered Products Line Items
                                  </h5>
                                  <div className="space-y-2">
                                    {ord.items?.map((item: any, idx: number) => (
                                      <div 
                                        key={idx} 
                                        className="flex justify-between items-center py-2 px-3 bg-white/2 border border-white/2 rounded-xl"
                                      >
                                        <div>
                                          <span className="font-bold text-white block">{item.product_name}</span>
                                          <span className="text-[10px] text-gray-500 mt-0.5">
                                            ৳{item.price.toLocaleString()} × {item.quantity}
                                          </span>
                                        </div>
                                        <span className="font-black text-white">
                                          ৳{(item.price * item.quantity).toLocaleString()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 font-medium text-xs">No orders registered matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
