import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, AlertCircle, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { APPROVAL_QUEUE } from '../constants';
import { GlassCard, PrimaryButton } from '../components/UI';

export const AdminDashboard = () => {
  const [queue, setQueue] = React.useState(APPROVAL_QUEUE);

  const handleApprove = (id: number) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00B0F0', '#003087', '#ffffff']
    });
    toast.success('Certificate Approved!');
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id: number) => {
    toast.error('Certificate Rejected');
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
      </div>

      {/* Stats Counters */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Total Employees', val: 1240, icon: Users, color: 'text-blue-400' },
          { title: 'Pending Reviews', val: 12, icon: FileCheck, color: 'text-brand-cyan' },
          { title: 'Non-Compliant', val: 5, icon: AlertCircle, color: 'text-red-400' },
        ].map((stat, i) => (
          <GlassCard key={i} delay={i * 0.1} className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">{stat.title}</p>
              <h3 className="text-3xl font-bold">{stat.val}</h3>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Approval Queue */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Approval Queue</h2>
          {queue.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white/5 rounded-2xl border border-white/5">
              No pending approvals.
            </div>
          ) : (
            queue.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-dark to-brand-cyan flex items-center justify-center font-bold">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.user}</h4>
                    <p className="text-sm text-slate-400">{item.cert} • <span className="text-xs">{item.date}</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReject(item.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="p-2 rounded-lg hover:bg-green-500/20 text-green-400 transition"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Recent Activity (Visual Placeholder) */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Live Activity</h2>
          <GlassCard className="h-[400px] relative overflow-hidden">
            <div className="space-y-6">
              {[1,2,3,4,5].map((_, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(0,176,240,0.5)]" />
                  <div>
                    <p className="text-slate-300">System validated <span className="text-white font-medium">AWS Cert</span></p>
                    <p className="text-xs text-slate-500">Just now</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient Overlay for Fade Effect */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
