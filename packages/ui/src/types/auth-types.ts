export type Role = 'user' | 'seller' | 'admin';

export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
}

export interface AuthState {
  verifyToken: string | null;
  user: IUser | null;
  isAuth: boolean;
}

export interface SuccessResponse {
  status: 'success';
  message: string;
}

// Sign-up
export interface SignupResponse extends SuccessResponse {
  data: {
    token: string;
  };
}

export interface SingupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Verify
export interface VerifyEmailRequest {
  token: string;
  otp: number;
}

// Sign-in
export interface SinginResponse extends SuccessResponse {
  data: {
    role: Role;
  };
}

export interface SinginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

// Get Profile
export interface GetProfileResponse extends SuccessResponse {
  data: {
    user: IUser;
  };
}
