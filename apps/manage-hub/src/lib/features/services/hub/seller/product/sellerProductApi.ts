import { GetQueryParams, ProductResponse } from '@repo/ui/types/api-response';
import { apiSlice } from '../../../../api/api';

export const sellerProductEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    readMyAll: builder.query<ProductResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/seller/product?page=${pagination?.pageIndex}&limit=${pagination?.pageSize}`;
        if (queryParams) {
          url += `&${queryParams}`;
        }
        if (sort) {
          url += `&${sort}`;
        }
        if (globalFilter) {
          url += `&q=${globalFilter}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useReadMyAllQuery } = sellerProductEndpoints;
