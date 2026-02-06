/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, noPadding = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`bg-white rounded-2xl border border-slate-100/80 shadow-sm ${!noPadding ? 'p-6' : ''} ${className}`}
    >
        {children}
    </motion.div>
);

export const Badge = ({ status }) => {
    const styles = {
        pending: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100',
        completed: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
        approved: 'bg-teal-50 text-teal-600 ring-1 ring-teal-100',
        rejected: 'bg-red-50 text-red-600 ring-1 ring-red-100',
        review: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100',
        critical: 'bg-red-50 text-red-600 ring-1 ring-red-100',
        low: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100',
        ok: 'bg-slate-50 text-slate-600 ring-1 ring-slate-100',
    };

    const labels = {
        pending: 'Pending',
        completed: 'Completed',
        approved: 'Approved',
        rejected: 'Rejected',
        review: 'Review',
        critical: 'Critical',
        low: 'Low Stock',
        ok: 'In Stock',
    };

    return (
        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase ${styles[status] || styles.ok}`}>
            {labels[status] || status}
        </span>
    );
};

export const Button = ({ children, variant = 'primary', onClick, className = '', size = 'md' }) => {
    const variants = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200',
        danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200',
        secondary: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300',
        ghost: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`rounded-xl font-medium transition-all flex items-center gap-2 justify-center ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </motion.button>
    );
};
