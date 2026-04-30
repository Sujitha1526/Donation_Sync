import { User } from '@/types';
import { loginUser } from '@/api';

export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    const response = await loginUser({ email, password });
    if (response?.user) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    }
    return null;
  },

  async loginAsRole(): Promise<User> {
    throw new Error('loginAsRole not supported in production mode');
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  },
};
