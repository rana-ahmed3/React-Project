'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { addressesAPI } from '@/lib/api/addresses';
import { ordersAPI } from '@/lib/api/orders';
import { Address } from '@/types/user';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!cart || cart.products.length === 0) {
      router.push('/cart');
      return;
    }
    fetchAddresses();
  }, [isAuthenticated, cart]);

  const fetchAddresses = async () => {
    try {
      const res = await addressesAPI.getAddresses();
      setAddresses(res.data);
      if (res.data.length > 0) {
        setSelectedAddress(res.data[0]._id!);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a shipping address');
      return;
    }

    const address = addresses.find((a) => a._id === selectedAddress);
    if (!address) return;

    const shippingData = {
      shippingAddress: {
        details: address.details,
        phone: address.phone,
        city: address.city,
      },
    };

    setLoading(true);
    try {
      if (paymentMethod === 'cash') {
        // Create cash order
        await ordersAPI.createCashOrder(cart!._id, shippingData);
        toast.success('Order placed successfully!');
        router.push('/orders');
      } else {
        // Create checkout session for card payment
        const session = await ordersAPI.createCheckoutSession(
          cart!._id,
          shippingData
        );
        // Redirect to Stripe checkout
        window.location.href = session.session.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return null;

  return (
    <>
      <Header />
      <div className="container my-4">
        <Breadcrumb items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

        <h2 className="mb-4">Checkout</h2>

        <div className="row">
          <div className="col-lg-8">
            {/* Shipping Address */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  Shipping Address
                </h5>

                {addresses.length === 0 ? (
                  <div className="alert alert-warning">
                    No addresses found. Please add an address first.
                    <button
                      className="btn btn-link"
                      onClick={() => router.push('/addresses')}
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="row g-3">
                    {addresses.map((address) => (
                      <div key={address._id} className="col-md-6">
                        <div
                          className={`address-card ${
                            selectedAddress === address._id ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedAddress(address._id!)}
                        >
                          <h6>{address.name}</h6>
                          <p className="mb-1">{address.details}</p>
                          <p className="mb-1 text-muted">{address.city}</p>
                          <p className="mb-0 text-muted">{address.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-credit-card me-2"></i>
                  Payment Method
                </h5>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod('cash')}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    <i className="bi bi-cash me-2"></i>
                    Cash on Delivery
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod('card')}
                  />
                  <label className="form-check-label" htmlFor="card">
                    <i className="bi bi-credit-card me-2"></i>
                    Credit/Debit Card
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>

                <div className="mb-3">
                  <h6>Items ({cart.products.length})</h6>
                  {cart.products.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <small>
                        {item.product.title.substring(0, 30)}... x {item.count}
                      </small>
                      <small>${item.price * item.count}</small>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cart.totalCartPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>$10</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>$0</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <h5>Total:</h5>
                  <h5 className="text-primary">${cart.totalCartPrice + 10}</h5>
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handlePlaceOrder}
                  disabled={loading || addresses.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Place Order
                    </>
                  )}
                </button>

                <div className="mt-3 text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
