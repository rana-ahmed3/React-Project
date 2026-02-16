'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '@/types/cart';
import { cartAPI } from '@/lib/api/cart';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error: any) {
      // If cart doesn't exist, it's okay
      if (error.response?.status !== 404) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated]);

  const addToCart = async (productId: string) => {
    try {
      setLoading(true);
      const response = await cartAPI.addToCart({ productId });
      setCart(response.data);
      toast.success('Product added to cart!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const response = await cartAPI.removeFromCart(itemId);
      setCart(response.data);
      toast.success('Product removed from cart');
    } catch (error: any) {
      toast.error('Failed to remove from cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, count: number) => {
    try {
      setLoading(true);
      const response = await cartAPI.updateCartItem(itemId, { count });
      setCart(response.data);
    } catch (error: any) {
      toast.error('Failed to update quantity');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCart(null);
      toast.success('Cart cleared');
    } catch (error: any) {
      toast.error('Failed to clear cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      setLoading(true);
      const response = await cartAPI.applyCoupon(code);
      setCart(response.data);
      toast.success('Coupon applied successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartCount: cart?.products?.length || 0,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
