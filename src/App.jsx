/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Bell, Search } from 'lucide-react';
import { api } from './api';
import { Button } from './components/ui/Shared';
import DashboardHome from './components/DashboardHome';
import OrdersList from './components/OrdersList';
import InventoryManager from './components/InventoryManager'; // Updated import
import AlertList from './components/AlertList';
import OrderModal from './components/OrderModal';
import Sidebar from './components/layout/Sidebar';
import Analytics from './components/Analytics'; // New import
import Profile from './components/Profile'; // New import
import { motion } from 'framer-motion';

// --- Main App ---

export default function App() {
  const [view, setView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Data State
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]); // Will load mock initially, but editable
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ ordersToday: 0, pending: 0, alerts: 0 });
  const [loading, setLoading] = useState(true);

  // Initialize Data
  useEffect(() => {
    // In a real app, this would check if local data exists first
    // For now, we load api mocks but they are editable in memory
    const fetchData = async () => {
      setLoading(true);
      const [ord, inv, alt, st] = await Promise.all([
        api.getOrders(),
        api.getInventory(),
        api.getRefillAlerts(),
        api.getStats()
      ]);
      setOrders(ord);
      setInventory(inv);
      setAlerts(alt);
      setStats(st);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleApprove = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'completed' } : o));
    setStats(prev => ({ ...prev, pending: prev.pending - 1 }));
    setSelectedOrder(null);
  };

  const handleReject = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'rejected' } : o));
    setStats(prev => ({ ...prev, pending: prev.pending - 1 }));
    setSelectedOrder(null);
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-slate-400 bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-medium text-slate-600">Loading PharmaOS...</p>
    </div>
  </div>;

  return (
    <div className="flex h-screen bg-[#EFE9DD] text-[#1F1F1F] font-sans overflow-hidden">
      <Sidebar view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 overflow-y-auto h-screen bg-[#EFE9DD] p-5 md:p-8"
      >
        <header className="mb-8 flex justify-between items-center sticky top-0 z-30 py-3 bg-[#EFE9DD]/80 backdrop-blur-md -mx-8 px-8 border-b border-[#DED9CF]/50">
          <div>
            <h1 className="text-2xl font-bold text-[#1F1F1F] tracking-tight">
              {view === 'dashboard' && 'Dashboard'}
              {view === 'analytics' && 'Analytics'}
              {view === 'orders' && 'Orders'}
              {view === 'inventory' && 'Inventory'}
              {view === 'alerts' && 'Alerts'}
              {view === 'profile' && 'Profile'}
            </h1>
            <p className="text-[#6B6B6B] text-sm font-medium mt-0.5">
              Welcome back, Dr. Sarah.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block w-72 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] group-focus-within:text-[#1F1F1F] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search or type a command..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#DED9CF] rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 focus:border-[#6B6B6B] bg-[#FBFAF7] shadow-sm transition-all text-[#1F1F1F] placeholder:text-[#9CA3AF]"
              />
            </div>

            {/* Notification Icon */}
            <button className="relative p-2.5 bg-[#FBFAF7] border border-[#DED9CF] rounded-[12px] hover:bg-white shadow-sm transition-all text-[#6B6B6B] hover:text-[#1F1F1F]">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F1F1F]"></span>
              </span>
            </button>
          </div>
        </header>

        <div className="pb-10 max-w-7xl mx-auto">
          {view === 'dashboard' && (
            <DashboardHome
              stats={stats}
              recentOrders={orders.slice(0, 5)}
              onViewOrder={setSelectedOrder}
            />
          )}

          {view === 'analytics' && (
            <Analytics orders={orders} inventory={inventory} />
          )}

          {view === 'orders' && (
            <OrdersList
              orders={orders}
              onViewOrder={setSelectedOrder}
            />
          )}

          {view === 'inventory' && (
            <InventoryManager
              inventory={inventory}
              setInventory={setInventory}
            />
          )}

          {view === 'alerts' && <AlertList alerts={alerts} />}

          {view === 'profile' && <Profile />}
        </div>
      </motion.main>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
