/* eslint-disable react/prop-types */
import React from 'react';
import { XCircle, User, BrainCircuit, CheckCircle } from 'lucide-react';
import { Button } from './ui/Shared';

const OrderModal = ({ order, onClose, onApprove, onReject }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full text-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order #{order.id}</span>
                        <h2 className="text-xl font-bold mt-1">Review Order</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <XCircle size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Patient & Meds */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Patient Details</h3>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-100 rounded-full text-slate-500">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{order.patientName}</p>
                                    <p className="text-slate-600">{order.age} Years • {order.gender}</p>
                                    <p className="text-slate-500 text-sm mt-1">{order.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Order Info</h3>
                            <div className="space-y-2">
                                <p className="font-medium text-lg text-emerald-700">{order.medicine}</p>
                                <div className="flex gap-4 text-sm text-slate-600">
                                    <p>Qty: <span className="font-semibold text-slate-800">{order.quantity}</span></p>
                                    <p>Type: <span className="font-semibold text-slate-800">{order.type}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className={`rounded-xl p-5 border ${order.aiStatus === 'approved' ? 'bg-emerald-50 border-emerald-100' : 'bg-purple-50 border-purple-100'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit size={18} className={order.aiStatus === 'approved' ? 'text-emerald-600' : 'text-purple-600'} />
                            <h3 className={`font-bold ${order.aiStatus === 'approved' ? 'text-emerald-800' : 'text-purple-800'}`}>
                                AI Analysis: {order.aiStatus === 'approved' ? 'Safe to Approve' : 'Review Needed'}
                            </h3>
                        </div>
                        <p className={`text-sm leading-relaxed ${order.aiStatus === 'approved' ? 'text-emerald-700' : 'text-purple-700'}`}>
                            {order.aiReasoning}
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={() => onReject(order.id)}>Reject Order</Button>
                    <Button variant="primary" onClick={() => onApprove(order.id)}>
                        <CheckCircle size={18} />
                        Confirm & Approve
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
