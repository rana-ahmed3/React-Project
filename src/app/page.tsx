'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Loading from '@/components/ui/Loading';
import { productsAPI } from '@/lib/api/products';
import { categoriesAPI } from '@/lib/api/categories';
import { brandsAPI } from '@/lib/api/brands';
import { Product, Category, Brand } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        productsAPI.getProducts({ limit: 8, sort: '-ratingsAverage' }),
        categoriesAPI.getCategories(1, 6),
        brandsAPI.getBrands(1, 6),
      ]);

      setFeaturedProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to ShopMart
              </h1>
              <p className="lead mb-4">
                Discover amazing products at unbeatable prices. Shop from thousands 
                of products across multiple categories.
              </p>
              <div className="d-flex gap-3">
                <Link href="/products" className="btn btn-light btn-lg">
                  <i className="bi bi-bag me-2"></i>
                  Shop Now
                </Link>
                <Link href="/categories" className="btn btn-outline-light btn-lg">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <i className="bi bi-bag-check display-1"></i>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        {/* Categories Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Shop by Category</h2>
            <Link href="/categories" className="btn btn-outline-primary">
              View All <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          <div className="row g-4">
            {categories.map((category) => (
              <div key={category._id} className="col-lg-2 col-md-4 col-sm-6">
                <Link href={`/categories/${category._id}`} className="text-decoration-none">
                  <div className="category-card text-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={150}
                      height={150}
                      className="rounded-circle mb-3"
                      style={{ objectFit: 'cover' }}
                    />
                    <h6 className="text-dark">{category.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Products</h2>
            <Link href="/products" className="btn btn-outline-primary">
              View All <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Top Brands Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Top Brands</h2>
            <Link href="/brands" className="btn btn-outline-primary">
              View All <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          <div className="row g-4">
            {brands.map((brand) => (
              <div key={brand._id} className="col-lg-2 col-md-4 col-sm-6">
                <Link href={`/brands/${brand._id}`} className="text-decoration-none">
                  <div className="brand-card">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={150}
                      height={150}
                      style={{ objectFit: 'contain' }}
                    />
                    <h6 className="text-dark mt-3">{brand.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-5">
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center p-4">
                <i className="bi bi-truck display-4 text-primary mb-3"></i>
                <h5>Free Shipping</h5>
                <p className="text-muted">On orders over $100</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center p-4">
                <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                <h5>Secure Payment</h5>
                <p className="text-muted">100% secure transactions</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center p-4">
                <i className="bi bi-arrow-clockwise display-4 text-primary mb-3"></i>
                <h5>Easy Returns</h5>
                <p className="text-muted">30-day return policy</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center p-4">
                <i className="bi bi-headset display-4 text-primary mb-3"></i>
                <h5>24/7 Support</h5>
                <p className="text-muted">Dedicated support team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-light rounded p-5 text-center">
          <h3 className="mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-muted mb-4">
            Get the latest updates on new products and upcoming sales
          </p>
          <form className="row g-3 justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
}
