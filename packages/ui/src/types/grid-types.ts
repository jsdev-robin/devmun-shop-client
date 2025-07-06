import {
  ColumnDef,
  ColumnPinningState,
  PaginationState,
} from '@tanstack/react-table';

export interface GridProps<T> {
  data?: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  columns: ColumnDef<T>[];
  isError: boolean;
  isLoading: boolean;
  pagination?: number[];
  setParams?: ({
    queryParams,
    pagination,
  }: {
    queryParams: string;
    pagination: PaginationState;
  }) => void;
  toolbar?: {
    active?: boolean;
    open?: 'columns' | 'toolbar' | 'filter' | null;
  };
  isSplit?: boolean;
  pin?: ColumnPinningState;
}
