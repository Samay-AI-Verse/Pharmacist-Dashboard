/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { Package, Upload, Plus, Trash2, Download } from 'lucide-react';
import { Card, Button, Badge } from './ui/Shared';
import * as XLSX from 'xlsx';

const InventoryManager = ({ inventory, setInventory }) => {
    const fileInputRef = useRef(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', stock: 0, status: 'ok' });

    // Handle Excel Import
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            // Transform data to match our schema if needed
            const formattedData = data.map((row, index) => ({
                id: Date.now() + index,
                name: row.Medicine || row.Name || row.name || 'Unknown',
                stock: parseInt(row.Stock || row.Quantity || row.stock || 0),
                status: (row.Stock || 0) < 50 ? 'low' : 'ok'
            }));

            // Add to existing inventory
            setInventory(prev => [...prev, ...formattedData]);
        };
        reader.readAsBinaryString(file);
    };

    const handleAddItem = () => {
        if (!newItem.name) return;
        setInventory(prev => [
            {
                id: Date.now(),
                ...newItem,
                status: newItem.stock < 50 ? 'low' : 'ok'
            },
            ...prev
        ]);
        setNewItem({ name: '', stock: 0, status: 'ok' });
        setShowAddForm(false);
    };

    const handleDelete = (id) => {
        setInventory(prev => prev.filter(item => item.id !== id));
    };

    const downloadTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            { Name: 'Amoxicillin 500mg', Stock: 100 },
            { Name: 'Ibuprofen 200mg', Stock: 500 }
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventory");
        XLSX.writeFile(wb, "inventory_template.xlsx");
    };

    return (
        <div className="space-y-6">
            {/* Function Bar */}
            <Card className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <Package size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Inventory Management</h2>
                        <p className="text-sm text-slate-500">{inventory.length} items in stock</p>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".xlsx, .xls, .csv"
                    />
                    <Button variant="secondary" onClick={() => downloadTemplate()}>
                        <Download size={18} /> Template
                    </Button>
                    <Button variant="secondary" onClick={() => fileInputRef.current.click()}>
                        <Upload size={18} /> Import Excel
                    </Button>
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus size={18} /> Add Item
                    </Button>
                </div>
            </Card>

            {/* Add Item Form */}
            {showAddForm && (
                <Card className="bg-slate-50 border-emerald-200 animate-in slide-in-from-top-4">
                    <h3 className="font-bold text-slate-700 mb-4">Add New Medicine</h3>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Medicine Name</label>
                            <input
                                type="text"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="e.g. Paracetamol 500mg"
                            />
                        </div>
                        <div className="w-32 space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Stock Qty</label>
                            <input
                                type="number"
                                value={newItem.stock}
                                onChange={e => setNewItem({ ...newItem, stock: parseInt(e.target.value) || 0 })}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => setShowAddForm(false)}>Cancel</Button>
                            <Button onClick={handleAddItem}>Save Item</Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Inventory Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 text-sm text-slate-500">
                                <th className="pb-3 font-medium">Item Name</th>
                                <th className="pb-3 font-medium">Stock Level</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {inventory.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-4 font-medium text-slate-700">{item.name}</td>
                                    <td className="py-4 font-mono font-medium">{item.stock}</td>
                                    <td className="py-4"><Badge status={item.status} /></td>
                                    <td className="py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {inventory.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-slate-400 italic">
                                        No items in inventory. Import via Excel or add manually.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default InventoryManager;
