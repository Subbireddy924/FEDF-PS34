import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_CERTIFICATES } from '../constants';
import { CertStatus } from '../types';
import { GlassCard, PrimaryButton, StatusBadge, ProgressRing } from '../components/UI';

export const EmployeeDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mock Upload Handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    toast.success("File uploaded successfully! Awaiting verification.");
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-slate-400">Manage your professional growth.</p>
        </div>
        <PrimaryButton onClick={() => setIsUploadOpen(true)} icon={Plus}>
          Add New Certificate
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Certs', val: '04', icon: FileText, color: 'text-white' },
          { label: 'Compliant', val: '100%', icon: CheckCircle, color: 'text-green-400' },
          { label: 'Expiring Soon', val: '01', icon: Clock, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <GlassCard key={i} className="flex items-center justify-between p-4" delay={i * 0.1}>
            <div>
              <p className="text-xs text-slate-400 uppercase">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.val}</h3>
            </div>
            <stat.icon className={`opacity-80 ${stat.color}`} />
          </GlassCard>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CERTIFICATES.map((cert, idx) => (
          <GlassCard key={cert.id} delay={0.2 + idx * 0.1} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <StatusBadge status={cert.status} />
              <ProgressRing 
                radius={24} 
                stroke={3} 
                progress={cert.progress} 
                color={cert.progress < 20 ? '#EF4444' : cert.progress < 50 ? '#EAB308' : '#22C55E'} 
              />
            </div>
            <h3 className="text-lg font-semibold line-clamp-1">{cert.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{cert.issuer}</p>
            
            <div className="mt-auto pt-4 border-t border-white/5 text-sm text-slate-400 flex justify-between">
              <span>Expires</span>
              <span className="font-mono text-white">{cert.expiryDate}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsUploadOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl z-10"
            >
              <h2 className="text-2xl font-bold mb-6">Upload Certificate</h2>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors ${
                  isDragging ? 'border-brand-cyan bg-brand-cyan/10' : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Upload className={isDragging ? 'text-brand-cyan' : 'text-slate-400'} size={32} />
                </div>
                <p className="text-lg font-medium">Drag & Drop file here</p>
                <p className="text-sm text-slate-500 mt-2">PDF, JPG or PNG up to 5MB</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsUploadOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                <PrimaryButton onClick={(e: any) => handleDrop(e)}>Upload</PrimaryButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
