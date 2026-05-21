import { motion } from 'framer-motion';

const FloatingSpice = ({ delay, color, size, x, y, duration }: { delay: number, color: string, size: number, x: string, y: string, duration: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0],
      scale: [0.5, 1, 0.5],
      y: ['0px', '-100px', '-200px'],
      rotate: [0, 90, 180]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="fixed pointer-events-none z-0"
    style={{ left: x, top: y }}
  >
    <div 
      className="rounded-full blur-[2px]" 
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        boxShadow: `0 0 15px ${color}44`
      }} 
    />
  </motion.div>
);

const DreamyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-angan">
      <FloatingSpice delay={0} color="#E2725B" size={6} x="10%" y="80%" duration={14} />
      <FloatingSpice delay={3} color="#F4C430" size={8} x="85%" y="20%" duration={16} />
      <FloatingSpice delay={6} color="#FFC107" size={4} x="40%" y="70%" duration={15} />
      <FloatingSpice delay={1} color="#E2725B" size={5} x="70%" y="40%" duration={13} />
      <FloatingSpice delay={8} color="#F4C430" size={3} x="20%" y="30%" duration={17} />
      
      {/* Soft Sunlight Glows */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-home-saffron rounded-full blur-[250px] -mr-[500px] -mt-[500px]"
      />
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.08, 0.03],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, delay: 5 }}
        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-home-terracotta rounded-full blur-[250px] -ml-[400px] -mb-[400px]"
      />
    </div>
  );
};

export default DreamyBackground;
