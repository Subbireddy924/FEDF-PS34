import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Page, Role } from './types';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { EmployeeDashboard } from './pages/Employee';
import { AdminDashboard } from './pages/Admin';
import { JourneyPage } from './pages/Journey';
import { ReportsPage } from './pages/Reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('LANDING');
  const [userRole, setUserRole] = useState<Role>(Role.GUEST);

  const handleLogin = (role: Role) => {
    setUserRole(role);
    setCurrentPage(role === Role.ADMIN ? 'ADMIN' : 'EMPLOYEE');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'LANDING': return <LandingPage setPage={setCurrentPage} />;
      case 'SIGNIN': return <SignInPage setPage={setCurrentPage} />;
      case 'SIGNUP': return <SignUpPage setPage={setCurrentPage} />;
      case 'LOGIN': return <LoginPage onLogin={handleLogin} />;
      case 'EMPLOYEE': return <EmployeeDashboard />;
      case 'ADMIN': return <AdminDashboard />;
      case 'JOURNEY': return <JourneyPage />;
      case 'REPORTS': return <ReportsPage />;
      default: return <LandingPage setPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
      
      <Layout currentPage={currentPage} setPage={setCurrentPage} userRole={userRole}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}