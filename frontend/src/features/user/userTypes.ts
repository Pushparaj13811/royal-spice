export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}