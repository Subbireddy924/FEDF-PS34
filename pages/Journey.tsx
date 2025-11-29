import React from 'react';
import { motion } from 'framer-motion';
import { JOURNEY_STEPS } from '../constants';
import { GlassCard } from '../components/UI';

export const JourneyPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Certification Journey</h1>
        <p className="text-slate-400">How FEDF-PS34 processes your success.</p>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-brand-dark via-brand-cyan to-brand-dark -translate-y-1/2 hidden md:block origin-left"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3 }}
            >
              <GlassCard className="text-center h-full flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.3 + 0.2, type: "spring" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-dark/20 flex items-center justify-center mb-4 border border-white/10 shadow-[0_0_30px_rgba(0,176,240,0.15)]"
                >
                  <step.icon size={32} className="text-brand-cyan" />
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-xs font-bold text-slate-400">
                  {idx + 1}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
