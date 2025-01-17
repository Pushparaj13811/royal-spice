import axiosInstance from './axios';
import type {
    User,
    LoginCredentials,
    RegisterCredentials,
    UpdateProfileData,
    ChangePasswordData,
    ForgotPasswordData,
    ResetPasswordData,
    VerifyEmailData,
    VerifyMobileData,
    Session,
    Address,
    AuthResponse,
    ApiResponse
} from '@/types/user.types';

const BASE_URL = '/users';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  mobile?: string;
}

interface LoginData {
  email: string;
  password: string;
}

class UserService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/logout', {
      method: 'POST',
    });
  }

  async verifyEmail(data: VerifyEmailData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resendVerificationEmail(email: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/resend-verification-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getCurrentUser(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/current-user');
  }

  async refreshToken(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users/refresh-token');
  }

  // Password management
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    return this.request<ApiResponse>(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const userService = new UserService();

export const userServiceAxios = {
    // Auth endpoints
    register: async (data: RegisterCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post(`${BASE_URL}/register`, data, {
            withCredentials: true
        });
        return response.data;
    },

    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post(`${BASE_URL}/login`, credentials, {
            withCredentials: true
        });
        return response.data;
    },

    logout: async (): Promise<ApiResponse> => {
        const response = await axiosInstance.post(`${BASE_URL}/logout`, {}, {
            withCredentials: true
        });
        return response.data;
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const response = await axiosInstance.post(`${BASE_URL}/refresh-token`, {}, {
            withCredentials: true
        });
        return response.data;
    },

    // Profile endpoints
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.get(`${BASE_URL}/me`);
        return response.data;
    },

    updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.patch(`${BASE_URL}/update-profile`, data);
        return response.data;
    },

    // Password management
    changePassword: async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post(`${BASE_URL}/change-password`, data);
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post(`${BASE_URL}/forgot-password`, data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post(`${BASE_URL}/reset-password/${data.token}`, {
            password: data.password
        });
        return response.data;
    },

    // Verification endpoints
    verifyEmail: async (data: VerifyEmailData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.get(`${BASE_URL}/verify-email/${data.token}`);
        return response.data;
    },

    resendVerificationEmail: async (): Promise<ApiResponse<void>> => {
        const email = axiosInstance.defaults.headers.common['X-User-Email'];
        return axiosInstance.post(`${BASE_URL}/resend-verification-email`, { email });
    },

    sendVerificationSMS: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post(`${BASE_URL}/send-mobile-verification`);
        return response.data;
    },

    verifyMobile: async (data: VerifyMobileData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post(`${BASE_URL}/verify-mobile`, data);
        return response.data;
    },

    // Address management
    addAddress: async (address: Omit<Address, '_id'>): Promise<ApiResponse<Address>> => {
        const response = await axiosInstance.post(`${BASE_URL}/addresses`, address);
        return response.data;
    },

    updateAddress: async (addressId: string, address: Partial<Address>): Promise<ApiResponse<Address>> => {
        const response = await axiosInstance.patch(`${BASE_URL}/addresses/${addressId}`, address);
        return response.data;
    },

    deleteAddress: async (addressId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`${BASE_URL}/addresses/${addressId}`);
        return response.data;
    },

    getAllAddresses: async (): Promise<ApiResponse<Address[]>> => {
        const response = await axiosInstance.get(`${BASE_URL}/addresses`);
        return response.data;
    },

    getDefaultAddress: async (): Promise<ApiResponse<Address>> => {
        const response = await axiosInstance.get(`${BASE_URL}/addresses/default`);
        return response.data;
    },

    // Session management
    getAllSessions: async (): Promise<ApiResponse<Session[]>> => {
        const response = await axiosInstance.get(`${BASE_URL}/sessions`);
        return response.data;
    },

    terminateSession: async (sessionId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`${BASE_URL}/sessions/${sessionId}`);
        return response.data;
    },

    terminateAllSessions: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`${BASE_URL}/sessions`);
        return response.data;
    },

    // Account deletion
    deleteAccount: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`${BASE_URL}/delete-account`);
        return response.data;
    },

    deleteUser: async (userId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`${BASE_URL}/${userId}`);
        return response.data;
    }
};
