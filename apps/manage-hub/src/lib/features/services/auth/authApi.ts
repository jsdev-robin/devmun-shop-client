import {
  GetProfileResponse,
  SignupResponse,
  SinginRequest,
  SinginResponse,
  SingupRequest,
  SuccessResponse,
  VerifyEmailRequest,
} from '@repo/ui/types/auth-types';
import { apiSlice } from '../../api/api';
import { signup } from './authSlice';

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SingupRequest>({
      query: (body) => ({
        url: '/hub/auth/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signup({ token: data.data.token }));
        } catch (error) {
          console.log('Signup error:', error);
        }
      },
    }),

    verifyEmail: builder.mutation<SuccessResponse, VerifyEmailRequest>({
      query: ({ token, otp }) => ({
        url: '/hub/auth/verify-email',
        method: 'POST',
        body: { token, otp },
      }),
    }),

    signin: builder.mutation<SinginResponse, SinginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/hub/auth/signin',
        method: 'POST',
        body: { email, password, remember },
      }),
    }),

    signout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/hub/auth/signout',
        method: 'POST',
      }),
    }),

    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: '/hub/auth/refresh-token',
        method: 'POST',
      }),
    }),

    getProfile: builder.query<GetProfileResponse, void>({
      query: () => '/hub/auth/me',
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useSigninMutation,
  useSignoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
} = userAuthApi;
