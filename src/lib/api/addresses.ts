import { axiosInstance } from './axios';
import { Address, AddressResponse } from '@/types/user';

export const addressesAPI = {
  // Get user addresses
  getAddresses: async (): Promise<AddressResponse> => {
    const response = await axiosInstance.get('/addresses');
    return response.data;
  },

  // Add new address
  addAddress: async (data: Address): Promise<AddressResponse> => {
    const response = await axiosInstance.post('/addresses', data);
    return response.data;
  },

  // Remove address
  removeAddress: async (addressId: string): Promise<AddressResponse> => {
    const response = await axiosInstance.delete(`/addresses/${addressId}`);
    return response.data;
  },
};
