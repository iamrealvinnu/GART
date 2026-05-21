import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import type { Order } from '../services/types';
import { ShoppingBag, Package, MapPin, Calendar, Clock, ChevronRight, LogOut, User as UserIcon, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Preparing': return 'text-home-terracotta bg-home-terracotta/10';
      case 'Dispatched': return 'text-blue-600 bg-blue-50';
      default: return 'text-home-clay bg-home-clay/10';
    }
  };

  return (
    <div className="min-h-screen bg-home-sandstone pt-24 sm:pt-32 pb-20 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 soft-shadow terracotta-border mb-12 sm:mb-16 relative overflow-hidden"
        >
          {/* Decorative Glows */}
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-home-saffron/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-[2rem] sm:rounded-[3rem] bg-home-sandstone flex items-center justify-center border-4 border-home-terracotta/20">
                <UserIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-home-terracotta/40" />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-home-saffron rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-4 border-white">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-home-maroon" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <span className="text-[8px] sm:text-[10px] font-black text-home-terracotta uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4 block">Dishana Family Member</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-home-maroon mb-2 sm:mb-4 tracking-tighter">{user?.name}</h1>
              <p className="text-home-clay/60 font-medium italic mb-6 sm:mb-8 text-sm sm:text-base">{user?.email}</p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <button 
                  onClick={handleLogout}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-home-maroon text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest flex items-center gap-2 sm:gap-3 hover:bg-home-terracotta transition-all shadow-lg"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white border border-home-terracotta/20 text-home-terracotta rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest flex items-center gap-2 sm:gap-3 hover:bg-home-sandstone transition-all">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
               <div className="bg-home-sandstone/50 p-8 rounded-3xl border border-home-terracotta/5 text-center">
                  <span className="text-4xl font-serif text-home-maroon block mb-2">{orders.length}</span>
                  <span className="text-[9px] font-black text-home-clay/40 uppercase tracking-widest">Total Orders</span>
               </div>
               <div className="bg-home-sandstone/50 p-8 rounded-3xl border border-home-terracotta/5 text-center">
                  <span className="text-4xl font-serif text-home-maroon block mb-2">320</span>
                  <span className="text-[9px] font-black text-home-clay/40 uppercase tracking-widest">Joy Points</span>
               </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12">
          
          {/* Order History Section */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-3xl sm:text-4xl font-serif text-home-maroon tracking-tight">Order <span className="text-home-terracotta italic">History</span></h2>
              <span className="text-[8px] sm:text-[10px] font-black text-home-clay/40 uppercase tracking-[0.2em]">{orders.length} Orders Found</span>
            </div>

            <AnimatePresence>
              {isLoading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-home-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                  <p className="text-home-clay font-serif italic">Loading your history...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 soft-shadow terracotta-border group hover:border-home-terracotta/40 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8">
                        <div className="flex gap-4 sm:gap-8">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-home-sandstone rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-home-terracotta/40" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                              <h3 className="font-serif text-xl sm:text-2xl text-home-maroon">Order #{order.id}</h3>
                              <span className={`px-3 sm:px-4 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[8px] sm:text-[10px] font-bold text-home-clay/40 uppercase tracking-widest mb-3 sm:mb-4">Placed on {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            
                            <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                              <div className="flex items-center gap-2 sm:gap-3 text-home-clay/60 text-[10px] sm:text-xs italic font-medium">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-home-terracotta/40" /> {order.deliverySlot}
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 text-home-clay/60 text-[10px] sm:text-xs italic font-medium">
                                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-home-terracotta/40" /> {order.items.length} Items
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-home-terracotta/10 pt-6 md:pt-0 md:pl-10">
                          <div className="text-left md:text-right">
                             <span className="text-[8px] sm:text-[9px] font-black text-home-clay/30 uppercase tracking-widest block mb-1">Total Amount</span>
                             <span className="text-2xl sm:text-3xl font-serif text-home-maroon tracking-tighter">₹{order.total}</span>
                          </div>
                          <button className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-home-sandstone text-home-terracotta hover:bg-home-terracotta hover:text-white transition-all">
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-20 text-center soft-shadow terracotta-border">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-home-sandstone rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                    <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-home-clay/20" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-home-maroon mb-4">No orders yet</h3>
                  <p className="text-sm sm:text-base text-home-clay/60 italic mb-8 sm:mb-10">Your kitchen table is waiting for a taste of home!</p>
                  <button 
                    onClick={() => navigate('/menu')}
                    className="px-10 sm:px-12 py-4 sm:py-6 bg-home-terracotta text-white rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-home-maroon transition-all shadow-lg w-full sm:w-auto"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Access Sidebar */}
          <div className="space-y-8 sm:space-y-12">
            <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] soft-shadow terracotta-border">
              <h3 className="text-xl sm:text-2xl font-serif text-home-maroon mb-8 sm:mb-10">Saved Details</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4 sm:gap-6 group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-home-sandstone flex items-center justify-center group-hover:bg-home-saffron transition-all flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-home-terracotta" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-home-maroon mb-1">Default Address</h4>
                    <p className="text-[9px] sm:text-[10px] font-medium text-home-clay/60 italic leading-relaxed">123, Heritage Villa, <br/>Chennai - 600001</p>
                  </div>
                </div>
                
                <div className="flex gap-4 sm:gap-6 group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-home-sandstone flex items-center justify-center group-hover:bg-home-saffron transition-all flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-home-terracotta" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-home-maroon mb-1">Preferred Slot</h4>
                    <p className="text-[9px] sm:text-[10px] font-medium text-home-clay/60 italic leading-relaxed">Weekends <br/>10 AM - 12 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-home-maroon p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] soft-shadow relative overflow-hidden group cursor-pointer">
               <div className="absolute -top-1/4 -right-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
               <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-home-saffron mb-6 sm:mb-8 animate-pulse" />
               <h3 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4">Refer a Friend</h3>
               <p className="text-white/40 text-[9px] sm:text-[10px] font-medium uppercase tracking-widest leading-relaxed mb-6 sm:mb-8">Share the joy of homemade food and earn points!</p>
               <span className="inline-flex items-center gap-3 sm:gap-4 text-home-saffron text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Get Invite Link <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" /></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
