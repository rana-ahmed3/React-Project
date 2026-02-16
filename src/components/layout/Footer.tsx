'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">
              <i className="bi bi-shop text-primary me-2"></i>
              ShopMart
            </h5>
            <p className="text-muted">
              Your one-stop destination for quality products at unbeatable prices. 
              Shop with confidence and enjoy fast, reliable delivery.
            </p>
            <div className="social-links mt-3">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-youtube fs-4"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/products">Products</Link>
              </li>
              <li className="mb-2">
                <Link href="/categories">Categories</Link>
              </li>
              <li className="mb-2">
                <Link href="/brands">Brands</Link>
              </li>
              <li className="mb-2">
                <Link href="/cart">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#">Shipping Policy</a>
              </li>
              <li className="mb-2">
                <a href="#">Return Policy</a>
              </li>
              <li className="mb-2">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3">Contact Us</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Shopping Street, NY 10001
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +1 234 567 890
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                support@shopmart.com
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                Mon - Fri: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} ShopMart. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              height="20"
              className="me-2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              height="20"
              className="me-2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              height="20"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
