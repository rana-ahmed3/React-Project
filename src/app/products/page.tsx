'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { productsAPI } from '@/lib/api/products';
import { categoriesAPI } from '@/lib/api/categories';
import { brandsAPI } from '@/lib/api/brands';
import { Product, Category, Brand } from '@/types/product';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '-createdAt',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        productsAPI.getProducts({
          page: currentPage,
          limit: 12,
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          sort: filters.sort,
        }),
        categoriesAPI.getCategories(),
        brandsAPI.getBrands(),
      ]);

      // Apply search filter if present
      let filteredProducts = productsRes.data;
      if (filters.search) {
        filteredProducts = filteredProducts.filter(p =>
          p.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      setProducts(filteredProducts);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
      setTotalPages(productsRes.metadata.numberOfPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: '-createdAt',
      search: '',
    });
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Products' }]} />

        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="filter-sidebar">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Filters</h5>
                <button className="btn btn-link btn-sm p-0" onClick={clearFilters}>
                  Clear All
                </button>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <label className="form-label fw-bold">Sort By</label>
                <select
                  className="form-select"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="-createdAt">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-ratingsAverage">Top Rated</option>
                  <option value="-sold">Best Selling</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold">Category</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold">Brand</label>
                <select
                  className="form-select"
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="form-label fw-bold">Price Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            <div className="mb-3">
              <h4>
                All Products
                <span className="text-muted ms-2">({products.length} items)</span>
              </h4>
            </div>

            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h4 className="mt-3">No products found</h4>
                <p className="text-muted">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {products.map((product) => (
                    <div key={product._id} className="col-lg-4 col-md-6">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? 'disabled' : ''
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
