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
            <div className={`h-20 flex items-center ${collapsed ? 'justify-center' : 'px-6'} transition-all`}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#1F1F1F] rounded-[10px] flex items-center justify-center text-white shadow-sm shrink-0">
                        <div className="w-4 h-4 rounded-full bg-[#E8E1D6]"></div>
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-[#1F1F1F] tracking-tight">PharmaOS</span>
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

                <div className={`flex items-center gap-3 p-2 rounded-[14px] bg-[#F2F0EB] ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#DED9CF] flex items-center justify-center text-[#1F1F1F] font-bold text-xs shrink-0">
                        SW
                    </div>

                    {!collapsed && (
                        <div className="text-left overflow-hidden">
                            <p className="text-sm font-bold text-[#1F1F1F] truncate">Dr. Sarah W.</p>
                            <p className="text-xs text-[#6B6B6B] truncate">Admin</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
