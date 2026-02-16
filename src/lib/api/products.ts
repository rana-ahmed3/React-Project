import { axiosInstance } from './axios';
import { Product, ProductsResponse, ProductFilters } from '@/types/product';

export const productsAPI = {
  // Get all products with filters
  getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const params: any = {};
    
    if (filters?.category) params['category[in]'] = filters.category;
    if (filters?.brand) params['brand[in]'] = filters.brand;
    if (filters?.minPrice) params['price[gte]'] = filters.minPrice;
    if (filters?.maxPrice) params['price[lte]'] = filters.maxPrice;
    if (filters?.sort) params.sort = filters.sort;
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit;
    
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id: string): Promise<{ data: Product }> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (keyword: string): Promise<ProductsResponse> => {
    const response = await axiosInstance.get('/products', {
      params: { keyword },
    });
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string, page = 1): Promise<ProductsResponse> => {
    const response = await axiosInstance.get('/products', {
      params: { 'category[in]': categoryId, page },
    });
    return response.data;
  },

  // Get products by brand
  getProductsByBrand: async (brandId: string, page = 1): Promise<ProductsResponse> => {
    const response = await axiosInstance.get('/products', {
      params: { 'brand[in]': brandId, page },
    });
    return response.data;
  },
};
