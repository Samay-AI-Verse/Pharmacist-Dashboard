/* eslint-disable react/prop-types */
import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit2, Camera } from 'lucide-react';
import { Card, Button } from './ui/Shared';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card className="relative overflow-hidden border-none shadow-md">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

                {/* Profile Info */}
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg pointer-events-none">
                                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <User size={40} />
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full text-xs shadow-lg hover:bg-emerald-700 transition-colors">
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-slate-800">Dr. Sarah Wilson</h2>
                                <p className="text-slate-500 font-medium">Chief Pharmacist • License #PH-88291</p>
                            </div>
                        </div>
                        <Button variant="secondary">
                            <Edit2 size={16} /> Edit Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail size={18} className="text-slate-400" />
                                    <span>sarah.wilson@pharma-ai.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone size={18} className="text-slate-400" />
                                    <span>+1 (555) 012-3456</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MapPin size={18} className="text-slate-400" />
                                    <span>General Hospital, Building B</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">System Permissions</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded text-emerald-700 text-sm font-medium">
                                    <Shield size={16} />
                                    <span>Admin Access (Full Control)</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded text-blue-700 text-sm font-medium">
                                    <Shield size={16} />
                                    <span>AI Override Authority</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Activity Log</h3>
                        <button className="text-xs text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
                                <div>
                                    <p className="text-sm text-slate-800">Approved Order #ORD-7829</p>
                                    <p className="text-xs text-slate-400">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Security Settings</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                                <p className="text-xs text-slate-500">Enabled via Mobile App</p>
                            </div>
                            <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-slate-800">Session Timeout</p>
                                <p className="text-xs text-slate-500">Auto-lock after 15 mins</p>
                            </div>
                            <span className="text-sm text-slate-500">Edit</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
