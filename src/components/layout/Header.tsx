'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-dark text-white py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <small>
                <i className="bi bi-telephone me-2"></i>
                Call Us: +1 234 567 890
              </small>
            </div>
            <div className="col-md-6 text-end">
              <small>
                <i className="bi bi-envelope me-2"></i>
                support@shopmart.com
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container">
          <Link href="/" className="navbar-brand">
            <i className="bi bi-shop text-primary me-2"></i>
            <strong>ShopMart</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Search Bar */}
            <form className="d-flex mx-auto my-2 my-lg-0" style={{ width: '40%' }} onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* Navigation Links */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/categories" className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/brands" className="nav-link">
                  Brands
                </Link>
              </li>

              {/* Wishlist */}
              <li className="nav-item">
                <Link href="/wishlist" className="nav-link position-relative">
                  <i className="bi bi-heart fs-5"></i>
                  {wishlistCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* Cart */}
              <li className="nav-item">
                <Link href="/cart" className="nav-link position-relative">
                  <i className="bi bi-cart3 fs-5"></i>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* User Menu */}
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                    <span className="ms-1">{user?.name}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link href="/profile" className="dropdown-item">
                        <i className="bi bi-person me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders" className="dropdown-item">
                        <i className="bi bi-bag me-2"></i>Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/addresses" className="dropdown-item">
                        <i className="bi bi-geo-alt me-2"></i>Addresses
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/login" className="nav-link">
                      <i className="bi bi-box-arrow-in-right me-1"></i>Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/register" className="btn btn-primary btn-sm ms-2">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
