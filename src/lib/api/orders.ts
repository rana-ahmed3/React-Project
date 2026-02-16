import { axiosInstance } from './axios';
import { OrdersResponse, CreateOrderData, CheckoutSessionResponse } from '@/types/order';

export const ordersAPI = {
  // Get user orders
  getOrders: async (): Promise<OrdersResponse> => {
    const response = await axiosInstance.get('/orders');
    return response.data;
  },

  // Get specific order
  getOrderById: async (orderId: string) => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  },

  // Create cash order
  createCashOrder: async (cartId: string, data: CreateOrderData) => {
    const response = await axiosInstance.post(`/orders/${cartId}`, data);
    return response.data;
  },

  // Create checkout session (for card payment)
  createCheckoutSession: async (
    cartId: string,
    data: CreateOrderData
  ): Promise<CheckoutSessionResponse> => {
    const response = await axiosInstance.post(
      `/orders/checkout-session/${cartId}`,
      data,
      {
        params: {
          url: `${window.location.origin}/orders`,
        },
      }
    );
    return response.data;
  },
};
