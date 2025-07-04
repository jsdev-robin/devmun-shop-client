import { GetProductsResponse, GetQueryParams } from '../../../types/api';
import { apiSlice } from '../api/api';

export const productEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<GetProductsResponse, GetQueryParams>({
      query: ({ pagination, queryParams }) => ({
        url: `/product?page=${pagination?.pageIndex}&pageSize=${pagination?.pageSize}&${queryParams}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetProductQuery } = productEndpoints;
