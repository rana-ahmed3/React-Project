import { axiosInstance } from './axios';
import { CartResponse, AddToCartData, UpdateCartItemData } from '@/types/cart';

export const cartAPI = {
  // Get user cart
  getCart: async (): Promise<CartResponse> => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  },

  // Add product to cart
  addToCart: async (data: AddToCartData): Promise<CartResponse> => {
    const response = await axiosInstance.post('/cart', data);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, data: UpdateCartItemData): Promise<CartResponse> => {
    const response = await axiosInstance.put(`/cart/${itemId}`, data);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<CartResponse> => {
    const response = await axiosInstance.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.delete('/cart');
    return response.data;
  },

  // Apply coupon
  applyCoupon: async (couponCode: string): Promise<CartResponse> => {
    const response = await axiosInstance.put('/cart/applyCoupon', { coupon: couponCode });
    return response.data;
  },
};
