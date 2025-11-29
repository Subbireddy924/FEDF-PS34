import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, FileText, BarChart2, LogOut } from 'lucide-react';
import { Role, Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
  userRole: Role;
}

const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-dark/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
  </div>
);

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <motion.button
    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active ? 'text-brand-cyan bg-brand-cyan/10' : 'text-slate-400 hover:text-white'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {active && <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-8 bg-brand-cyan rounded-r-full" />}
  </motion.button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage, userRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (currentPage === 'LANDING' || currentPage === 'LOGIN') {
    return (
      <div className="min-h-screen text-white relative selection:bg-brand-cyan/30">
        <Background />
        {children}
      </div>
    );
  }

  const menuItems = userRole === Role.ADMIN 
    ? [
        { id: 'ADMIN', label: 'Dashboard', icon: Home },
        { id: 'REPORTS', label: 'Reports & Analytics', icon: BarChart2 },
        { id: 'JOURNEY', label: 'User Journey', icon: FileText },
      ]
    : [
        { id: 'EMPLOYEE', label: 'My Certificates', icon: Home },
        { id: 'JOURNEY', label: 'My Journey', icon: FileText },
      ];

  return (
    <div className="flex min-h-screen text-white relative selection:bg-brand-cyan/30 overflow-hidden">
      <Background />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/10 backdrop-blur rounded-lg">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-border border-r border-white/10 bg-black/20 backdrop-blur-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-dark flex items-center justify-center font-bold text-white">
              P
            </div>
            <span className="text-xl font-bold tracking-tight">ProSkill<span className="text-brand-cyan">34</span></span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
            {menuItems.map((item) => (
              <NavItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={currentPage === item.id}
                onClick={() => {
                  setPage(item.id as Page);
                  setIsMobileMenuOpen(false);
                }}
              />
            ))}
          </div>
        </div>

        <NavItem 
          icon={LogOut} 
          label="Sign Out" 
          active={false} 
          onClick={() => setPage('LANDING')} 
        />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen relative">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};