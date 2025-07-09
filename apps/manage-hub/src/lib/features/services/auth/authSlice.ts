import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@repo/ui/types/auth-types';

const initialState: AuthState = {
  verifyToken: null,
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) => {
      state.verifyToken = action.payload.token;
    },
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;
