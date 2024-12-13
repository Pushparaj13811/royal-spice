import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axios';
import { Product, ProductFilters } from './productTypes';

export const getProducts = createAsyncThunk<Product[], ProductFilters | void>(
  'product/getProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Product[]>('/products/getproducts', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const getProductById = createAsyncThunk<Product, string>(
  'product/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Product>(`/products/getproduct/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const createProduct = createAsyncThunk<Product, Partial<Product>>(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Product>('/products/create-product', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; data: Partial<Product> }
>('product/updateProduct', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put<Product>(`/products/update-product/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk<string, string>(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/delete-product/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);