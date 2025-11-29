import React from 'react';
import { motion } from 'framer-motion';
import { CertStatus } from '../types';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
    className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden group ${className}`}
  >
    {/* Hover glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 to-brand-dark/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
    <div className="relative">
      {children}
    </div>
  </motion.div>
);

export const PrimaryButton = ({ children, onClick, className = '', icon: Icon }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 176, 240, 0.4)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-dark to-brand-cyan text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all ${className}`}
  >
    {Icon && <Icon size={18} />}
    {children}
  </motion.button>
);

export const StatusBadge = ({ status }: { status: CertStatus }) => {
  const styles = {
    [CertStatus.ACTIVE]: 'bg-green-500/10 text-green-400 border-green-500/20',
    [CertStatus.EXPIRING]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse',
    [CertStatus.EXPIRED]: 'bg-red-500/10 text-red-400 border-red-500/20',
    [CertStatus.PENDING]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

export const ProgressRing = ({ radius, stroke, progress, color }: any) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ strokeDasharray: circumference + ' ' + circumference }}
        />
      </svg>
      <div className="absolute text-xs font-bold text-white">{progress}%</div>
    </div>
  );
};