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
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <Sidebar view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-8 overflow-y-auto bg-slate-50/50 h-screen"
      >
        <header className="mb-8 flex justify-between items-center sticky top-0 z-40 py-2 bg-slate-50/80 backdrop-blur-sm -mx-2 px-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {view === 'dashboard' && 'Dashboard Overview'}
              {view === 'analytics' && 'Analytics Engine'}
              {view === 'orders' && 'Order Management'}
              {view === 'inventory' && 'Inventory Control'}
              {view === 'alerts' && 'Predictions & Alerts'}
              {view === 'profile' && 'Pharmacist Profile'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search orders, meds, patients..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white shadow-sm transition-all"
              />
            </div>

            {/* Notification Icon */}
            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:border-emerald-200 hover:text-emerald-600 shadow-sm transition-all group">
              <Bell size={22} className="text-slate-600 group-hover:text-emerald-600" />
              <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </button>
          </div>
        </header>

        <div className="pb-10">
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
