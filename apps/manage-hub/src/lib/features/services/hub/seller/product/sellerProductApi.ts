import { GetQueryParams, ProductResponse } from '@repo/ui/types/api-response';
import { apiSlice } from '../../../../api/api';

export const sellerProductEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    readMyAll: builder.query<ProductResponse, GetQueryParams>({
      query: ({ pagination, queryParams }) => ({
        url: `/seller/product?page=${pagination?.pageIndex ?? 0}&limit=${pagination?.pageSize ?? 20}&${queryParams}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useReadMyAllQuery } = sellerProductEndpoints;
