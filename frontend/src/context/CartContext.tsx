import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  weight: string;
  img: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  totals: {
    subtotal: number;
    gst: number;
    deliveryFee: number;
    grandTotal: number;
    isFreeDelivery: boolean;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart from localStorage safely
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gart_cart');
      return saved ? JSON.parse(saved) : [
        // Default items for demo, matches user's request
        { id: 1, name: 'Pure Ghee Mysore Pak', price: 499, qty: 1, weight: '500g', img: 'https://indiasweethouse.in/cdn/shop/files/BadamMysorePak_eec04e7e-ba9b-41bd-90c1-e07dfeabef14.png?v=1724998308', category: 'Sweets' },
        { id: 2, name: 'Spicy Madras Mixture', price: 299, qty: 2, weight: '250g', img: 'https://www.sharmispassions.com/wp-content/uploads/2012/11/south-indian-mixture8.jpg', category: 'Snacks' }
      ];
    } catch (e) {
      return [];
    }
  });

  // Persist cart changes
  useEffect(() => {
    localStorage.setItem('gart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  // Advanced calculations
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    // Real-world GST logic (e.g., 5% on food items)
    const GST_RATE = 0.05;
    const gst = Math.round(subtotal * GST_RATE);
    
    // Delivery Fee logic
    // Free delivery above ₹1000, otherwise ₹60 base fee
    const FREE_DELIVERY_THRESHOLD = 1000;
    const BASE_DELIVERY_FEE = subtotal > 0 ? 60 : 0;
    const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee = isFreeDelivery ? 0 : BASE_DELIVERY_FEE;
    
    const grandTotal = subtotal + gst + deliveryFee;

    return {
      subtotal,
      gst,
      deliveryFee,
      grandTotal,
      isFreeDelivery
    };
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totals }}>
      {children}
    </CartContext.Provider>
  );
};
