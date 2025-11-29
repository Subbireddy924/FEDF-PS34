import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';
import { Page, Role } from '../types';
import { GlassCard } from '../components/UI';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export const LoginPage = ({ onLogin }: LoginProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Select your role to continue</p>
        </motion.div>

        <div className="grid gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button 
              onClick={() => onLogin(Role.EMPLOYEE)}
              className="w-full text-left"
            >
              <GlassCard className="flex items-center gap-4 hover:border-brand-cyan/50 transition-colors">
                <div className="p-4 rounded-full bg-brand-cyan/20 text-brand-cyan">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Employee</h3>
                  <p className="text-sm text-slate-400">View and upload certificates</p>
                </div>
              </GlassCard>
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button 
              onClick={() => onLogin(Role.ADMIN)}
              className="w-full text-left"
            >
              <GlassCard className="flex items-center gap-4 hover:border-purple-500/50 transition-colors">
                <div className="p-4 rounded-full bg-purple-500/20 text-purple-400">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Administrator</h3>
                  <p className="text-sm text-slate-400">Manage approvals and reports</p>
                </div>
              </GlassCard>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
