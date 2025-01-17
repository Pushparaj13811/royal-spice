import axiosInstance from './axios';
import type { ApiResponse } from '@/types/user.types';

export interface Address {
  _id: string;
  addressType: 'Home' | 'Work' | 'Other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

const BASE = '/users';

export const addressService = {
  addAddress(address: Omit<Address, '_id'>): Promise<ApiResponse<Address>> {
    return axiosInstance.post(`${BASE}/addresses`, address);
  },

  updateAddress(addressId: string, address: Partial<Address>): Promise<ApiResponse<Address>> {
    return axiosInstance.patch(`${BASE}/addresses/${addressId}`, address);
  },

  deleteAddress(addressId: string): Promise<ApiResponse<void>> {
    return axiosInstance.delete(`${BASE}/addresses/${addressId}`);
  },

  getAllAddresses(): Promise<ApiResponse<Address[]>> {
    return axiosInstance.get(`${BASE}/addresses`);
  },

  getPrimaryAddress(): Promise<ApiResponse<Address>> {
    return axiosInstance.get(`${BASE}/addresses/default`);
  },

  setPrimaryAddress(addressId: string): Promise<ApiResponse<Address>> {
    return axiosInstance.patch(`${BASE}/addresses/${addressId}`, { isDefault: true });
  }
};
