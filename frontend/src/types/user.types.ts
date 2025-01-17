export interface Address {
    _id?: string;
    addressType: 'Home' | 'Work' | 'Other';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
}

export interface User {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    alternateMobile?: string;
    role: 'user' | 'admin' | 'superadmin';
    avatar?: string;
    emailVerified: boolean;
    numberVerified: boolean;
    addresses?: Address[];
    createdAt: string;
    recentActivity?: Activity[];
}

export interface Activity {
    id: string;
    user: {
        name: string;
        image?: string;
    };
    action: string;
    timestamp: string;
    type: 'order' | 'user' | 'product' | 'review';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    alternateMobile?: string;
}

export interface UpdateProfileData {
    fullName?: string;
    mobile?: string;
    email?: string;
    alternateMobile?: string;
    avatar?: string;
    address?: Address;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    password: string;
    token: string;
}

export interface VerifyEmailData {
    token: string;
}

export interface VerifyMobileData {
    otp: string;
}

export interface Session {
    _id: string;
    userId: string;
    deviceInfo: string;
    userAgent: string;
    ipAddress: string;
    isActive: boolean;
    createdAt: string;
    lastAccessedAt: string;
}

export interface AuthResponse {
    status: number;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
    message: string;
}

export interface ApiResponse<T> {
  data: {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
  };
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
