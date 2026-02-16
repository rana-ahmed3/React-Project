import { axiosInstance } from './axios';
import { WishlistResponse } from '@/types/wishlist';

export const wishlistAPI = {
  // Get user wishlist
  getWishlist: async (): Promise<WishlistResponse> => {
    const response = await axiosInstance.get('/wishlist');
    return response.data;
  },

  // Add product to wishlist
  addToWishlist: async (productId: string): Promise<WishlistResponse> => {
    const response = await axiosInstance.post('/wishlist', { productId });
    return response.data;
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: string): Promise<WishlistResponse> => {
    const response = await axiosInstance.delete(`/wishlist/${productId}`);
    return response.data;
  },
};
