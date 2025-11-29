import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BENEFITS } from '../constants';
import { PrimaryButton, GlassCard } from '../components/UI';
import { Page } from '../types';

export const LandingPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      
      {/* Navbar Placeholder */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl">
        <div className="text-2xl font-bold">FEDF-PS34</div>
        <div className="flex gap-6 items-center">
          <button onClick={() => setPage('SIGNIN')} className="text-sm font-medium hover:text-brand-cyan transition">Login</button>
          <button 
            onClick={() => setPage('SIGNUP')}
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto space-y-8 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold border border-brand-cyan/20">
            Professional Skill Certification Tracking
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Elevate Workforce <br />
          <span className="text-brand-cyan">Compliance & Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto"
        >
          The automated platform that ensures 100% compliance while reducing administrative effort by 70%.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <PrimaryButton onClick={() => setPage('SIGNIN')} icon={ArrowRight}>
            Get Started
          </PrimaryButton>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20 w-full max-w-6xl">
        {BENEFITS.map((item, idx) => (
          <GlassCard key={idx} delay={0.6 + (idx * 0.1)} className="text-left group cursor-default">
            <div className={`p-3 rounded-lg bg-white/5 w-fit mb-4 ${item.color} group-hover:bg-white/10 transition-colors`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};