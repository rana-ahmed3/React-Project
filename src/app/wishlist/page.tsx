'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        <h2 className="mb-4">
          <i className="bi bi-heart text-danger me-2"></i>
          My Wishlist ({wishlist.length} items)
        </h2>

        {wishlist.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-heart display-1 text-muted"></i>
            <h3 className="mt-4">Your wishlist is empty</h3>
            <p className="text-muted">Save your favorite products here</p>
            <Link href="/products" className="btn btn-primary mt-3">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
