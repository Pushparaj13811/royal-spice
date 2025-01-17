import axios, { AxiosError } from 'axios';
import { store } from '@/app/store';
import { refreshTokens } from '@/features/auth/authSlice';
import { logout as logoutAction } from '@/features/auth/authThunks';

// Extend the InternalAxiosRequestConfig type
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: number;
  }
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies
});

// Token refresh flags and queue
let isRefreshing = false;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const cleanupAuthData = () => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem('persist:root');
  localStorage.removeItem('auth');
  localStorage.removeItem('user');

  // Clear any other app-specific data
  localStorage.clear();

  // Reset the counters
  refreshAttempts = 0;
  isRefreshing = false;
  failedQueue = [];
};

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const state = store.getState();

    // Don't retry for these cases
    if (
      !originalRequest || // no config
      originalRequest?.url?.includes('/logout') || // logout request
      originalRequest?.url?.includes('/login') || // login request
      (error.response?.status === 404 && originalRequest?.url?.includes('/refresh-token')) || // refresh token not found
      originalRequest._retry! >= 3 // max retries reached
    ) {
      // Clean up if it's a 401 error
      if (error.response?.status === 401) {
        cleanupAuthData();
        store.dispatch(logoutAction());
      }
      return Promise.reject(error);
    }

    // Initialize _retry if it doesn't exist
    if (originalRequest && typeof originalRequest._retry === 'undefined') {
      originalRequest._retry = 0;
    }

    // Handle 401 errors (Unauthorized)
    if (error.response?.status === 401) {
      // Increment retry counter for this specific request
      originalRequest._retry!++;

      // If no refresh token available or max refresh attempts exceeded, cleanup and logout
      if (!state.auth.refreshToken || refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        cleanupAuthData();
        store.dispatch(logoutAction());
        return Promise.reject(new Error(
          !state.auth.refreshToken
            ? 'No refresh token available. Please login again.'
            : 'Session expired. Please login again.'
        ));
      }

      // If already refreshing, queue the request
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (originalRequest) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
          }
          return axiosInstance(originalRequest);
        } catch {
          cleanupAuthData();
          store.dispatch(logoutAction());
          return Promise.reject(new Error('Authentication failed. Please login again.'));
        }
      }

      isRefreshing = true;
      refreshAttempts++;

      try {
        // Attempt to refresh token
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = response.data.data;

        // Update tokens in store
        store.dispatch(refreshTokens({ accessToken, refreshToken }));

        // Process queued requests
        processQueue(null, accessToken);

        // Reset refresh attempts on successful refresh
        refreshAttempts = 0;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clean up and logout
        cleanupAuthData();
        processQueue(refreshError as Error);
        store.dispatch(logoutAction());
        return Promise.reject(new Error('Session expired. Please login again.'));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
