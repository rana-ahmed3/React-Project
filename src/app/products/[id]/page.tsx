'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { productsAPI } from '@/lib/api/products';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const res = await productsAPI.getProductById(id);
      setProduct(res.data);
      setSelectedImage(res.data.imageCover);

      // Fetch related products
      if (res.data.category._id) {
        const related = await productsAPI.getProductsByCategory(
          res.data.category._id,
          1
        );
        setRelatedProducts(related.data.filter((p) => p._id !== id).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (product) {
      await addToCart(product._id);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (product) {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
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

  if (!product) {
    return (
      <>
        <Header />
        <div className="container my-5 text-center">
          <h2>Product not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb
          items={[
            { label: 'Products', href: '/products' },
            { label: product.title.substring(0, 30) + '...' },
          ]}
        />

        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <Image
                src={selectedImage}
                alt={product.title}
                width={600}
                height={600}
                className="img-fluid rounded mb-3"
                style={{ objectFit: 'cover' }}
              />
              <div className="row g-2">
                {[product.imageCover, ...product.images].map((img, idx) => (
                  <div key={idx} className="col-3">
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      width={150}
                      height={150}
                      className={`img-fluid rounded cursor-pointer ${
                        selectedImage === img ? 'border border-primary' : ''
                      }`}
                      style={{ objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <h2 className="mb-3">{product.title}</h2>

            <div className="mb-3">
              <span className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi bi-star${
                      i < Math.round(product.ratingsAverage) ? '-fill' : ''
                    } fs-5`}
                  ></i>
                ))}
              </span>
              <span className="ms-2 text-muted">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            <div className="mb-3">
              <span className="badge bg-secondary">{product.category.name}</span>
              <span className="badge bg-info ms-2">{product.brand.name}</span>
            </div>

            <div className="mb-4">
              {product.priceAfterDiscount ? (
                <>
                  <h3 className="text-danger d-inline">
                    ${product.priceAfterDiscount}
                  </h3>
                  <span className="text-muted text-decoration-line-through fs-4 ms-3">
                    ${product.price}
                  </span>
                  <span className="badge bg-danger ms-2">-{discount}% OFF</span>
                </>
              ) : (
                <h3 className="text-primary">${product.price}</h3>
              )}
            </div>

            <div className="mb-4">
              <h5>Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Brand:</strong> {product.brand.name}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Category:</strong> {product.category.name}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Availability:</strong>{' '}
                  {product.quantity > 0 ? (
                    <span className="text-success">In Stock ({product.quantity})</span>
                  ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Sold:</strong> {product.sold} units
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-12">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </button>
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-outline-danger btn-lg w-100"
                  onClick={handleWishlistToggle}
                >
                  <i
                    className={`bi bi-heart${
                      isInWishlist(product._id) ? '-fill' : ''
                    } me-2`}
                  ></i>
                  {isInWishlist(product._id)
                    ? 'Remove from Wishlist'
                    : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-5">
            <h3 className="mb-4">Related Products</h3>
            <div className="row g-4">
              {relatedProducts.map((prod) => (
                <div key={prod._id} className="col-lg-3 col-md-6">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
