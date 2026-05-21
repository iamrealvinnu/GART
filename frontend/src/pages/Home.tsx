import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Heart, Sparkles, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const yText = useTransform(smoothProgress, [0, 0.5], [0, 200]);
  const opacityText = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const specialties = [
    { name: 'Pure Ghee Mysore Pak', cat: 'Traditional Sweets', img: 'https://indiasweethouse.in/cdn/shop/files/BadamMysorePak_eec04e7e-ba9b-41bd-90c1-e07dfeabef14.png?v=1724998308', size: 'large' },
    { name: 'Spicy Madras Mixture', cat: 'Homemade Snacks', img: 'https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture8.jpg', size: 'small' },
    { name: 'Mango Thokku', cat: 'Traditional Pickles', img: 'https://holycowvegan.net/wp-content/uploads/2026/03/mango-thokku-green-mango-pickle.jpg', size: 'small' },
    { name: 'Heritage Gift Box', cat: 'Custom Boxes', img: 'https://m.media-amazon.com/images/I/91cMeeBaPuL.jpg', size: 'medium' },
  ];

  return (
    <div className="relative bg-angan min-h-screen text-home-maroon overflow-x-hidden">
      
      {/* Cinematic Hero: "The Soul of Our Kitchen" */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-home-sandstone py-20">
        {/* Layered Background Effects */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-home-saffron rounded-full blur-[250px] pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-home-terracotta rounded-full blur-[200px] pointer-events-none"
        />

        <motion.div 
          style={{ scale: heroScale }} 
          className="absolute inset-0 z-0 p-4 sm:p-8 md:p-16 lg:p-24"
        >
          <div className="w-full h-full rounded-[2rem] sm:rounded-[3rem] md:rounded-[5rem] overflow-hidden soft-shadow relative">
            <img 
              src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2500" 
              alt="Pure and Timeless Homemade Delicacies" 
              className="w-full h-full object-cover brightness-[0.85] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-home-sandstone via-transparent to-black/20" />
          </div>
        </motion.div>

        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-center px-6 max-w-full"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-6 md:mb-12 inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full soft-shadow terracotta-border"
          >
            <Heart className="text-home-terracotta w-4 h-4 sm:w-5 sm:h-5 fill-home-terracotta animate-pulse" />
            <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-home-clay">The Art of Homemade</span>
          </motion.div>
          
          <h1 className="text-[15vw] sm:text-[12vw] lg:text-[11vw] xl:text-[13rem] font-serif leading-[0.8] tracking-tighter mb-8 md:mb-10 drop-shadow-2xl">
            <motion.span 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="block text-white"
            >
              PURE &
            </motion.span>
            <motion.span 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
              className="text-home-saffron italic font-normal block"
            >
              TIMELESS
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-light tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-12 md:mb-16 max-w-5xl mx-auto text-white/90"
          >
            Hand-Crafted Delicacies from Our Home to Yours
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, duration: 1, type: "spring" }}
          >
            <Link to="/menu" className="inline-block px-8 sm:px-12 md:px-20 py-5 sm:py-6 md:py-8 bg-home-terracotta text-white rounded-full font-black text-sm sm:text-xl md:text-2xl uppercase tracking-[0.2em] sm:tracking-[0.3em] relative group overflow-hidden soft-shadow transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-4 sm:gap-6">Explore the Kitchen <MoveRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-4 transition-transform duration-500" /></span>
              <div className="absolute inset-0 bg-home-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Hidden on very small screens */}
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-4"
        >
          <span className="text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-home-clay font-black opacity-60">Scroll to Taste</span>
          <div className="w-[2px] h-12 sm:h-20 bg-gradient-to-b from-home-terracotta to-transparent relative rounded-full">
             <motion.div 
               animate={{ y: [0, 40, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-[-2px] w-[6px] h-6 bg-home-saffron rounded-full blur-[1px]"
             />
          </div>
        </motion.div>
      </section>

      {/* Specialty Grid: "The Harvest" */}
      <section className="py-20 sm:py-40 md:py-60 px-6 max-w-[1600px] mx-auto relative">
        <div className="absolute top-0 right-0 p-12 sm:p-24 opacity-[0.05] pointer-events-none animate-spin-slow text-home-terracotta">
           <svg viewBox="0 0 100 100" fill="currentColor" className="w-[200px] h-[200px] sm:w-[500px] sm:h-[500px]">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
           </svg>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-16 sm:mb-32 gap-8 lg:gap-16 border-b border-home-terracotta/10 pb-12 sm:pb-20 text-center lg:text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6 sm:mb-8"
            >
              <div className="w-8 sm:w-12 h-[2px] bg-home-terracotta" />
              <span className="text-home-terracotta font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[8px] sm:text-[10px]">Small Batches, Big Heart</span>
            </motion.div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[8vw] xl:text-[11rem] font-serif leading-none tracking-tighter">
              The <span className="text-home-saffron italic font-normal">Signature</span> <br className="hidden sm:block"/>Collection
            </h2>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-home-clay font-light max-w-lg leading-relaxed italic opacity-80 border-t-2 sm:border-t-0 sm:border-l-2 border-home-saffron pt-8 sm:pt-0 sm:pl-10">
            "Every recipe is a legacy, every ingredient is chosen with the same care we use for our own family."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 h-auto md:h-[1400px]">
          {specialties.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] md:rounded-[5rem] bg-white soft-shadow terracotta-border cursor-pointer aspect-square sm:aspect-auto
                ${item.size === 'large' ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : ''}
                ${item.size === 'medium' ? 'md:col-span-2 md:row-span-1 min-h-[300px]' : ''}
                ${item.size === 'small' ? 'md:col-span-1 md:row-span-1 min-h-[250px]' : ''}
              `}
            >
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-home-maroon/90 via-home-maroon/20 to-transparent opacity-100 transition-all duration-700" />
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-14 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-home-saffron font-bold text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 sm:mb-4 block opacity-100 transition-opacity delay-100">{item.cat}</span>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-4 sm:mb-8 transition-colors duration-500">{item.name}</h3>
                <Link to="/menu" className="inline-flex items-center gap-4 sm:gap-6 text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/80 group-hover:text-home-saffron transition-all duration-500">
                  Shop this taste <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-4 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Purity & Tradition Section */}
      <section className="bg-white py-20 sm:py-40 md:py-60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 lg:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="space-y-12 sm:space-y-20 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-home-sandstone rounded-2xl sm:rounded-3xl terracotta-border soft-shadow">
               <Star className="text-home-terracotta w-6 h-6 sm:w-10 sm:h-10 animate-spin-slow" />
               <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">Quality Assured</span>
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[7vw] xl:text-[10rem] font-serif leading-[0.85] tracking-tighter">
              Purity <br/><span className="italic text-home-terracotta font-normal">Defined</span> <br/>By Tradition
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl font-light leading-relaxed text-home-clay italic max-w-2xl mx-auto lg:mx-0 opacity-80">
              "We don't use shortcuts. Our spices are stone-ground, our ghee is clarified at home, and our love is the secret ingredient."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 pt-8">
               <div className="group">
                  <h4 className="text-3xl sm:text-4xl font-serif mb-3 sm:mb-4 group-hover:text-home-terracotta transition-colors">100% Natural</h4>
                  <div className="w-12 h-1 bg-home-saffron mb-3 sm:mb-4 mx-auto lg:mx-0" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-home-clay/60">No Preservatives or Colors</p>
               </div>
               <div className="group">
                  <h4 className="text-3xl sm:text-4xl font-serif mb-3 sm:mb-4 group-hover:text-home-terracotta transition-colors">Stone Ground</h4>
                  <div className="w-12 h-1 bg-home-saffron mb-3 sm:mb-4 mx-auto lg:mx-0" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-home-clay/60">Retaining Essential Oils</p>
               </div>
            </div>
          </motion.div>

          <div className="relative group max-w-2xl mx-auto w-full">
             <motion.div 
               initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
               whileInView={{ rotate: 3, scale: 1, opacity: 1 }}
               transition={{ duration: 1.5 }}
               viewport={{ once: true }}
               className="aspect-[4/5] rounded-[3rem] sm:rounded-[4rem] md:rounded-[8rem] overflow-hidden soft-shadow terracotta-border group-hover:rotate-0 transition-all duration-1000 relative z-10"
             >
                <img 
                  src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1500" 
                  className="w-full h-full object-cover brightness-[0.9] contrast-[1.1]"
                  alt="Authentic Cooking Process"
                />
                <div className="absolute inset-0 bg-home-maroon/10 mix-blend-overlay" />
             </motion.div>
             
             {/* Decorative Elements */}
             <div className="absolute -top-6 -right-6 sm:-top-12 sm:-right-12 w-32 h-32 sm:w-64 sm:h-64 bg-home-saffron/20 rounded-full blur-[40px] sm:blur-[80px] -z-10 animate-pulse-warm" />
             <motion.div 
                animate={{ rotate: -12, y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 sm:-bottom-16 sm:-left-16 w-32 h-32 sm:w-56 sm:h-56 bg-home-maroon rounded-full flex flex-col items-center justify-center p-6 sm:p-10 text-center soft-shadow z-20 border-2 sm:border-4 border-white"
             >
                <Sparkles className="text-home-saffron w-5 h-5 sm:w-8 sm:h-8 mb-2 sm:mb-4" />
                <span className="font-black text-[7px] sm:text-[10px] md:text-xs text-white uppercase tracking-tighter leading-tight">AUTHENTIC FAMILY RECIPES</span>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-40 md:py-60 bg-home-sandstone relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 md:gap-20">
          {[
            { icon: Heart, title: 'Made at Home', desc: 'Prepared in small batches in our clean, sacred home kitchen.' },
            { icon: ShieldCheck, title: 'Zero Chemicals', desc: 'Pure ingredients only. No artificial anything, ever.' },
            { icon: Star, title: 'Heirloom Taste', desc: 'Recipes passed down through generations of our family.' },
            { icon: ShoppingBag, title: 'Freshly Packed', desc: 'Made fresh upon your order and delivered with utmost care.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -20 }}
              className="text-center group"
            >
               <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center soft-shadow border border-home-terracotta/10 group-hover:bg-home-terracotta group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <item.icon className="w-8 h-8 sm:w-12 sm:h-12" />
               </div>
               <h4 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6 group-hover:text-home-terracotta transition-colors">{item.title}</h4>
               <p className="text-sm sm:text-base text-home-clay/70 font-light italic leading-relaxed max-w-[240px] mx-auto">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-40 md:py-60 px-6 text-center bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-angan" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto p-12 sm:p-20 md:p-32 rounded-[3rem] sm:rounded-[4rem] md:rounded-[6rem] bg-home-sandstone soft-shadow terracotta-border relative z-10 overflow-hidden"
        >
          {/* Background Decorative Glow */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-home-saffron/10 rounded-full blur-[60px] sm:blur-[120px]" />
          
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8 sm:mb-12 inline-block"
            >
              <Sparkles className="text-home-terracotta w-12 h-12 sm:w-20 sm:h-20 mx-auto" />
            </motion.div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[8vw] xl:text-[11rem] font-serif leading-[0.85] tracking-tighter mb-10 sm:mb-16">
              Missing <br/><span className="text-home-terracotta italic font-normal">Home?</span>
            </h2>
            <p className="text-xl sm:text-2xl md:text-4xl text-home-clay/80 mb-12 sm:mb-24 font-light max-w-3xl mx-auto italic leading-relaxed">
              "The taste you remember, the quality you deserve. Let us bring a piece of our home to your table."
            </p>
            <Link
              to="/menu"
              className="inline-block px-10 sm:px-16 md:px-32 py-6 sm:py-8 md:py-12 bg-home-terracotta text-white rounded-full font-black text-lg sm:text-2xl md:text-4xl uppercase tracking-[0.2em] sm:tracking-[0.4em] soft-shadow hover:scale-110 hover:bg-home-maroon transition-all duration-500 group"
            >
              <span className="flex items-center gap-4 sm:gap-8">Order Now <MoveRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 group-hover:translate-x-6 transition-transform" /></span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
