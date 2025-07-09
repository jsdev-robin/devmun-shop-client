import {
  SinginRequest,
  SinginResponse,
  SingupRequest,
  SingupResponse,
  SuccessResponse,
  VerifyEmailRequest,
} from '@repo/ui/types/auth-types';
import { apiSlice } from '../../api/api';
import { signup } from './authSlice';

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SingupResponse, SingupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signup({ token: data.data.token }));
        } catch (error) {
          console.error('Signup error:', error);
        }
      },
    }),

    verifyEmail: builder.mutation<SuccessResponse, VerifyEmailRequest>({
      query: ({ token, otp }) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { token, otp },
      }),
    }),

    signin: builder.mutation<SinginResponse, SinginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { email, password, remember },
      }),
    }),

    signout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useSigninMutation,
  useSignoutMutation,
} = userAuthApi;
