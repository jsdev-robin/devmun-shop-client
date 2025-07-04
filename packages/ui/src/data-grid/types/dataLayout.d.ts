import { Table } from '@tanstack/react-table';

export interface DataLayoutProps<T> {
  table: Table<T>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  isSplit?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  toolbar?: {
    active?: boolean;
    open?: 'columns' | 'toolbar' | 'filter' | null;
  };
  rowNumber?: boolean;
  pagination?: number[];
}
