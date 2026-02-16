'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  if (!cart || cart.products.length === 0) {
    return (
      <>
        <Header />
        <div className="container my-5">
          <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted"></i>
            <h3 className="mt-4">Your cart is empty</h3>
            <p className="text-muted">Add some products to get started</p>
            <Link href="/products" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <h2 className="mb-4">Shopping Cart ({cart.products.length} items)</h2>

        <div className="row">
          <div className="col-lg-8">
            {cart.products.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={100}
                        height={100}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-4">
                      <Link
                        href={`/products/${item.product._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <h6>{item.product.title}</h6>
                      </Link>
                      <small className="text-muted">
                        {item.product.category.name}
                      </small>
                    </div>
                    <div className="col-md-2">
                      <h6 className="text-primary">${item.price}</h6>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item._id, item.count - 1)}
                          disabled={item.count <= 1 || loading}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.count}
                          readOnly
                          style={{ maxWidth: '60px' }}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item._id, item.count + 1)}
                          disabled={loading}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => removeFromCart(item._id)}
                        disabled={loading}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">${cart.totalCartPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="fw-bold">$10</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <h5>Total:</h5>
                  <h5 className="text-primary">${cart.totalCartPrice + 10}</h5>
                </div>

                <Link
                  href="/checkout"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="btn btn-outline-secondary w-100"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
