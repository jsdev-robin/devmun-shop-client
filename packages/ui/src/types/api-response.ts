import { PaginationState } from '@tanstack/react-table';
import { IProduct } from './product-types';

export type GetQueryParams = {
  pagination?: PaginationState;
  queryParams?: string;
};

export interface PaginatedResponse<T> {
  status: 'success';
  message: string;
  data: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export type ProductResponse = PaginatedResponse<IProduct>;
