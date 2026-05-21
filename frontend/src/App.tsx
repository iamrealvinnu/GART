import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import WelcomeLoader from './components/WelcomeLoader';
import DreamyBackground from './components/DreamyBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import SlotSelection from './pages/SlotSelection';
import Payment from './pages/Payment';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Profile from './pages/Profile';

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const MessageCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.38 8.38 0 0 1 3.8.9L21 3.5Z" />
  </svg>
);

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.JSX.Element, requireAdmin?: boolean }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <WelcomeLoader key="loader" onFinished={() => setLoading(false)} />
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex flex-col min-h-screen bg-home-sandstone relative overflow-hidden"
        >
          <DreamyBackground />
          {!isAdminPath && <Navbar />}
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route 
                path="/slots" 
                element={
                  <ProtectedRoute>
                    <SlotSelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } 
              />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<div className="pt-60 text-center h-screen font-serif text-5xl">Our Story <br/><span className="text-home-terracotta italic text-2xl">Coming Soon</span></div>} />
            </Routes>
          </main>
          
          {!isAdminPath && (
            <footer className="bg-home-maroon text-home-sandstone py-16 md:py-24 border-t border-home-terracotta/10 relative z-20">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center md:text-left">
                <div className="md:col-span-2">
                  <h3 className="font-serif text-3xl md:text-4xl mb-6 md:mb-8 tracking-tighter text-home-saffron">Dishana's <span className="text-white italic">Kitchen</span></h3>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-md mx-auto md:mx-0 italic">
                    "Traditional recipes, handmade with pure ingredients and a whole lot of love. From our home to your table."
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <h4 className="font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] text-home-saffron mb-6 md:mb-8">Find Us</h4>
                  <div className="flex gap-4 md:gap-6 text-white/40">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-home-saffron hover:text-home-maroon hover:border-home-saffron transition-all">
                      <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-home-saffron hover:text-home-maroon hover:border-home-saffron transition-all">
                      <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-home-saffron hover:text-home-maroon hover:border-home-saffron transition-all">
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-20 pt-8 md:pt-10 border-t border-white/5 text-center text-[8px] md:text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">
                © 2026 Dishana's Kitchen. Pure Homemade Joy. <br className="md:hidden" />
                <span className="md:ml-4 text-home-saffron/80 font-bold tracking-widest">Made by GDI Nexus Software Solutions</span>
              </div>
            </footer>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
