import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SlotSelection = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const navigate = useNavigate();

  const slots = [
    { id: 1, date: 'May 23, 2026', time: '10:00 AM - 12:00 PM', type: 'Pickup', capacity: 10, booked: 4 },
    { id: 2, date: 'May 23, 2026', time: '02:00 PM - 04:00 PM', type: 'Delivery', capacity: 15, booked: 12 },
    { id: 3, date: 'May 24, 2026', time: '09:00 AM - 11:00 AM', type: 'Pickup', capacity: 5, booked: 5 }, // Full
    { id: 4, date: 'May 24, 2026', time: '04:00 PM - 06:00 PM', type: 'Delivery', capacity: 20, booked: 8 },
  ];

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen bg-white relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-silk scale-110" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-home-sandstone rounded-3xl terracotta-border mb-8"
          >
             <Sparkles className="text-home-terracotta w-8 h-8 animate-pulse" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-serif text-home-maroon mb-6">Pick Your <span className="text-home-terracotta italic">Time</span></h1>
          <p className="text-xl text-home-clay font-light max-w-2xl mx-auto italic leading-relaxed">
            "Everything is made fresh. Choose a time when you can enjoy it best."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {slots.map((slot, i) => {
            const isFull = slot.booked >= slot.capacity;
            const isSelected = selectedSlot === slot.id;

            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => !isFull && setSelectedSlot(slot.id)}
                className={`group relative p-12 rounded-[4rem] border-2 transition-all cursor-pointer overflow-hidden
                  ${isFull ? 'opacity-40 grayscale cursor-not-allowed border-gray-100 bg-gray-50' : 'soft-shadow hover:scale-[1.02]'}
                  ${isSelected ? 'bg-home-sandstone border-home-terracotta' : 'bg-white border-home-terracotta/10'}
                `}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${slot.type === 'Delivery' ? 'bg-home-terracotta text-white' : 'bg-home-leaf text-white'}
                    `}>
                      {slot.type}
                    </div>
                    {isFull ? (
                      <div className="flex items-center gap-2 text-home-maroon font-bold text-[10px] uppercase tracking-widest">
                        <AlertCircle className="w-4 h-4" /> Full
                      </div>
                    ) : (
                      <div className="text-home-clay/40 text-[10px] font-bold uppercase tracking-widest">
                        {slot.capacity - slot.booked} spots left
                      </div>
                    )}
                  </div>

                  <h3 className="text-4xl font-serif text-home-maroon mb-3">{slot.date}</h3>
                  <div className="flex items-center gap-4 text-home-clay/60 mb-10">
                    <Clock className="w-5 h-5 text-home-terracotta" />
                    <span className="font-medium text-lg">{slot.time}</span>
                  </div>

                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-12 right-12"
                    >
                       <div className="bg-home-terracotta p-4 rounded-full soft-shadow">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                       </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Visual Accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-home-saffron/5 rounded-full blur-3xl group-hover:bg-home-saffron/10 transition-colors" />
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedSlot ? 1 : 0 }}
          className="mt-24 text-center"
        >
          <button 
            onClick={() => navigate('/payment')}
            className="px-24 py-8 bg-home-maroon text-white font-black text-2xl uppercase tracking-[0.4em] rounded-full soft-shadow hover:bg-home-terracotta transition-all hover:scale-105"
          >
            Proceed to Payment
          </button>
          <p className="mt-8 text-xs text-home-clay font-bold tracking-[0.2em] uppercase">Secure payment via PhonePe</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SlotSelection;
