'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      await addToCart(product._id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const discount = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <div className="card product-card h-100">
      <Link href={`/products/${product._id}`}>
        <div className="product-image position-relative">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={300}
            height={300}
            className="card-img-top"
            style={{ objectFit: 'cover', height: '250px' }}
          />
          {discount > 0 && <span className="badge-discount">-{discount}%</span>}
          <button
            className="btn btn-light position-absolute top-0 start-0 m-2"
            onClick={handleWishlistToggle}
            style={{ zIndex: 10 }}
          >
            <i className={`bi bi-heart${inWishlist ? '-fill text-danger' : ''}`}></i>
          </button>
        </div>
      </Link>

      <div className="card-body d-flex flex-column">
        <Link href={`/products/${product._id}`} className="text-decoration-none text-dark">
          <h6 className="card-title" style={{ minHeight: '48px' }}>
            {product.title.substring(0, 60)}...
          </h6>
        </Link>

        <div className="mb-2">
          <span className="text-muted small">{product.category.name}</span>
        </div>

        <div className="mb-2">
          <span className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi bi-star${i < Math.round(product.ratingsAverage) ? '-fill' : ''}`}
              ></i>
            ))}
          </span>
          <span className="text-muted small ms-1">({product.ratingsQuantity})</span>
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-danger fw-bold fs-5">
                    ${product.priceAfterDiscount}
                  </span>
                  <span className="text-muted text-decoration-line-through ms-2">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-primary fw-bold fs-5">${product.price}</span>
              )}
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={handleAddToCart}>
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
