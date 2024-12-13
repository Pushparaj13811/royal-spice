import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axios';
import { UserProfile, Address } from './userTypes';

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UserProfile>('/user/getuser');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

export const updateProfile = createAsyncThunk<UserProfile, Partial<UserProfile>>(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<UserProfile>('/user/update-profile', profileData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const updateAddress = createAsyncThunk<UserProfile, Address>(
  'user/updateAddress',
  async (address, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<UserProfile>('/user/update-address', { address });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update address');
    }
  }
);