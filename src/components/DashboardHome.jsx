/* eslint-disable react/prop-types */
import React from 'react';
import { ClipboardList, Activity, Bell } from 'lucide-react';
import { Card, Badge, Button } from './ui/Shared';

const StatCard = ({ label, value, icon: Icon }) => (
    <Card className="flex flex-col justify-between h-36">
        <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-[12px] bg-[#E8E1D6] text-[#1F1F1F]">
                <Icon size={20} strokeWidth={1.8} />
            </div>
            <span className="px-2 py-1 bg-[#F2F0EB] text-[#6B6B6B] text-[10px] font-bold uppercase tracking-wider rounded-full">Today</span>
        </div>
        <div>
            <h3 className="text-3xl font-bold text-[#1F1F1F] mb-1">{value}</h3>
            <p className="text-[#6B6B6B] font-medium text-sm">{label}</p>
        </div>
    </Card>
);

const DashboardHome = ({ stats, recentOrders, onViewOrder }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Orders Processed"
                    value={stats.ordersToday || 42}
                    icon={ClipboardList}
                />
                <StatCard
                    label="Pending Approvals"
                    value={stats.pending || 15}
                    icon={Activity}
                />
                <StatCard
                    label="Refill Alerts"
                    value={stats.alerts || 8}
                    icon={Bell}
                />
            </div>

            {/* Recent Orders Section */}
            <Card className="min-h-[500px] border-[#DED9CF]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-[#1F1F1F]">Recent Orders</h2>
                    <Button variant="white" size="sm">View All</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#DED9CF]">
                                <th className="pb-4 pl-2 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider w-32">Order ID</th>
                                <th className="pb-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Patient</th>
                                <th className="pb-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Medicine</th>
                                <th className="pb-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Status</th>
                                <th className="pb-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">AI Check</th>
                                <th className="pb-4 pr-2 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F2F0EB]">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#F9F7F4] transition-colors group">
                                    <td className="py-4 pl-2 font-medium text-[#1F1F1F]">{order.id}</td>
                                    <td className="py-4 font-medium text-[#1F1F1F]">{order.patientName}</td>
                                    <td className="py-4 text-[#6B6B6B]">{order.medicine}</td>
                                    <td className="py-4">
                                        <Badge status={order.status} />
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            {/* Minimal AI indicator */}
                                            <div className={`w-2 h-2 rounded-full ${order.aiConfidence > 80 ? 'bg-[#2F5E38]' : 'bg-[#946C00]'}`}></div>
                                            <span className={`text-sm font-medium ${order.aiConfidence > 80 ? 'text-[#1F1F1F]' : 'text-[#6B6B6B]'}`}>
                                                {order.aiConfidence > 80 ? 'Approved' : 'Review'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-2 text-right">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => onViewOrder(order)}
                                            className="px-4 py-1.5 h-8 text-xs bg-[#E8E1D6] hover:bg-[#DED9CF] border-none shadow-none text-[#1F1F1F]"
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default DashboardHome;
