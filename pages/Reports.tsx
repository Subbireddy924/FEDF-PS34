import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { GlassCard } from '../components/UI';

const DATA_COMPLIANCE = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 92 },
  { name: 'Jun', value: 98 },
];

const DATA_BY_DEPT = [
  { name: 'Eng', A: 80, B: 120 },
  { name: 'Sales', A: 45, B: 60 },
  { name: 'HR', A: 90, B: 40 },
  { name: 'Ops', A: 30, B: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur border border-white/20 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium">{label}</p>
        <p className="text-brand-cyan">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const ReportsPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics & Reports</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Compliance Trend */}
        <GlassCard className="h-[400px]">
          <h3 className="text-xl font-semibold mb-6">Compliance Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={DATA_COMPLIANCE}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B0F0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00B0F0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#00B0F0" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Certs by Department */}
        <GlassCard className="h-[400px]">
          <h3 className="text-xl font-semibold mb-6">Certifications by Dept</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={DATA_BY_DEPT}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="A" fill="#003087" radius={[4, 4, 0, 0]} />
              <Bar dataKey="B" fill="#00B0F0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};
