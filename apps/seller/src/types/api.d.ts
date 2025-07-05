import { PaginationState } from '@tanstack/react-table';
import { Discount, DiscountTrend } from './discount';
import { Order } from './order';
import { Person } from './person';
import { Review } from './review';

export type GetQueryParams = {
  pagination?: PaginationState;
  queryParams?: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type GetPersonsResponse = PaginatedResponse<Person>;
export type GetProductsResponse = PaginatedResponse<Product>;
export type GetOrdersResponse = PaginatedResponse<Order>;
export type GetReviewsResponse = PaginatedResponse<Review>;
export type GetDiscountTrendsResponse = PaginatedResponse<DiscountTrend>;
export type GetDiscountResponse = PaginatedResponse<Discount>;
