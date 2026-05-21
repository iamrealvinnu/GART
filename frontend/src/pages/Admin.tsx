import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Users, 
  BarChart3, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Clock,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user, logout } = useAuth();
  const [activeTab, setTab] = useState<'dashboard' | 'products' | 'slots' | 'reports'>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = [
    { label: 'Total Orders', value: '124', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Today\'s Slots', value: '18/20', icon: Calendar, color: 'text-green-600' },
    { label: 'Active Customers', value: '450', icon: Users, color: 'text-purple-600' },
    { label: 'Revenue', value: '₹12,450', icon: BarChart3, color: 'text-home-terracotta' },
  ];

  const mockProducts = [
    { id: 1, name: 'Pure Ghee Mysore Pak', price: 499, cat: 'Sweets', stock: '20kg' },
    { id: 2, name: 'Spicy Madras Mixture', price: 299, cat: 'Snacks', stock: '15kg' },
    { id: 3, name: 'Avakkai Mango Pickle', price: 199, cat: 'Pickles', stock: '50 units' },
  ];

  const mockSlots = [
    { id: 1, time: '10 AM - 12 PM', capacity: 10, booked: 4, type: 'Pickup' },
    { id: 2, time: '2 PM - 4 PM', capacity: 15, booked: 12, type: 'Delivery' },
  ];

  return (
    <div className="min-h-screen bg-home-sandstone flex flex-col lg:flex-row lg:overflow-hidden">
      
      {/* Admin Sidebar - Full Height on Desktop, Natural flow on Mobile */}
      <aside className="w-full lg:w-80 bg-home-maroon text-white p-8 lg:h-screen lg:overflow-y-auto flex flex-col shrink-0 z-30 pt-12 lg:pt-16 shadow-2xl relative">
        <div className="mb-12">
           <Link to="/" className="inline-flex items-center gap-2 text-home-saffron hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Kitchen</span>
           </Link>
           <h2 className="font-serif text-3xl text-home-saffron italic">Admin Panel</h2>
           <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">Dishana's Kitchen Control</p>
        </div>

        <nav className="flex-grow space-y-2">
           {[
             { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
             { id: 'products', label: 'Menu Mgmt', icon: ShoppingBag },
             { id: 'slots', label: 'Slot Mgmt', icon: Calendar },
             { id: 'reports', label: 'Analytics', icon: BarChart3 },
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setTab(item.id as any)}
               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all
                 ${activeTab === item.id ? 'bg-home-terracotta text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}
               `}
             >
               <item.icon className="w-4 h-4" /> {item.label}
             </button>
           ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-home-saffron flex items-center justify-center text-home-maroon font-bold text-lg">A</div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest">{user?.name}</p>
                 <p className="text-[9px] text-white/40 italic">System Administrator</p>
              </div>
           </div>
           <button 
             onClick={logout}
             className="w-full py-4 rounded-xl bg-white/5 text-white/60 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
           >
             <LogOut className="w-4 h-4" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area - Scrolled independently on desktop */}
      <main className="flex-grow p-4 sm:p-10 lg:p-16 lg:overflow-y-auto lg:h-screen pt-12 lg:pt-16">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-home-terracotta/10 pb-8">
                 <div>
                    <h1 className="text-4xl sm:text-6xl font-serif text-home-maroon tracking-tighter">Kitchen <span className="text-home-terracotta italic">Overview</span></h1>
                    <p className="text-[10px] font-bold text-home-clay/40 uppercase tracking-widest mt-2">Real-time status of your homemade joy</p>
                 </div>
                 <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-2xl soft-shadow border border-home-terracotta/5 w-fit">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-home-clay">Live Sync Active</span>
                 </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-8 rounded-[3rem] soft-shadow terracotta-border group hover:bg-home-sandstone transition-colors cursor-default">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-6`} />
                    <h3 className="text-home-clay/40 font-bold uppercase tracking-widest text-[9px] mb-2">{stat.label}</h3>
                    <p className="text-4xl font-serif text-home-maroon tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white p-8 sm:p-12 rounded-[4rem] soft-shadow terracotta-border">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-3xl font-serif text-home-maroon">Recent Orders</h2>
                   <button className="text-[9px] font-black uppercase tracking-widest text-home-terracotta hover:underline">View All Orders</button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-home-sandstone/30 border border-home-terracotta/5 hover:border-home-terracotta/20 transition-all cursor-pointer gap-4 sm:gap-0">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-home-terracotta shadow-sm">#{1000 + order}</div>
                        <div>
                          <h4 className="font-serif text-xl text-home-maroon">Customer {order}</h4>
                          <p className="text-[10px] font-bold text-home-clay/40 uppercase tracking-widest">3 Items • ₹850 • {order === 3 ? 'Pickup' : 'Delivery'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
                         <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest 
                           ${order === 1 ? 'bg-home-leaf/10 text-home-leaf' : 'bg-home-saffron/20 text-home-maroon'}
                         `}>
                           {order === 1 ? 'Ready' : 'Preparing'}
                         </span>
                         <ChevronRight className="w-5 h-5 text-home-clay/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-home-terracotta/10 pb-8">
                 <div>
                    <h1 className="text-4xl sm:text-6xl font-serif text-home-maroon tracking-tighter">Manage <span className="text-home-terracotta italic">Menu</span></h1>
                    <p className="text-[10px] font-bold text-home-clay/40 uppercase tracking-widest mt-2">Add, Edit or Remove items from the kitchen</p>
                 </div>
                 <button 
                   onClick={() => setIsAddModalOpen(true)}
                   className="flex items-center justify-center gap-3 px-8 py-5 bg-home-terracotta text-white rounded-full font-black text-xs uppercase tracking-widest soft-shadow hover:bg-home-maroon transition-all w-full sm:w-auto"
                 >
                    <Plus className="w-4 h-4" /> Add Product
                 </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {mockProducts.map((p) => (
                   <div key={p.id} className="bg-white p-8 rounded-[3rem] soft-shadow terracotta-border flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-8">
                         <div className="w-20 h-20 bg-home-sandstone rounded-3xl flex items-center justify-center shrink-0">
                            <ShoppingBag className="w-8 h-8 text-home-terracotta/40" />
                         </div>
                         <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-home-terracotta/60">{p.cat}</span>
                            <h3 className="text-2xl font-serif text-home-maroon">{p.name}</h3>
                            <p className="text-[10px] font-bold text-home-clay/40 uppercase mt-1 tracking-widest">₹{p.price} • In Stock: {p.stock}</p>
                         </div>
                      </div>
                      <div className="flex gap-4 w-full sm:w-auto">
                         <button className="flex-grow sm:flex-grow-0 p-4 rounded-2xl bg-home-sandstone text-home-maroon hover:bg-home-terracotta hover:text-white transition-all flex items-center justify-center"><Edit3 className="w-5 h-5" /></button>
                         <button className="flex-grow sm:flex-grow-0 p-4 rounded-2xl bg-home-sandstone text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 className="w-5 h-5" /></button>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'slots' && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-home-terracotta/10 pb-8">
                 <h1 className="text-4xl sm:text-6xl font-serif text-home-maroon tracking-tighter">Time <span className="text-home-terracotta italic">Slots</span></h1>
                 <p className="text-[10px] font-bold text-home-clay/40 uppercase tracking-widest mt-2">Manage delivery and pickup capacity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {mockSlots.map((slot) => (
                   <div key={slot.id} className="bg-white p-10 rounded-[3.5rem] soft-shadow terracotta-border space-y-8">
                      <div className="flex justify-between items-center">
                         <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${slot.type === 'Pickup' ? 'bg-home-leaf/10 text-home-leaf' : 'bg-home-terracotta/10 text-home-terracotta'}`}>{slot.type}</div>
                         <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-home-clay/40"><Clock className="w-3 h-3" /> {slot.time}</div>
                      </div>
                      <div className="flex items-center justify-between border-t border-b border-home-terracotta/5 py-8">
                         <div>
                            <span className="text-[10px] font-black uppercase text-home-clay/30 block mb-1">Capacity</span>
                            <span className="text-4xl font-serif text-home-maroon">{slot.capacity}</span>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase text-home-clay/30 block mb-1">Booked</span>
                            <span className={`text-4xl font-serif ${slot.booked >= slot.capacity ? 'text-red-500' : 'text-home-maroon'}`}>{slot.booked}</span>
                         </div>
                      </div>
                      <div className="w-full h-2 bg-home-sandstone rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                           className={`h-full ${slot.booked >= slot.capacity ? 'bg-red-500' : 'bg-home-saffron'}`}
                         />
                      </div>
                      <button className="w-full py-4 rounded-2xl bg-home-sandstone text-home-maroon font-bold uppercase tracking-widest text-[9px] hover:bg-home-terracotta hover:text-white transition-all">Edit Capacity</button>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
             <motion.div
               key="reports"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white p-12 sm:p-20 rounded-[5rem] soft-shadow terracotta-border text-center"
             >
                <BarChart3 className="w-20 h-20 text-home-saffron mx-auto mb-8" />
                <h2 className="text-4xl font-serif text-home-maroon mb-6">Business Insights</h2>
                <p className="text-home-clay italic mb-12 max-w-lg mx-auto">"Detailed sales reports and product popularity analytics will be available here."</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                   <div className="p-8 bg-home-sandstone/50 rounded-3xl border border-home-terracotta/5">
                      <span className="text-3xl font-serif text-home-maroon block mb-1">94%</span>
                      <span className="text-[9px] font-black uppercase text-home-clay/40">Efficiency</span>
                   </div>
                   <div className="p-8 bg-home-sandstone/50 rounded-3xl border border-home-terracotta/5">
                      <span className="text-3xl font-serif text-home-maroon block mb-1">+12%</span>
                      <span className="text-[9px] font-black uppercase text-home-clay/40">Growth</span>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Product Modal (Mock) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsAddModalOpen(false)}
               className="absolute inset-0 bg-home-maroon/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl bg-white rounded-[3.5rem] p-10 sm:p-16 soft-shadow overflow-hidden"
             >
                <button onClick={() => setIsAddModalOpen(false)} className="absolute top-8 right-8 text-home-clay/20 hover:text-home-maroon transition-colors"><X className="w-8 h-8" /></button>
                <h2 className="text-4xl font-serif text-home-maroon mb-10 tracking-tight">New <span className="text-home-terracotta italic">Kitchen Joy</span></h2>
                
                <div className="space-y-8">
                   <div className="group">
                      <span className="text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-2">Product Name</span>
                      <input type="text" placeholder="e.g. Special Ghee Laddu" className="w-full border-b border-home-terracotta/10 py-3 font-serif text-xl focus:outline-none focus:border-home-terracotta transition-all bg-transparent" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="group">
                        <span className="text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-2">Category</span>
                        <select className="w-full border-b border-home-terracotta/10 py-3 font-serif text-lg focus:outline-none bg-transparent">
                           <option>Sweets</option>
                           <option>Snacks</option>
                           <option>Pickles</option>
                        </select>
                      </div>
                      <div className="group">
                        <span className="text-[9px] font-black text-home-terracotta/60 uppercase tracking-widest block mb-2">Price (₹)</span>
                        <input type="number" placeholder="499" className="w-full border-b border-home-terracotta/10 py-3 font-serif text-xl focus:outline-none focus:border-home-terracotta transition-all bg-transparent" />
                      </div>
                   </div>
                   <div className="flex items-center gap-4 py-4 px-6 bg-home-sandstone/50 rounded-2xl border border-home-terracotta/5">
                      <input type="checkbox" className="w-5 h-5 accent-home-terracotta" id="weekend" />
                      <label htmlFor="weekend" className="text-xs font-bold text-home-maroon uppercase tracking-widest">Weekend Only Item</label>
                   </div>
                   <button className="w-full py-6 bg-home-terracotta text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-home-maroon transition-all transform hover:scale-[1.02]">Create Product Entry</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
