export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Preparing' | 'Dispatched' | 'Delivered';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  weight: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  deliverySlot: string;
}
