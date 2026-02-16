import { Product } from './product';

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: Cart;
  message?: string;
}

export interface AddToCartData {
  productId: string;
}

export interface UpdateCartItemData {
  count: number;
}
