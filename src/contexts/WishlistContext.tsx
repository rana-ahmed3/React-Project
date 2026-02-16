'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { wishlistAPI } from '@/lib/api/wishlist';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const refreshWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    try {
      const response = await wishlistAPI.getWishlist();
      setWishlist(response.data || []);
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [isAuthenticated]);

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item._id === productId);
  };

  const addToWishlist = async (productId: string) => {
    try {
      setLoading(true);
      const response = await wishlistAPI.addToWishlist(productId);
      setWishlist(response.data || []);
      toast.success('Added to wishlist!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      setLoading(true);
      const response = await wishlistAPI.removeFromWishlist(productId);
      setWishlist(response.data || []);
      toast.success('Removed from wishlist');
    } catch (error: any) {
      toast.error('Failed to remove from wishlist');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    loading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    refreshWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
