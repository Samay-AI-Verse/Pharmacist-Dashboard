/* eslint-disable react/prop-types */
import React from 'react';
import {
    LayoutDashboard, ClipboardList, Package, Bell, BarChart2,
    ChevronLeft, ChevronRight, User, Settings, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const NavItem = ({ icon: Icon, label, id, currentView, setView, collapsed }) => {
    const isActive = currentView === id;

    return (
        <button
            onClick={() => setView(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-[14px] text-sm font-medium transition-all relative group ${isActive
                ? 'bg-[#E8E1D6] text-[#1F1F1F]' // Light Beige active
                : 'text-[#6B6B6B] hover:bg-[#F2F0EB] hover:text-[#1F1F1F]'
                } ${collapsed ? 'justify-center w-12 h-12 p-0 mx-auto' : ''}`}
        >
            <Icon size={20} className={isActive ? 'text-[#1F1F1F]' : '#6B6B6B'} strokeWidth={1.8} />

            {!collapsed && (
                <span className="whitespace-nowrap origin-left">{label}</span>
            )}

            {/* Tooltip */}
            {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1F1F1F] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap shadow-sm translate-x-1 group-hover:translate-x-0">
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
            className="bg-[#FBFAF7] border-r border-[#DED9CF] flex flex-col fixed inset-y-0 left-0 z-50 h-screen"
        >
            {/* Header */}
            <div className={`h-24 flex items-center ${collapsed ? 'justify-center' : 'px-6'} transition-all`}>
                <div className="flex items-center gap-0.5">
                    {/* Animated Logo - Interlocking Pharma Concept (No Background) */}
                    <div className="w-12 h-12 flex items-center justify-center text-[#1F1F1F] relative shrink-0">

                        {/* Abstract Construction: Two interlocking pill shapes forming an 'S' */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                            {/* Top Curve / Pill */}
                            <motion.path
                                d="M16 6H8C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10H14C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18H12"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            />

                            {/* Bottom Curve / Accent */}
                            <motion.path
                                d="M12 18H8C5.79086 18 4 16.2091 4 14C4 11.7909 5.79086 10 8 10"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            />

                            {/* Center Dot / connector */}
                            <motion.circle
                                cx="12"
                                cy="14"
                                r="1.5"
                                fill="currentColor"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 1.2 }}
                            />
                        </svg>
                    </div>

                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-[#1F1F1F] tracking-tight leading-none">Samastha</span>
                            <span className="text-[11px] text-[#6B6B6B] font-semibold tracking-widest uppercase mt-0.5 ml-0.5">Care</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="orders" label="Orders" icon={ClipboardList} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="inventory" label="Inventory" icon={Package} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="analytics" label="Analytics" icon={BarChart2} currentView={view} setView={setView} collapsed={collapsed} />
                <NavItem id="alerts" label="Alerts" icon={Bell} currentView={view} setView={setView} collapsed={collapsed} />
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#DED9CF] space-y-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`flex items-center gap-3 px-2 py-2 text-[#6B6B6B] hover:text-[#1F1F1F] transition-colors rounded-[12px] hover:bg-[#F2F0EB] ${collapsed ? 'justify-center w-full' : ''}`}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    {!collapsed && <span className="text-sm font-medium">Collapse</span>}
                </button>

                <button
                    onClick={() => setView('profile')}
                    className={`flex items-center gap-3 p-2 rounded-[14px] text-left transition-all group ${view === 'profile'
                            ? 'bg-[#E8E1D6] ring-1 ring-[#DED9CF]'
                            : 'bg-[#F2F0EB] hover:bg-[#E8E1D6] hover:ring-1 hover:ring-[#DED9CF]'
                        } ${collapsed ? 'justify-center' : ''}`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[#1F1F1F] font-bold text-xs shrink-0 transition-colors ${view === 'profile' ? 'bg-[#DED9CF]' : 'bg-[#DED9CF] group-hover:bg-[#d5cfc4]'
                        }`}>
                        SW
                    </div>

                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-[#1F1F1F] truncate group-hover:text-black">Dr. Sarah W.</p>
                            <p className="text-xs text-[#6B6B6B] truncate">Admin</p>
                        </div>
                    )}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
