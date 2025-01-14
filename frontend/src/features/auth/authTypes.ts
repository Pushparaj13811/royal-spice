export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  role: 'user' | 'admin';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Data{
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: Data;
  token: string;
}