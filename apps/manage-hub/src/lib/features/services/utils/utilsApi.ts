import { TempImgRequest } from '@repo/ui/types/api-utils';
import { SuccessResponse } from '@repo/ui/types/auth-types';
import { apiSlice } from '../../api/api';

export const sellerProductEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setTempImg: builder.mutation<SuccessResponse, TempImgRequest>({
      query: (publicId) => ({
        url: '/utils/temp-img',
        method: 'POST',
        body: publicId,
      }),
    }),

    deleteTempImgById: builder.mutation<SuccessResponse, string>({
      query: (publicId) => ({
        url: `/utils/temp-img/${publicId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSetTempImgMutation, useDeleteTempImgByIdMutation } =
  sellerProductEndpoints;
