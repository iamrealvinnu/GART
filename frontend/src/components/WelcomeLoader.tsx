import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import logo from '../assets/logo.jpg';

const WelcomeLoader = ({ onFinished }: { onFinished: () => void }) => {
  const [phase, setPhase] = useState(0);

  const particles = useMemo(() => {
    return [
      { initialX: -45, animateX: 120, duration: 9.2, delay: 0.5, size: 8, opacity: 0.8 },
      { initialX: 80, animateX: -340, duration: 11.5, delay: 1.2, size: 12, opacity: 0.6 },
      { initialX: -120, animateX: 450, duration: 8.8, delay: 0.2, size: 6, opacity: 0.9 },
      { initialX: 30, animateX: -210, duration: 10.1, delay: 2.1, size: 10, opacity: 0.7 },
      { initialX: -90, animateX: 380, duration: 11.9, delay: 1.5, size: 14, opacity: 0.5 },
      { initialX: 150, animateX: -480, duration: 9.5, delay: 0.8, size: 9, opacity: 0.8 },
      { initialX: -20, animateX: 150, duration: 10.7, delay: 1.9, size: 11, opacity: 0.7 },
      { initialX: 60, animateX: -320, duration: 8.2, delay: 0.4, size: 7, opacity: 0.9 },
      { initialX: -110, animateX: 410, duration: 11.1, delay: 2.5, size: 13, opacity: 0.6 },
      { initialX: 40, animateX: -190, duration: 9.8, delay: 1.1, size: 10, opacity: 0.8 },
      { initialX: -75, animateX: 350, duration: 10.4, delay: 0.7, size: 12, opacity: 0.7 },
      { initialX: 130, animateX: -420, duration: 8.9, delay: 2.3, size: 8, opacity: 0.9 },
      { initialX: -55, animateX: 280, duration: 11.3, delay: 1.4, size: 15, opacity: 0.5 },
      { initialX: 95, animateX: -370, duration: 9.1, delay: 0.9, size: 7, opacity: 0.8 },
      { initialX: -10, animateX: 230, duration: 10.6, delay: 1.8, size: 11, opacity: 0.7 },
      { initialX: -160, animateX: 520, duration: 12.5, delay: 0.1, size: 10, opacity: 0.6 },
      { initialX: 180, animateX: -550, duration: 9.8, delay: 1.6, size: 14, opacity: 0.5 },
      { initialX: -200, animateX: 600, duration: 10.2, delay: 2.8, size: 7, opacity: 0.9 },
      { initialX: 50, animateX: -150, duration: 11.0, delay: 0.4, size: 13, opacity: 0.7 },
      { initialX: -30, animateX: 250, duration: 8.5, delay: 1.3, size: 9, opacity: 0.8 },
      { initialX: 110, animateX: -280, duration: 12.0, delay: 2.2, size: 11, opacity: 0.6 },
      { initialX: -140, animateX: 320, duration: 9.4, delay: 0.6, size: 15, opacity: 0.5 },
      { initialX: 200, animateX: -600, duration: 10.8, delay: 1.9, size: 8, opacity: 0.8 },
      { initialX: -100, animateX: 480, duration: 11.6, delay: 0.3, size: 12, opacity: 0.7 },
      { initialX: 70, animateX: -420, duration: 8.7, delay: 1.7, size: 10, opacity: 0.9 },
      { initialX: -180, animateX: 580, duration: 12.2, delay: 2.4, size: 14, opacity: 0.6 },
      { initialX: 140, animateX: -310, duration: 9.1, delay: 0.8, size: 9, opacity: 0.8 },
      { initialX: -40, animateX: 210, duration: 10.5, delay: 1.5, size: 11, opacity: 0.7 },
      { initialX: 160, animateX: -490, duration: 11.4, delay: 2.7, size: 7, opacity: 0.9 },
      { initialX: -65, animateX: 390, duration: 8.3, delay: 0.5, size: 13, opacity: 0.6 },
    ];
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  
      setTimeout(() => setPhase(2), 2000), 
      setTimeout(() => setPhase(3), 4000), 
      setTimeout(() => setPhase(4), 6000), 
      setTimeout(() => onFinished(), 7500), 
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-home-sandstone flex items-center justify-center overflow-hidden bg-angan"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-1/4 -right-1/4 w-[1200px] h-[1200px] bg-home-saffron rounded-full blur-[250px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] bg-home-terracotta rounded-full blur-[200px] pointer-events-none"
      />

      <motion.div 
        animate={{ 
          opacity: phase >= 1 ? [0, 0.6, 0.4] : 0,
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(244,196,48,0.3)_0%,transparent_70%)] pointer-events-none" 
      />

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-64 sm:w-80 h-64 sm:h-80 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: [i * 60, i * 60 + 10, i * 60],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute w-full h-full border-2 border-home-terracotta/20 rounded-[40%_60%_40%_60%]"
                  style={{ rotate: `${i * 60}deg` }}
                />
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 1.5, type: "spring", stiffness: 60 }}
                className="relative z-10 p-3 sm:p-4 bg-white rounded-full shadow-2xl terracotta-border"
              >
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-32 sm:w-44 h-32 sm:h-44 rounded-full object-cover border-4 border-home-saffron/50"
                />
              </motion.div>
            </div>

            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mt-16 text-center"
              >
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-home-maroon tracking-tight drop-shadow-sm">
                  Dishana's <span className="text-home-terracotta italic font-normal">Kitchen</span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-home-terracotta/30 to-transparent my-6"
                />
                <motion.p 
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-home-clay tracking-[0.8em] text-[11px] font-black mt-4 uppercase"
                >
                  Handmade with Love
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-16 text-[12px] font-black uppercase tracking-[0.6em] text-home-maroon"
        >
          Made by GDI Nexus Software Solutions
        </motion.div>
      )}

      {phase >= 1 && particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: p.initialX, 
            y: 400,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: -1200,
            x: p.animateX,
            opacity: [0, p.opacity, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.8]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          className="absolute bg-home-saffron rounded-full blur-[2px] pointer-events-none"
          style={{ 
            width: p.size, 
            height: p.size * 1.5,
            boxShadow: `0 0 10px rgba(244, 196, 48, 0.4)`
          }}
        />
      ))}
    </motion.div>
  );
};

export default WelcomeLoader;
