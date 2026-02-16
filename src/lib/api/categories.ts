import { axiosInstance } from './axios';
import { Category, SubCategory } from '@/types/product';

interface CategoriesResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Category[];
}

interface SubCategoriesResponse {
  results: number;
  data: SubCategory[];
}

export const categoriesAPI = {
  // Get all categories
  getCategories: async (page = 1, limit = 40): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get('/categories', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single category
  getCategoryById: async (id: string): Promise<{ data: Category }> => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  // Get subcategories for a category
  getSubCategories: async (categoryId: string): Promise<SubCategoriesResponse> => {
    const response = await axiosInstance.get(`/categories/${categoryId}/subcategories`);
    return response.data;
  },

  // Get all subcategories
  getAllSubCategories: async (): Promise<SubCategoriesResponse> => {
    const response = await axiosInstance.get('/subcategories');
    return response.data;
  },
};
