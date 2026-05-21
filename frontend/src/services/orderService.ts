import type { Order } from './types';

const MOCK_DELAY = 800;

const MOCK_ORDERS: Order[] = [
  {
    id: 'DK-7241',
    date: '2026-05-15',
    total: 1250,
    status: 'Delivered',
    deliverySlot: 'Sat, May 16 • 10:00 AM - 12:00 PM',
    items: [
      { id: '1', name: 'Pure Ghee Mysore Pak', quantity: 2, price: 450, weight: '500g' },
      { id: '3', name: 'Mango Thokku', quantity: 1, price: 350, weight: '250g' }
    ]
  },
  {
    id: 'DK-8102',
    date: '2026-05-20',
    total: 850,
    status: 'Preparing',
    deliverySlot: 'Sat, May 23 • 04:00 PM - 06:00 PM',
    items: [
      { id: '2', name: 'Spicy Madras Mixture', quantity: 2, price: 300, weight: '250g' },
      { id: '4', name: 'Heritage Gift Box', quantity: 1, price: 250, weight: 'Small' }
    ]
  }
];

export const orderService = {
  getUserOrders: async (userId: string): Promise<Order[]> => {
    console.log('API Call: getUserOrders', { userId });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ORDERS);
      }, MOCK_DELAY);
    });
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    console.log('API Call: getOrderById', { orderId });
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = MOCK_ORDERS.find(o => o.id === orderId);
        resolve(order || null);
      }, MOCK_DELAY);
    });
  }
};
