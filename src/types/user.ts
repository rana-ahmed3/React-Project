export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface Address {
  _id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressResponse {
  status: string;
  message: string;
  data: Address[];
}
