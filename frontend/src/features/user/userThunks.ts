import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@/services/user.service';
import { AxiosError } from 'axios';
import type {
    UserProfile,
    Session,
    Address,
    UpdateProfilePayload,
    ChangePasswordPayload,
    AddressPayload
} from './userTypes';

// Profile Management
export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getCurrentUser();
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch user details');
        }
    }
);

export const updateProfile = createAsyncThunk<UserProfile, UpdateProfilePayload>(
    'user/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await userService.updateProfile(profileData);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to update profile');
        }
    }
);

export const changePassword = createAsyncThunk<void, ChangePasswordPayload>(
    'user/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            await userService.changePassword(passwordData);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to change password');
        }
    }
);

// Address Management
export const addAddress = createAsyncThunk<Address, AddressPayload>(
    'user/addAddress',
    async (address, { rejectWithValue }) => {
        try {
            const response = await userService.addAddress(address);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to add address');
        }
    }
);

export const updateAddress = createAsyncThunk<Address, { addressId: string; address: Partial<Address> }>(
    'user/updateAddress',
    async ({ addressId, address }, { rejectWithValue }) => {
        try {
            const response = await userService.updateAddress(addressId, address);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to update address');
        }
    }
);

export const deleteAddress = createAsyncThunk<void, string>(
    'user/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            await userService.deleteAddress(addressId);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete address');
        }
    }
);

export const getAllAddresses = createAsyncThunk<Address[]>(
    'user/getAllAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getAllAddresses();
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch addresses');
        }
    }
);

// Session Management
export const getAllSessions = createAsyncThunk<Session[]>(
    'user/getAllSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getAllSessions();
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to fetch sessions');
        }
    }
);

export const terminateSession = createAsyncThunk<void, string>(
    'user/terminateSession',
    async (sessionId, { rejectWithValue }) => {
        try {
            await userService.terminateSession(sessionId);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to terminate session');
        }
    }
);

export const terminateAllSessions = createAsyncThunk(
    'user/terminateAllSessions',
    async (_, { rejectWithValue }) => {
        try {
            await userService.terminateAllSessions();
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to terminate all sessions');
        }
    }
);

// Account Management
export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async (_, { rejectWithValue }) => {
        try {
            await userService.deleteAccount();
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to delete account');
        }
    }
);