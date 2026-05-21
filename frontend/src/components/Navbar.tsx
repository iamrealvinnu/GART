import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User as UserIcon, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Sweets', href: '/menu?category=sweets' },
    { name: 'Savouries', href: '/menu?category=savouries' },
    { name: 'Our Story', href: '/about' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
        isScrolled || isAdminPath ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-4 group cursor-pointer shrink-0">
          <div className="relative">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-1.5 sm:-inset-2 border border-home-terracotta/20 rounded-full"
             />
             <img src={logo} alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-home-saffron object-cover relative z-10 shadow-sm" />
          </div>
          <span className="font-serif text-xl sm:text-2xl tracking-tighter text-home-maroon group-hover:text-home-terracotta transition-colors">
            Dishana's <span className="italic">Kitchen</span>
          </span>
        </Link>

        {/* Desktop Links - Hidden on Admin Dashboard for focus */}
        {!isAdminPath && (
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`font-sans font-bold uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[9px] xl:text-[10px] transition-all relative group shrink-0 ${
                  location.pathname === link.href ? 'text-home-terracotta' : 'text-home-maroon/60 hover:text-home-terracotta'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-home-terracotta transition-all ${
                  location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {!isAdminPath && (
            <Link to="/cart" className="text-home-maroon hover:text-home-terracotta hover:scale-110 transition-all relative p-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
              <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 w-4 h-4 bg-home-saffron text-home-maroon text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">2</span>
            </Link>
          )}
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[8px] sm:text-[9px] font-black text-home-terracotta uppercase tracking-widest leading-none mb-1">{user?.role}</span>
                  <span className="text-[10px] sm:text-[11px] font-serif text-home-maroon italic leading-none">{user?.name?.split(' ')[0]}</span>
                </div>
                {isAdmin ? (
                   <Link to="/admin" className={`hover:scale-110 transition-all p-2 ${isAdminPath ? 'text-home-terracotta' : 'text-home-maroon'}`}>
                      <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
                   </Link>
                ) : (
                   <Link to="/profile" className="text-home-maroon hover:text-home-terracotta hover:scale-110 transition-all p-2">
                      <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
                   </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-home-maroon/40 hover:text-home-terracotta transition-all p-2"
                >
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-home-maroon hover:text-home-terracotta hover:scale-110 transition-all p-2">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
              </Link>
            )}
          </div>

          {!isAdminPath && (
            <button 
              className="lg:hidden text-home-maroon p-2 ml-1"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-home-sandstone flex flex-col items-center justify-center gap-8 sm:gap-12"
          >
            <button 
              className="absolute top-8 right-8 text-home-maroon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-home-maroon font-serif text-3xl sm:text-4xl hover:text-home-terracotta transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-home-terracotta font-serif text-xl sm:text-2xl italic border-t border-home-terracotta/10 pt-8"
              >
                Logout from {user?.name}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
