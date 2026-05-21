import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Sparkles, UserPlus, Loader2, AlertCircle, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(name, email, password);
      }

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError(isLogin 
          ? 'Invalid credentials. Hint: customer@example.com / password' 
          : 'Registration failed. Please try again.'
        );
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-home-sandstone flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Soft Sun Ray Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,196,48,0.08)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-white p-6 sm:p-8 md:p-16 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl terracotta-border relative z-10"
      >
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block relative mb-4 sm:mb-6"
          >
            <div className="absolute -inset-1.5 sm:-inset-2 border border-dashed border-home-saffron/40 rounded-full animate-spin-slow" />
            <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-home-saffron object-cover relative z-10 shadow-sm" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-home-maroon mb-2 tracking-tight">
            {isLogin ? 'Welcome ' : 'Join the '}
            <span className="text-home-terracotta italic">{isLogin ? 'Home' : 'Family'}</span>
          </h1>
          <p className="text-home-clay/40 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            {isLogin ? 'Join the Dishana Family' : 'Create your account'}
          </p>
        </div>

        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          <AnimatePresence mode='wait'>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-3 text-[10px] sm:text-[11px] font-bold italic border border-red-100"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 sm:space-y-6">
            <AnimatePresence mode='wait'>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <span className="text-[8px] sm:text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-1">Full Name</span>
                  <div className="flex items-center border-b border-home-terracotta/10 group-focus-within:border-home-terracotta transition-all py-1.5 sm:py-2">
                    <UserIcon className="w-4 h-4 text-home-clay/30 group-focus-within:text-home-terracotta transition-colors mr-3" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dishana User" 
                      required={!isLogin}
                      className="w-full bg-transparent text-home-maroon font-serif text-base sm:text-lg focus:outline-none placeholder:text-home-clay/20 placeholder:italic"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <span className="text-[8px] sm:text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-1">Email Address</span>
              <div className="flex items-center border-b border-home-terracotta/10 group-focus-within:border-home-terracotta transition-all py-1.5 sm:py-2">
                 <Mail className="w-4 h-4 text-home-clay/30 group-focus-within:text-home-terracotta transition-colors mr-3" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="your@email.com" 
                   required
                   className="w-full bg-transparent text-home-maroon font-serif text-base sm:text-lg focus:outline-none placeholder:text-home-clay/20 placeholder:italic"
                 />
              </div>
            </div>

            <div className="relative group">
              <span className="text-[8px] sm:text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-1">Your Password</span>
              <div className="flex items-center border-b border-home-terracotta/10 group-focus-within:border-home-terracotta transition-all py-1.5 sm:py-2">
                 <Lock className="w-4 h-4 text-home-clay/30 group-focus-within:text-home-terracotta transition-colors mr-3" />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••" 
                   required
                   className="w-full bg-transparent text-home-maroon font-serif text-base sm:text-lg focus:outline-none placeholder:text-home-clay/20"
                 />
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 sm:py-5 bg-home-terracotta text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl sm:rounded-2xl shadow-lg hover:bg-home-maroon transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Verifying...' : 'Creating...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Join Now'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 sm:mt-10 text-center space-y-4 sm:space-y-6">
          <div className="flex items-center gap-4 text-home-clay/10">
             <div className="h-[1px] flex-grow bg-current" />
             <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-home-clay/30">
               {isLogin ? 'New Member?' : 'Already a Member?'}
             </span>
             <div className="h-[1px] flex-grow bg-current" />
          </div>
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="flex items-center justify-center gap-2 mx-auto text-home-terracotta font-serif text-base sm:text-lg italic hover:text-home-maroon transition-colors"
          >
            {isLogin ? (
              <><UserPlus className="w-4 h-4" /> Create your Account</>
            ) : (
              <><ArrowLeft className="w-4 h-4" /> Back to Login</>
            )}
          </button>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-home-terracotta/5 flex justify-center gap-6 opacity-40">
           <Sparkles className="w-4 h-4 text-home-saffron" />
           <span className="text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-home-clay">Homegrown & Secure</span>
           <Sparkles className="w-4 h-4 text-home-saffron" />
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
