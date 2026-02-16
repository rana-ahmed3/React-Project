import { Product } from './product';
import { User, Address } from './user';

export interface OrderItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  user: User;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  paidAt?: string;
  deliveredAt?: string;
}

export interface OrdersResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Order[];
}

export interface CreateOrderData {
  shippingAddress: ShippingAddress;
}

export interface CheckoutSessionResponse {
  status: string;
  session: {
    url: string;
  };
}
