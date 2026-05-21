import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Smartphone, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [step, setPhase] = useState<'method' | 'processing' | 'success'>('method');
  const navigate = useNavigate();

  const handlePay = () => {
    setPhase('processing');
    setTimeout(() => {
      setPhase('success');
    }, 2500);
  };

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen bg-home-sandstone relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(226,114,91,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {step === 'method' && (
            <motion.div
              key="method"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] soft-shadow terracotta-border mx-4 sm:mx-0"
            >
              <div className="text-center mb-8 sm:mb-12">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-home-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-home-terracotta" />
                 </div>
                 <h1 className="text-3xl sm:text-5xl font-serif text-home-maroon mb-2 sm:mb-4 italic">Secure Checkout</h1>
                 <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-home-clay/40">Powered by PhonePe Secure</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                 <button 
                   onClick={handlePay}
                   className="w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-home-terracotta/10 hover:border-home-terracotta bg-home-sandstone/30 flex items-center justify-between group transition-all"
                 >
                    <div className="flex items-center gap-4 sm:gap-6">
                       <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl soft-shadow group-hover:scale-110 transition-transform">
                          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-home-terracotta" />
                       </div>
                       <div className="text-left">
                          <h3 className="font-serif text-xl sm:text-2xl text-home-maroon">Cards / Netbanking</h3>
                          <p className="text-[8px] sm:text-[9px] font-bold text-home-clay/40 uppercase tracking-widest">Visa, Mastercard, UPI</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-home-terracotta/20 group-hover:translate-x-2 transition-all" />
                 </button>

                 <button 
                   onClick={handlePay}
                   className="w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-home-terracotta/10 hover:border-home-terracotta bg-home-sandstone/30 flex items-center justify-between group transition-all"
                 >
                    <div className="flex items-center gap-4 sm:gap-6">
                       <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl soft-shadow group-hover:scale-110 transition-transform">
                          <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-home-terracotta" />
                       </div>
                       <div className="text-left">
                          <h3 className="font-serif text-xl sm:text-2xl text-home-maroon">UPI Apps</h3>
                          <p className="text-[8px] sm:text-[9px] font-bold text-home-clay/40 uppercase tracking-widest">PhonePe, GPay, Paytm</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-home-terracotta/20 group-hover:translate-x-2 transition-all" />
                 </button>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-home-terracotta/5 flex items-center justify-center gap-3 sm:gap-4 text-home-clay/30">
                 <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                 <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">End-to-End Encrypted Transaction</span>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-white p-12 sm:p-20 rounded-[3rem] sm:rounded-[5rem] soft-shadow terracotta-border mx-4 sm:mx-0 w-full"
            >
               <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 sm:mb-12">
                  <div className="absolute inset-0 border-4 border-home-terracotta/10 rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-home-terracotta rounded-full"
                  />
               </div>
               <h2 className="text-3xl sm:text-4xl font-serif text-home-maroon mb-4">Verifying Payment</h2>
               <p className="text-sm sm:text-base text-home-clay italic">"Waiting for authentication from your bank..."</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-10 sm:p-24 rounded-[3rem] sm:rounded-[5rem] soft-shadow terracotta-border mx-4 sm:mx-0"
            >
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
                 className="w-20 h-20 sm:w-32 sm:h-32 bg-home-leaf rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-12 soft-shadow"
               >
                  <CheckCircle2 className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
               </motion.div>
               <h2 className="text-4xl sm:text-7xl font-serif text-home-maroon mb-4 sm:mb-6 tracking-tighter">Order <span className="text-home-terracotta italic">Placed</span></h2>
               <p className="text-base sm:text-xl text-home-clay italic mb-10 sm:mb-16 max-w-sm mx-auto">
                 "Thank you for letting us bring the taste of home to your table. We're starting to prepare your joys!"
               </p>
               <button 
                 onClick={() => navigate('/profile')}
                 className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-8 bg-home-terracotta text-white rounded-full font-black text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] soft-shadow hover:bg-home-maroon transition-all"
               >
                 Track My Order
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;
