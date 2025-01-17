import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { userServiceAxios } from '@/services/user.service';
import { LoginCredentials, SignupCredentials } from './authTypes';
import type { AuthResponse, } from '@/types/user.types';

interface ErrorResponse {
  message: string;
  status: number;
}

export const login = createAsyncThunk<AuthResponse['data'], LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userServiceAxios.login(credentials);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk<AuthResponse['data'], SignupCredentials>(
  'auth/signup',
  async (credentials) => {
    try {
      const response = await userServiceAxios.register(credentials);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.status === 409) {
        throw new Error('Email is already registered. Please use a different email or try logging in.');
      }
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  }
);

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await userServiceAxios.logout();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

export const forgotPassword = createAsyncThunk<void, string>(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await userServiceAxios.forgotPassword({ email });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      return rejectWithValue(err.response?.data?.message || 'Failed to send reset email');
    }
  }
);