import { GetQueryParams, ProductResponse } from '@repo/ui/types/api-response';
import { apiSlice } from '../../../../api/api';

export const sellerProductEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    readMyAll: builder.query<ProductResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort }) => ({
        url: `/seller/product?page=${pagination?.pageIndex}&limit=${pagination?.pageSize}&${queryParams}&sort=${sort}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useReadMyAllQuery } = sellerProductEndpoints;
