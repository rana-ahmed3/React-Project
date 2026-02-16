'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ordersAPI } from '@/lib/api/orders';
import { Order } from '@/types/order';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getOrders();
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
        <Breadcrumb items={[{ label: 'My Orders' }]} />

        <h2 className="mb-4">
          <i className="bi bi-bag me-2"></i>
          My Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x display-1 text-muted"></i>
            <h4 className="mt-3">No orders yet</h4>
            <p className="text-muted">Start shopping to place your first order</p>
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-12 mb-3">
                <div className="order-card">
                  <div className="row">
                    <div className="col-md-3">
                      <h6>Order #{order.id}</h6>
                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="col-md-3">
                      <strong>Total:</strong>
                      <div className="text-primary fs-5">
                        ${order.totalOrderPrice}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <strong>Payment:</strong>
                      <div className="text-capitalize">
                        {order.paymentMethodType}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <strong>Status:</strong>
                      <div>
                        <span
                          className={`order-status ${
                            order.isDelivered
                              ? 'delivered'
                              : order.isPaid
                              ? 'paid'
                              : 'pending'
                          }`}
                        >
                          {order.isDelivered
                            ? 'Delivered'
                            : order.isPaid
                            ? 'Paid'
                            : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div>
                    <h6>Items ({order.cartItems.length})</h6>
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="mb-2">
                        <small>
                          {item.product.title} - Qty: {item.count} - $
                          {item.price}
                        </small>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <strong>Shipping Address:</strong>
                    <div className="text-muted">
                      {order.shippingAddress.details},{' '}
                      {order.shippingAddress.city}
                      <br />
                      Phone: {order.shippingAddress.phone}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
