'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { ShoppingBag, Banknote, Clock, CheckCircle, PackageOpen, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  total_orders: number;
  total_earnings: number;
  pending_orders: number;
  completed_orders: number;
  monthly_earnings: Array<{ month: string; total: number }>;
  location_stats: Array<{ delivery_location: string; count: number }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics and orders together
    Promise.all([
      fetch('/api/admin/stats').then((res) => res.json()),
      fetch('/api/orders').then((res) => res.json())
    ])
      .then(([statsData, ordersData]) => {
        setStats(statsData);
        if (ordersData && Array.isArray(ordersData.orders)) {
          setRecentOrders(ordersData.orders.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm tracking-widest uppercase font-bold text-primary animate-pulse-glow">Loading Stats...</p>
        </div>
      </div>
    );
  }

  // Fallback calculations for charts if stats array is empty
  const monthlyEarnings = stats?.monthly_earnings || [];
  const locationStats = stats?.location_stats || [];

  const insideCount = locationStats.find(l => l.delivery_location === 'inside')?.count || 0;
  const outsideCount = locationStats.find(l => l.delivery_location === 'outside')?.count || 0;
  const locationTotal = insideCount + outsideCount || 1;
  const insidePercent = Math.round((insideCount / locationTotal) * 100);
  const outsidePercent = Math.round((outsideCount / locationTotal) * 100);

  // Find max monthly earnings to scale chart bars
  const maxMonthlyVal = monthlyEarnings.length > 0 
    ? Math.max(...monthlyEarnings.map(m => m.total)) 
    : 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6 animate-fade-in-up">
      <AdminHeader />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Total Orders */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.05)]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-500">Total Orders</span>
            <h3 className="text-2xl font-black font-display text-white mt-0.5">{stats?.total_orders || 0}</h3>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 shadow-[0_0_10px_rgba(189,0,255,0.05)]">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-500">Total Earnings</span>
            <h3 className="text-2xl font-black font-display text-white mt-0.5">
              ৳{stats?.total_earnings.toLocaleString() || 0}
            </h3>
          </div>
        </div>

        {/* Card 3: Pending Orders */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-500">Pending Orders</span>
            <h3 className="text-2xl font-black font-display text-white mt-0.5">{stats?.pending_orders || 0}</h3>
          </div>
        </div>

        {/* Card 4: Completed Orders */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.05)]">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-500">Completed Orders</span>
            <h3 className="text-2xl font-black font-display text-white mt-0.5">{stats?.completed_orders || 0}</h3>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Chart 1: Monthly Sales Volume */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 lg:col-span-2 space-y-4">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-white/5 pb-2">
            Monthly Earnings Overview
          </h4>
          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2">
            {monthlyEarnings.length > 0 ? (
              monthlyEarnings.map((m) => {
                const heightPercent = maxMonthlyVal > 0 ? (m.total / maxMonthlyVal) * 80 : 0;
                return (
                  <div key={m.month} className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-[10px] text-primary font-black mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      ৳{Math.round(m.total / 1000)}k
                    </span>
                    <div 
                      style={{ height: `${Math.max(4, heightPercent)}%` }} 
                      className="w-full rounded-t bg-gradient-to-t from-accent to-primary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300"
                    />
                    <span className="text-[9px] text-gray-500 mt-2 font-semibold rotate-[-25deg] sm:rotate-0">
                      {m.month.split('-')[1]}/{m.month.split('-')[0].substring(2)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs italic">
                No monthly sales history found.
              </div>
            )}
          </div>
        </div>

        {/* Chart 2: Regional Shipping Ratios */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-white/5 pb-2">
            Delivery Location Distribution
          </h4>
          <div className="flex flex-col justify-center h-48 space-y-5">
            {locationStats.length > 0 ? (
              <>
                {/* Inside Dhaka Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Inside Dhaka
                    </span>
                    <span>{insidePercent}% ({insideCount})</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div style={{ width: `${insidePercent}%` }} className="h-full bg-primary shadow-[0_0_10px_rgba(0,240,255,0.3)] rounded-full" />
                  </div>
                </div>

                {/* Outside Dhaka Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      Outside Dhaka
                    </span>
                    <span>{outsidePercent}% ({outsideCount})</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div style={{ width: `${outsidePercent}%` }} className="h-full bg-accent shadow-[0_0_10px_rgba(189,0,255,0.3)] rounded-full" />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-600 text-xs italic py-10">
                No location reports logged.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders logs */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <PackageOpen className="w-4 h-4 text-primary" />
            Recent Orders Log
          </h4>
          <Link 
            href="/admin/orders" 
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Total Amount</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/2 text-gray-300">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-white">#TBD-{ord.id}</td>
                    <td className="py-3.5 px-2">{ord.customer_name}</td>
                    <td className="py-3.5 px-2 font-semibold text-white">৳{ord.total_amount.toLocaleString()}</td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        ord.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-gray-500">
                      {new Date(ord.order_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-xs italic text-center py-6">No orders registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
