export type Role = 'buyer' | 'seller' | 'admin' | 'moderator';

export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface AuthState {
  verificationToken: string | null;
  user: IUser | null;
  isAuth: boolean;
}

export interface SuccessResponse {
  status: 'success';
  message: string;
}

export interface SingupResponse extends SuccessResponse {
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

export interface VerifyEmailRequest {
  token: string;
  otp: number;
}

export interface SinginResponse extends SuccessResponse {
  role: Role;
}

export interface SinginRequest {
  email: string;
  password: string;
  remember?: boolean;
}
