'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { productsAPI } from '@/lib/api/products';
import { brandsAPI } from '@/lib/api/brands';
import { Product, Brand } from '@/types/product';

export default function BrandDetailPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchData(params.id as string);
    }
  }, [params.id, currentPage]);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const [brandRes, productsRes] = await Promise.all([
        brandsAPI.getBrandById(id),
        productsAPI.getProductsByBrand(id, currentPage),
      ]);

      setBrand(brandRes.data);
      setProducts(productsRes.data);
      setTotalPages(productsRes.metadata.numberOfPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb
          items={[
            { label: 'Brands', href: '/brands' },
            { label: brand?.name || '' },
          ]}
        />

        <h2 className="mb-4">{brand?.name}</h2>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <h4 className="mt-3">No products found for this brand</h4>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {products.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                  >
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
                      className={`page-item ${
                        currentPage === i + 1 ? 'active' : ''
                      }`}
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
      <Footer />
    </>
  );
}
