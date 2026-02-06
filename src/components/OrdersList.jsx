/* eslint-disable react/prop-types */
import React from 'react';
import { Search } from 'lucide-react';
import { Card, Button, Badge } from './ui/Shared';

const OrdersList = ({ orders, onViewOrder }) => (
    <Card>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">All Orders</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-slate-100 text-sm text-slate-500">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Patient</th>
                        <th className="pb-3 font-medium">Medicine</th>
                        <th className="pb-3 font-medium">Qty</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">AI Status</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 font-medium text-slate-700">{order.id}</td>
                            <td className="py-4">
                                <div>{order.patientName}</div>
                                <div className="text-xs text-slate-400">{order.phone}</div>
                            </td>
                            <td className="py-4">{order.medicine}</td>
                            <td className="py-4">{order.quantity}</td>
                            <td className="py-4">{order.type}</td>
                            <td className="py-4"><Badge status={order.aiStatus} /></td>
                            <td className="py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="secondary" onClick={() => onViewOrder(order)} className="text-xs py-1.5 px-3">
                                        View
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

export default OrdersList;
