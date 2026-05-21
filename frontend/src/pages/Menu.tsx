import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';

const Menu = () => {
  const [activeCategory, setCategory] = useState('All');

  // Business Rule 3.1: Weekday vs Weekend Logic
  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = today === 0 || today === 6;

  const categories = ['All', 'Traditional Sweets', 'Homemade Snacks', 'Grandmother\'s Pickles', 'Gift Boxes', 'Pure Masalas'];
  
  const products = [
    { id: 1, name: 'Pure Ghee Mysore Pak', price: 499, cat: 'Traditional Sweets', weekendOnly: false, img: 'https://indiasweethouse.in/cdn/shop/files/BadamMysorePak_eec04e7e-ba9b-41bd-90c1-e07dfeabef14.png?v=1724998308', desc: 'Made with pure cow ghee and love, just like at home.' },
    { id: 2, name: 'Spicy Madras Mixture', price: 299, cat: 'Homemade Snacks', weekendOnly: false, img: 'https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture8.jpg', desc: 'Crunchy, spicy, and perfect for your evening tea.' },
    { id: 3, name: 'Avakkai Mango Pickle', price: 199, cat: 'Grandmother\'s Pickles', weekendOnly: false, img: 'https://cinnamonsnail.com/wp-content/uploads/2023/07/Mango-pickle-05.jpg', desc: 'Sun-matured for weeks in traditional clay jars.' },
    { id: 4, name: 'Special Laddoo Box', price: 899, cat: 'Gift Boxes', weekendOnly: false, img: 'https://www.sreeannapoorna.com/cdn/shop/files/Premium_Laddu_Box.jpg?v=1723285894&width=1946', desc: 'A collection of our finest hand-rolled joys.' },
    { id: 5, name: 'Weekend Biryani Combo', price: 1200, cat: 'Gift Boxes', weekendOnly: true, img: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1500', desc: 'Available only on Sat & Sun. Authentic home-style slow cooked.' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const catMatch = activeCategory === 'All' || p.cat === activeCategory;
      const availabilityMatch = !p.weekendOnly || isWeekend;
      return catMatch && availabilityMatch;
    });
  }, [activeCategory, isWeekend]);

  return (
    <div className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 min-h-screen bg-angan relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 opacity-5 pointer-events-none text-home-terracotta">
         <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M100 0 L100 100 L0 100 Q50 100 100 0 Z" />
         </svg>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-8 border-b border-home-terracotta/10 pb-12 text-center md:text-left"
        >
          <div>
            <span className="text-home-terracotta font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[8px] sm:text-[10px] mb-2 sm:mb-4 block">Our Fresh Kitchen</span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-home-maroon leading-none">
              Daily <span className="text-home-terracotta italic">Treasures</span>
            </h1>
          </div>
          <div className="space-y-4 max-w-sm">
            <p className="text-lg sm:text-xl text-home-clay font-light italic leading-relaxed">
              "Everything is made to order in small batches to ensure it tastes exactly like home."
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${isWeekend ? 'bg-home-leaf/10 text-home-leaf' : 'bg-home-saffron/10 text-home-maroon'}`}>
               <Calendar className="w-3 h-3" /> {isWeekend ? 'Weekend Menu Active' : 'Weekday Menu Active'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-20">
        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl soft-shadow font-bold uppercase tracking-widest text-[8px] sm:text-[10px] transition-all whitespace-nowrap
                ${activeCategory === cat ? 'bg-home-terracotta text-white' : 'bg-white text-home-clay hover:bg-home-sandstone terracotta-border'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 sm:gap-16 md:gap-32`}
              >
                <div className="w-full md:w-1/2 relative group">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                    className="aspect-[4/5] rounded-[3rem] sm:rounded-[4rem] md:rounded-[8rem] overflow-hidden soft-shadow terracotta-border"
                  >
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-home-terracotta/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  {product.weekendOnly && (
                    <div className="absolute top-8 right-8 bg-home-maroon text-white p-6 rounded-full soft-shadow rotate-12 flex flex-col items-center justify-center">
                       <span className="font-black text-[10px] uppercase">Weekend</span>
                       <span className="font-serif italic text-xs">Special</span>
                    </div>
                  )}
                  <div className={`absolute -bottom-6 sm:-bottom-8 ${i % 2 === 0 ? '-right-4 sm:-right-8' : '-left-4 sm:-left-8'} w-24 h-24 sm:w-32 sm:h-32 bg-home-saffron rounded-full flex items-center justify-center p-3 sm:p-4 text-center soft-shadow rotate-12 group-hover:rotate-0 transition-transform z-10 border-4 border-white sm:border-8`}>
                      <span className="font-black text-[8px] sm:text-[10px] leading-tight uppercase tracking-tighter">AUTHENTIC FAMILY RECIPE</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6 sm:space-y-8 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 text-home-terracotta font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                      <Sparkles className="w-4 h-4" /> {product.cat}
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-home-maroon leading-tight">{product.name}</h3>
                  <p className="text-lg sm:text-2xl text-home-clay font-light leading-relaxed italic border-t-2 sm:border-t-0 sm:border-l-4 border-home-terracotta/20 pt-6 sm:pt-0 sm:pl-8">
                      "{product.desc}"
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 pt-4">
                      <div className="flex flex-col items-center md:items-start">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-home-clay/40 font-bold mb-1">Per 500g</span>
                        <span className="text-3xl sm:text-4xl font-serif text-home-maroon">₹{product.price}</span>
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-home-terracotta text-white rounded-full font-black text-base sm:text-lg uppercase tracking-widest soft-shadow hover:bg-home-maroon transition-colors flex items-center justify-center gap-4"
                      >
                        Add to Cart <ArrowRight className="w-5 h-5" />
                      </motion.button>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-home-leaf pt-2 sm:pt-4">
                      <Clock className="w-4 h-4" /> Fresh Batch Available
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-40">
               <AlertCircle className="w-16 h-16 text-home-terracotta mx-auto mb-6" />
               <h3 className="text-3xl font-serif text-home-maroon">No items found</h3>
               <p className="text-home-clay italic">Try a different category or check back on the weekend!</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Special Invitation */}
      <div className="max-w-4xl mx-auto mt-24 sm:mt-48 text-center bg-white p-10 sm:p-20 rounded-[3rem] sm:rounded-[5rem] soft-shadow terracotta-border relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-angan scale-150" />
         <h2 className="text-3xl sm:text-5xl font-serif text-home-maroon mb-6 sm:mb-8 relative z-10">Don't see your <span className="text-home-terracotta italic">favorite?</span></h2>
         <p className="text-lg sm:text-xl text-home-clay mb-8 sm:mb-12 italic relative z-10 leading-relaxed">"We take custom requests for large orders and festive boxes. Just ask."</p>
         <button className="w-full sm:w-auto px-12 sm:px-16 py-4 sm:py-6 border-2 border-home-terracotta text-home-terracotta rounded-full font-bold uppercase tracking-widest hover:bg-home-terracotta hover:text-white transition-all relative z-10">
            Contact Us
         </button>
      </div>
    </div>
  );
};

export default Menu;
