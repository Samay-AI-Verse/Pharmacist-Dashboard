/* eslint-disable react/prop-types */
import React from 'react';
import { Package } from 'lucide-react';
import { Card, Badge } from './ui/Shared';

const InventoryList = ({ inventory }) => (
    <Card>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Inventory Snapshot</h2>
        <div className="grid gap-4">
            {inventory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${item.status === 'ok' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-800">{item.name}</p>
                            <p className="text-xs text-slate-500">ID: #{1000 + item.id}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-800">{item.stock} units</p>
                        <Badge status={item.status} />
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

export default InventoryList;
