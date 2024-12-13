import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axios';
import { LoginCredentials, SignupCredentials, AuthResponse } from './authTypes';

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/users/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, SignupCredentials>(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/users/signup', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const logout = createAsyncThunk<void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/users/logout');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const forgotPassword = createAsyncThunk<void, string>(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/user/forgot-password', { email });
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
    }
  }
);