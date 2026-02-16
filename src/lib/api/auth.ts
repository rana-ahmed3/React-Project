import { axiosInstance } from './axios';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
} from '@/types/user';

export const authAPI = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signin', credentials);
    return response.data;
  },

  // Forgot password - Send reset code to email
  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/forgotPasswords', data);
    return response.data;
  },

  // Verify reset code
  verifyResetCode: async (resetCode: string): Promise<{ status: string }> => {
    const response = await axiosInstance.post('/auth/verifyResetCode', { resetCode });
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
    const response = await axiosInstance.put('/auth/resetPassword', data);
    return response.data;
  },

  // Change password (authenticated user)
  changePassword: async (data: ChangePasswordData): Promise<AuthResponse> => {
    const response = await axiosInstance.put('/users/changeMyPassword', data);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await axiosInstance.get('/users/getMe');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: { name?: string; email?: string; phone?: string }) => {
    const response = await axiosInstance.put('/users/updateMe', data);
    return response.data;
  },
};
