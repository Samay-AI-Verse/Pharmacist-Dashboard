/* eslint-disable react/prop-types */
import React from 'react';
import {
    LayoutDashboard, ClipboardList, Package, Bell, User, BarChart2,
    ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ icon: Icon, label, id, currentView, setView, collapsed }) => {
    const isActive = currentView === id;

    return (
        <button
            onClick={() => setView(id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all relative group mb-1 ${isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${collapsed ? 'justify-center' : ''}`}
        >
            <div className={`relative ${isActive ? 'text-emerald-600' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && !collapsed && <motion.div layoutId="activeIndicator" className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />}
            </div>

            {!collapsed && (
                <span className="whitespace-nowrap origin-left">{label}</span>
            )}

            {/* Tooltip for collapsed state */}
            {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap shadow-xl translate-x-1 group-hover:translate-x-0">
                    {label}
                </div>
            )}
        </button>
    );
};

const Sidebar = ({ view, setView, collapsed, setCollapsed }) => {
    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 260 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 left-0 z-50 h-screen"
        >
            {/* Header */}
            <div className={`h-20 flex items-center ${collapsed ? 'justify-center' : 'px-6'} transition-all`}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-emerald-100 shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M2 12h20" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col"
                        >
                            <span className="text-lg font-bold text-slate-800 tracking-tight leading-none">Pharma<span className="text-emerald-600">OS</span></span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="orders" label="Orders" icon={ClipboardList} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="inventory" label="Inventory" icon={Package} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="analytics" label="Analytics" icon={BarChart2} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="alerts" label="Alerts" icon={Bell} currentView={view} setView={setView} collapsed={collapsed} />
            </nav>

            {/* Toggle & Profile */}
            <div className="p-3 border-t border-slate-50 space-y-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    {!collapsed && <span className="text-sm font-medium">Collapse</span>}
                </button>

                <button
                    onClick={() => setView('profile')}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-slate-50 ${view === 'profile' ? 'bg-slate-50' : ''} ${collapsed ? 'justify-center' : ''}`}
                >
                    <div className="relative shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=059669&color=fff" alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>

                    {!collapsed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left overflow-hidden">
                            <p className="text-sm font-semibold text-slate-700 truncate">Dr. Sarah W.</p>
                            <p className="text-xs text-slate-400 truncate">Admin</p>
                        </motion.div>
                    )}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
