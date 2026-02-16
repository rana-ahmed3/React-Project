'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { categoriesAPI } from '@/lib/api/categories';
import { Category } from '@/types/product';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoriesAPI.getCategories(1, 50);
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Categories' }]} />

        <h2 className="mb-4">All Categories</h2>

        {loading ? (
          <Loading />
        ) : (
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category._id} className="col-lg-3 col-md-4 col-sm-6">
                <Link
                  href={`/categories/${category._id}`}
                  className="text-decoration-none"
                >
                  <div className="card category-card h-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '250px' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark">{category.name}</h5>
                      <small className="text-muted">{category.slug}</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
