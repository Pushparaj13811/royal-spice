import { User, Address, LoginCredentials } from '@/types/user.types';

export type { User, Address, LoginCredentials };

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  needsEmailVerification: boolean;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}