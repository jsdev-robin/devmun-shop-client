import {
  ColumnDef,
  ColumnFiltersState,
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
  toolbar?: {
    active?: boolean;
    open?: 'columns' | 'toolbar' | 'filter' | null;
  };
  isSplit?: boolean;
  pin?: ColumnPinningState;
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}
