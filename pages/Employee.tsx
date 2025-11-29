import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, FileText, CheckCircle, Clock, X, Image as ImageIcon, File as FileIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_CERTIFICATES } from '../constants';
import { CertStatus } from '../types';
import { GlassCard, PrimaryButton, StatusBadge, ProgressRing } from '../components/UI';

export const EmployeeDashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate file type
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      // Validate file size (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    } else {
      toast.error('Only Image (JPG, PNG) or PDF files are allowed.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const loadingToast = toast.loading("Uploading certificate...");
    
    // Simulate network delay
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("File uploaded successfully! Awaiting verification.");
      setIsUploadOpen(false);
      // Reset state
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
                onClick={() => fileInputRef.current?.click()}
                className={`group border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
                  isDragging 
                    ? 'border-brand-cyan bg-brand-cyan/10' 
                    : selectedFile 
                      ? 'border-brand-cyan/50 bg-brand-cyan/5'
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                />

                {selectedFile ? (
                  <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <button 
                      onClick={clearFile}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/80 text-white transition-colors z-20"
                    >
                      <X size={16} />
                    </button>

                    {previewUrl ? (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4 border border-white/10">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-red-400">
                        <FileIcon size={40} />
                      </div>
                    )}
                    
                    <p className="font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <>
                    <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                      <Upload className={isDragging ? 'text-brand-cyan' : 'text-slate-400'} size={32} />
                    </div>
                    <p className="text-lg font-medium">Click to upload or drag & drop</p>
                    <p className="text-sm text-slate-500 mt-2">PDF, JPG or PNG up to 5MB</p>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setIsUploadOpen(false)} 
                  className="px-4 py-2 text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <PrimaryButton 
                  onClick={handleUpload}
                  className={!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Upload Certificate
                </PrimaryButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};