/* eslint-disable react/prop-types */
import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit2, Camera } from 'lucide-react';
import { Card, Button } from './ui/Shared';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <Card className="relative overflow-hidden border-[#DED9CF] shadow-sm bg-[#FBFAF7]">
                {/* Banner - Warm Minimal Style */}
                <div className="h-32 bg-[#E8E1D6]"></div>

                {/* Profile Info */}
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-[#FBFAF7] p-1 shadow-sm pointer-events-none">
                                    <div className="w-full h-full rounded-full bg-[#F2F0EB] flex items-center justify-center text-[#6B6B6B]">
                                        <User size={40} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-[#1F1F1F] text-[#EFE9DD] rounded-full text-xs hover:bg-black transition-colors border border-[#FBFAF7]">
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-[#1F1F1F]">Dr. Sarah Wilson</h2>
                                <p className="text-[#6B6B6B] font-medium text-sm">Chief Pharmacist • License #PH-88291</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="bg-[#E8E1D6] text-[#1F1F1F] hover:bg-[#DED9CF]">
                            <Edit2 size={16} /> <span className="ml-2">Edit Profile</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-[#1F1F1F]">
                                    <Mail size={18} className="text-[#6B6B6B]" />
                                    <span className="text-sm font-medium">sarah.wilson@pharma-ai.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#1F1F1F]">
                                    <Phone size={18} className="text-[#6B6B6B]" />
                                    <span className="text-sm font-medium">+1 (555) 012-3456</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#1F1F1F]">
                                    <MapPin size={18} className="text-[#6B6B6B]" />
                                    <span className="text-sm font-medium">General Hospital, Building B</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">System Permissions</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-2.5 bg-[#F2F0EB] rounded-[10px] text-[#1F1F1F] text-sm font-medium border border-[#E8E1D6]">
                                    <Shield size={16} className="text-[#1F1F1F]" />
                                    <span>Admin Access (Full Control)</span>
                                </div>
                                <div className="flex items-center gap-2 p-2.5 bg-[#F2F0EB] rounded-[10px] text-[#1F1F1F] text-sm font-medium border border-[#E8E1D6]">
                                    <Shield size={16} className="text-[#6B6B6B]" />
                                    <span>AI Override Authority</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#FBFAF7] border-[#DED9CF]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#1F1F1F]">Activity Log</h3>
                        <button className="text-xs text-[#6B6B6B] hover:text-[#1F1F1F] font-medium transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start pb-4 border-b border-[#F2F0EB] last:border-0 last:pb-0">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#DED9CF]"></div>
                                <div>
                                    <p className="text-sm font-medium text-[#1F1F1F]">Approved Order #ORD-7829</p>
                                    <p className="text-xs text-[#6B6B6B] mt-0.5">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="bg-[#FBFAF7] border-[#DED9CF]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#1F1F1F]">Security Settings</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3.5 bg-[#F2F0EB] rounded-[12px] border border-[#E8E1D6]">
                            <div>
                                <p className="text-sm font-bold text-[#1F1F1F]">Two-Factor Authentication</p>
                                <p className="text-xs text-[#6B6B6B] mt-0.5">Enabled via Mobile App</p>
                            </div>
                            <div className="w-10 h-6 bg-[#1F1F1F] rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3.5 bg-[#F2F0EB] rounded-[12px] border border-[#E8E1D6]">
                            <div>
                                <p className="text-sm font-bold text-[#1F1F1F]">Session Timeout</p>
                                <p className="text-xs text-[#6B6B6B] mt-0.5">Auto-lock after 15 mins</p>
                            </div>
                            <button className="text-sm text-[#6B6B6B] hover:text-[#1F1F1F] font-medium">Edit</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
