/* eslint-disable react/prop-types */
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, Button } from './ui/Shared';

const AlertList = ({ alerts }) => (
    <Card>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Refill Alerts</h2>
        <div className="space-y-4">
            {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex gap-4">
                        <div className="pt-1 text-amber-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-800">{alert.patient}</p>
                            <p className="text-sm text-slate-600">{alert.medicine} • Due {alert.date}</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="text-xs bg-white/80 border-amber-200 text-amber-800 hover:bg-white">
                        Notify Patient
                    </Button>
                </div>
            ))}
        </div>
    </Card>
);

export default AlertList;
