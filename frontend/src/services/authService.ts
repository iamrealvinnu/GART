import type { AuthUser } from './types';

const MOCK_DELAY = 1000;

export const authService = {
  login: async (email: string, password: string): Promise<AuthUser | null> => {
    console.log('API Call: login', { email });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@dishana.com' && password === 'password') {
          resolve({
            id: 'admin-1',
            email: 'admin@dishana.com',
            name: 'Admin Dishana',
            role: 'admin',
          });
        } else if (email === 'customer@example.com' && password === 'password') {
          resolve({
            id: 'cust-1',
            email: 'customer@example.com',
            name: 'John Doe',
            role: 'customer',
          });
        } else {
          resolve(null);
        }
      }, MOCK_DELAY);
    });
  },

  register: async (name: string, email: string, _password: string): Promise<AuthUser> => {
    console.log('API Call: register', { name, email });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          email,
          name,
          role: 'customer',
        });
      }, MOCK_DELAY);
    });
  },

  logout: () => {
    console.log('API Call: logout');
  }
};
