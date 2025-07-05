import { GetPersonsResponse, GetQueryParams } from '@/types/api';
import { apiSlice } from '../api/api';

export const personEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersons: builder.query<GetPersonsResponse, GetQueryParams>({
      query: ({ pagination, queryParams }) => ({
        url: `/person?page=${pagination?.pageIndex}&pageSize=${pagination?.pageSize}&${queryParams}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetPersonsQuery } = personEndpoints;
