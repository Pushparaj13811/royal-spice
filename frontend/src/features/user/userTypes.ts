export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UserProfile {
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

export interface UserState {
  profile: UserProfile | null;
  sessions: Session[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface UpdateProfilePayload {
  fullName?: string;
  mobile?: string;
  alternateMobile?: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export type AddressPayload = Omit<Address, '_id'>;