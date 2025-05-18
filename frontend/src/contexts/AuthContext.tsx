import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface User {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  rol: 'admin' | 'yonetici' | 'musteri';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

interface RegisterData {
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  password: string;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function with role-based redirection
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, accept specific credentials
      let user: User;
      
      if (email === 'admin@example.com' && password === 'admin123') {
        user = {
          id: 1,
          ad: 'Admin',
          soyad: 'User',
          email,
          telefon: '5551234567',
          rol: 'admin'
        };
      } else if (email === 'yonetici@example.com' && password === 'yonetici123') {
        user = {
          id: 2,
          ad: 'Yönetici',
          soyad: 'User',
          email,
          telefon: '5551234568',
          rol: 'yonetici'
        };
      } else {
        user = {
          id: 3,
          ad: 'Demo',
          soyad: 'Kullanıcı',
          email,
          telefon: '5551234569',
          rol: 'musteri'
        };
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      // Role-based redirection
      if (user.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      throw new Error('Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new user with default role
      const newUser: User = {
        id: Math.floor(Math.random() * 1000),
        ad: userData.ad,
        soyad: userData.soyad,
        email: userData.email,
        telefon: userData.telefon,
        rol: 'musteri'
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/giris');
    } catch (error) {
      throw new Error('Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.rol === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 