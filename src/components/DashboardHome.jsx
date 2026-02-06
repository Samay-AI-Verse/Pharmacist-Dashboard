/* eslint-disable react/prop-types */
import React from 'react';
import { ClipboardList, Bell, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge } from './ui/Shared';

const DashboardHome = ({ stats, recentOrders, onViewOrder }) => (
    <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <ClipboardList size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Orders Today</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.ordersToday}</h3>
                </div>
            </Card>
            <Card className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                    <Activity size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Pending Approvals</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.pending}</h3>
                </div>
            </Card>
            <Card className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                    <Bell size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Refill Alerts</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.alerts}</h3>
                </div>
            </Card>
        </div>

        {/* Recent Orders */}
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Recent Orders</h3>
                <Button variant="ghost" className="text-sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-sm text-slate-500">
                            <th className="pb-3 font-medium">Order ID</th>
                            <th className="pb-3 font-medium">Patient</th>
                            <th className="pb-3 font-medium">Medicine</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">AI Check</th>
                            <th className="pb-3 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="py-4 font-medium text-slate-700">{order.id}</td>
                                <td className="py-4">{order.patientName}</td>
                                <td className="py-4">{order.medicine}</td>
                                <td className="py-4"><Badge status={order.status} /></td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        {order.aiStatus === 'approved' ? (
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        ) : (
                                            <AlertTriangle size={16} className="text-amber-500" />
                                        )}
                                        <span className={order.aiStatus === 'approved' ? 'text-emerald-700' : 'text-amber-700'}>
                                            {order.aiStatus === 'approved' ? 'Approved' : 'Review'}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 text-right">
                                    <Button variant="secondary" onClick={() => onViewOrder(order)} className="ml-auto text-xs py-1.5 px-3">
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

export default DashboardHome;
