import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

interface User {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  rol: 'ADMIN' | 'USER';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    ad: string;
    soyad: string;
    email: string;
    telefon: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<User | null>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getMe();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const register = async (data: {
    ad: string;
    soyad: string;
    email: string;
    telefon: string;
    password: string;
  }) => {
    const { token, user } = await authService.register(data);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getMe = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
      return userData;
    } catch (error) {
      return null;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 