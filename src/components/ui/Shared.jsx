/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, noPadding = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`bg-[#FBFAF7] rounded-[14px] border border-[#DED9CF] shadow-[0_4px_14px_rgba(0,0,0,0.06)] ${!noPadding ? 'p-6' : ''} ${className}`}
    >
        {children}
    </motion.div>
);

export const Badge = ({ status }) => {
    const styles = {
        // Muted, trustworthy colors
        pending: 'bg-[#F0EBE0] text-[#8C7B65]', // Beige/Brown
        completed: 'bg-[#E3EFE5] text-[#2F5E38]', // Soft Green
        approved: 'bg-[#E3EFE5] text-[#2F5E38]',
        rejected: 'bg-[#FBEAE9] text-[#9E3833]', // Soft Red
        review: 'bg-[#FFF6E0] text-[#946C00]', // Soft Yellow
        critical: 'bg-[#FBEAE9] text-[#9E3833]',
        low: 'bg-[#F0EBE0] text-[#8C7B65]',
        ok: 'bg-[#F2F4F7] text-[#475467]', // Neutral
    };

    const labels = {
        pending: 'Pending',
        completed: 'Completed',
        approved: 'Approved',
        rejected: 'Rejected',
        review: 'Needs Review',
        critical: 'Critical Alert',
        low: 'Low Stock',
        ok: 'In Stock',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${styles[status] || styles.ok}`}>
            {labels[status] || status}
        </span>
    );
};

export const Button = ({ children, variant = 'primary', onClick, className = '', size = 'md' }) => {
    const variants = {
        primary: 'bg-[#1E1E1E] hover:bg-[#000000] text-white shadow-sm',
        secondary: 'bg-[#E8E1D6] hover:bg-[#DDD5C8] text-[#1F1F1F]',
        danger: 'bg-[#9E3833] hover:bg-[#852D28] text-white',
        ghost: 'text-[#6B6B6B] hover:bg-[#E8E1D6] hover:text-[#1F1F1F]',
        white: 'bg-white border border-[#DED9CF] text-[#1F1F1F] hover:bg-[#FAFAFA]',
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
            className={`rounded-[14px] font-medium transition-all flex items-center gap-2 justify-center ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </motion.button>
    );
};
