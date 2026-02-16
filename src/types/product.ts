export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: Category;
  subcategories?: SubCategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Product[];
}
