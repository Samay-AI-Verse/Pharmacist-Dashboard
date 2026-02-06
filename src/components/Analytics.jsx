/* eslint-disable react/prop-types */
import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Card, Button } from './ui/Shared';
import { TrendingUp, DollarSign, Package, Activity, Info } from 'lucide-react';

const Analytics = ({ orders, inventory }) => {
    // Pie Data - replacing Radar Data
    const pieData = [
        { name: 'Completed', value: 45, color: '#10b981' }, // Emerald
        { name: 'Pending', value: 25, color: '#3b82f6' },   // Blue
        { name: 'Review', value: 20, color: '#f59e0b' },    // Amber
        { name: 'Rejected', value: 10, color: '#ef4444' },  // Red
    ];

    const trendData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 5000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 6890 },
        { name: 'Sat', sales: 8390 },
        { name: 'Sun', sales: 7490 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Performance Analytics</h2>
                    <p className="text-slate-500 text-sm">Real-time insights into pharmacy operations.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                    <Button size="sm" variant="secondary">Download Report</Button>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card noPadding className="p-5 flex items-start justify-between border-l-4 border-l-emerald-500">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-slate-800">$24,500</h3>
                        <span className="text-emerald-600 text-xs font-medium flex items-center mt-1">
                            <TrendingUp size={12} className="mr-1" /> +12% from last week
                        </span>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <DollarSign size={20} />
                    </div>
                </Card>

                <Card noPadding className="p-5 flex items-start justify-between border-l-4 border-l-blue-500">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Items in Stock</p>
                        <h3 className="text-2xl font-bold text-slate-800">{inventory.length}</h3>
                        <span className="text-blue-600 text-xs font-medium flex items-center mt-1">
                            <Activity size={12} className="mr-1" /> 98% Availability
                        </span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Package size={20} />
                    </div>
                </Card>

                {/* Premium Donut Chart - Replacing Radar */}
                <Card className="md:col-span-2 row-span-2 flex flex-col relative overflow-hidden min-h-[300px]">
                    <div className="absolute top-5 left-6 z-10">
                        <h3 className="font-bold text-slate-700">Order Status Distribution</h3>
                        <p className="text-xs text-slate-400">Monthly Breakdown</p>
                    </div>

                    <div className="flex items-center justify-between h-full pt-12 px-2">
                        {/* Chart Area */}
                        <div className="relative flex-1 h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Absolute Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <p className="text-3xl font-bold text-slate-800">100%</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Processed</p>
                            </div>
                        </div>

                        {/* Custom Legend */}
                        <div className="w-32 flex flex-col justify-center gap-3 pr-4">
                            {pieData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <div className="text-xs text-slate-600 font-medium">{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card className="md:col-span-2 h-full min-h-[200px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 text-sm">Revenue Trend</h3>
                        <Info size={14} className="text-slate-300" />
                    </div>
                    <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip contentStyle={{ border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <h3 className="font-bold text-slate-700 mb-4">Inventory Movement</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={inventory.slice(0, 8)}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} interval={0} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
