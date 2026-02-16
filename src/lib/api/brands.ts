import { axiosInstance } from './axios';
import { Brand } from '@/types/product';

interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Brand[];
}

export const brandsAPI = {
  // Get all brands
  getBrands: async (page = 1, limit = 40): Promise<BrandsResponse> => {
    const response = await axiosInstance.get('/brands', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single brand
  getBrandById: async (id: string): Promise<{ data: Brand }> => {
    const response = await axiosInstance.get(`/brands/${id}`);
    return response.data;
  },
};
