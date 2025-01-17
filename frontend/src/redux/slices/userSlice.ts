import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user.types';

interface UserState {
  user: User | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  email: localStorage.getItem('userEmail'),
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload?.email) {
        state.email = action.payload.email;
        localStorage.setItem('userEmail', action.payload.email);
      }
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem('userEmail', action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = null;
      localStorage.removeItem('userEmail');
    },
  },
});

export const { setUser, setEmail, clearUser } = userSlice.actions;
export default userSlice.reducer;
