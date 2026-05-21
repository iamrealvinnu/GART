import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShieldCheck, Plus, Minus, Trash2, Truck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totals } = useCart();

  const FREE_DELIVERY_THRESHOLD = 1000;

  return (
    <div className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 min-h-screen bg-angan relative overflow-x-hidden">
      {/* Soft Background Sun Ray */}
      <div className="absolute top-0 left-0 w-full h-[300px] sm:h-[500px] bg-gradient-to-b from-home-saffron/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 relative z-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-home-terracotta/10 pb-8 text-center sm:text-left">
            <div>
               <span className="text-home-terracotta font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[8px] sm:text-[10px] mb-2 block">Shopping Bag</span>
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-home-maroon">Your <span className="text-home-terracotta italic">Reserve</span></h1>
            </div>
            <span className="inline-block self-center sm:self-auto text-home-clay font-bold tracking-widest text-[10px] sm:text-xs uppercase bg-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full soft-shadow border border-home-terracotta/10 whitespace-nowrap">
               {cartItems.length} Home Items
            </span>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 sm:p-8 bg-white rounded-[2.5rem] sm:rounded-[3rem] soft-shadow terracotta-border hover:shadow-xl transition-all"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden soft-shadow relative shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left space-y-2 sm:space-y-3">
                      <span className="text-[8px] sm:text-[10px] text-home-terracotta font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">{item.category || 'Handmade Treasure'}</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-home-maroon leading-tight">{item.name}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[10px] sm:text-xs text-home-clay font-bold uppercase tracking-widest pt-1 sm:pt-2">
                        <span className="bg-home-sandstone px-3 sm:px-4 py-1 rounded-lg sm:rounded-xl border border-home-terracotta/5">{item.weight}</span>
                        <span className="w-1.5 h-1.5 bg-home-terracotta/20 rounded-full" />
                        <span className="text-home-terracotta">₹{item.price} / unit</span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-6 sm:gap-6 shrink-0 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 pt-6 sm:pt-0">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-home-sandstone rounded-xl sm:rounded-2xl p-1 sm:p-2 border border-home-terracotta/10">
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white hover:text-home-terracotta transition-colors text-home-clay"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                        <span className="w-10 sm:w-12 text-center font-serif text-xl sm:text-2xl text-home-maroon">{item.qty}</span>
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white hover:text-home-terracotta transition-colors text-home-clay"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-8">
                        <p className="text-2xl sm:text-3xl font-serif text-home-maroon">₹{item.price * item.qty}</p>
                        <motion.button 
                          whileHover={{ scale: 1.1, color: '#991b1b' }}
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 sm:p-3 text-home-clay/40 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-all"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 sm:py-32 space-y-6 sm:space-y-8"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-home-sandstone rounded-full flex items-center justify-center mx-auto opacity-50">
                    <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-home-terracotta" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-home-clay">Your bag is empty.</h3>
                  <Link to="/menu" className="inline-block px-10 sm:px-12 py-4 sm:py-5 bg-home-terracotta text-white rounded-full font-black text-sm sm:text-base uppercase tracking-widest hover:bg-home-maroon transition-all">
                    Fill it with Joy
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Emotional Hook */}
          {cartItems.length > 0 && (
            <motion.div 
              layout
              className="p-8 sm:p-12 rounded-[3rem] sm:rounded-[4rem] bg-home-maroon text-white flex flex-col md:flex-row items-center gap-6 sm:gap-10 soft-shadow overflow-hidden relative"
            >
               <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10 rotate-12">
                  <Heart className="w-32 h-32 sm:w-40 sm:h-40" />
               </div>
               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center shrink-0 z-10">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-home-saffron fill-home-saffron" />
               </div>
               <div className="text-center md:text-left z-10">
                  <h4 className="text-xl sm:text-2xl font-serif mb-2 text-home-saffron">Freshness Guarantee</h4>
                  <p className="text-white/60 font-light italic text-xs sm:text-sm leading-relaxed max-w-xl">
                    "Every item in your bag will be prepared only after you confirm your order. We never stock food; we only craft it for you."
                  </p>
               </div>
            </motion.div>
          )}
        </div>

        {/* Checkout Summary */}
        <div className="space-y-8">
          <motion.div 
            layout
            className="bg-white p-8 sm:p-12 rounded-[3rem] sm:rounded-[4rem] soft-shadow terracotta-border border-t-8 border-t-home-saffron sticky top-32 sm:top-40"
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-home-maroon mb-8 sm:mb-12 text-center underline decoration-home-saffron/30 underline-offset-8">Order Metric</h2>
            
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <div className="flex justify-between items-center text-home-clay">
                <span className="uppercase tracking-widest text-[8px] sm:text-[10px] font-black">Bag Subtotal</span>
                <span className="font-serif text-lg sm:text-xl">₹{totals.subtotal}</span>
              </div>
              
              <div className="flex justify-between items-center text-home-clay">
                <div className="flex flex-col">
                  <span className="uppercase tracking-widest text-[8px] sm:text-[10px] font-black">GST (Taxes)</span>
                  <span className="text-[8px] sm:text-[9px] text-home-terracotta italic">Standard 5% on Food</span>
                </div>
                <span className="font-serif text-lg sm:text-xl">₹{totals.gst}</span>
              </div>

              <div className="flex justify-between items-center text-home-clay">
                <div className="flex flex-col">
                  <span className="uppercase tracking-widest text-[8px] sm:text-[10px] font-black">Delivery Fee</span>
                  {totals.isFreeDelivery && <span className="text-[8px] sm:text-[9px] text-home-leaf font-bold">THRESHOLD REACHED</span>}
                </div>
                <span className={`font-serif text-lg sm:text-xl ${totals.isFreeDelivery ? 'line-through opacity-40' : 'text-home-terracotta'}`}>
                  {totals.deliveryFee > 0 ? `₹${totals.deliveryFee}` : 'FREE'}
                </span>
              </div>

              {!totals.isFreeDelivery && totals.subtotal > 0 && (
                <div className="bg-home-sandstone/50 p-4 rounded-xl sm:rounded-2xl border border-home-saffron/20 text-center">
                   <p className="text-[8px] sm:text-[9px] font-bold text-home-maroon uppercase tracking-tighter">
                      Add <span className="text-home-terracotta">₹{FREE_DELIVERY_THRESHOLD - totals.subtotal}</span> more for <span className="text-home-leaf">Free Delivery</span>
                   </p>
                </div>
              )}

              <div className="h-[1px] bg-home-terracotta/10" />
              
              <div className="flex justify-between items-center text-home-maroon">
                <div className="flex flex-col">
                  <span className="uppercase tracking-[0.1em] sm:tracking-[0.2em] font-black text-[10px] sm:text-xs">Total Amount</span>
                  <span className="text-[7px] sm:text-[8px] text-home-clay italic uppercase">Including all taxes</span>
                </div>
                <span className="text-3xl sm:text-4xl font-serif text-home-terracotta">₹{totals.grandTotal}</span>
              </div>
            </div>

            {/* Next Steps Interface */}
            <div className="space-y-4">
              <div className="bg-home-sandstone p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-home-terracotta/5 flex items-center gap-4 sm:gap-6">
                 <Truck className="text-home-terracotta w-5 h-5 sm:w-6 sm:h-6" />
                 <div className="flex flex-col text-left">
                    <span className="text-[8px] sm:text-[9px] font-black uppercase text-home-clay/40 tracking-widest">Next Step</span>
                    <span className="text-[10px] sm:text-xs font-serif text-home-maroon">Delivery Slot Selection</span>
                 </div>
              </div>

              <Link 
                to={cartItems.length > 0 ? "/slots" : "#"} 
                className={`block w-full py-5 sm:py-7 font-black text-base sm:text-xl uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-full text-center soft-shadow transition-all transform ${
                  cartItems.length > 0 
                  ? 'bg-home-terracotta text-white hover:bg-home-maroon hover:scale-[1.02]' 
                  : 'bg-home-clay/10 text-home-clay/40 cursor-not-allowed'
                }`}
              >
                Proceed to Slots
              </Link>
            </div>
          </motion.div>

          <div className="text-center space-y-4 pt-4 sm:pt-8">
             <div className="flex items-center justify-center gap-3 sm:gap-4">
                <ShieldCheck className="text-home-leaf w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-home-clay font-black">100% Home Secure Payment</span>
             </div>
             <div className="w-10 sm:w-12 h-1 bg-home-terracotta/20 mx-auto" />
             <p className="text-[8px] sm:text-[10px] italic text-home-clay/40">From Dishana's Kitchen to your Family Table</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
