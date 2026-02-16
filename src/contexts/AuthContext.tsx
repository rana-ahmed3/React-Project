'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@/types/user';
import { authAPI } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load user from localStorage on mount
    const storedToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('userData');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await authAPI.login({ email, password });
      
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        
        // Store in localStorage
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response: AuthResponse = await authAPI.register(data);
      
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        toast.success('Registration successful!');
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    toast.info('Logged out successfully');
    router.push('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
