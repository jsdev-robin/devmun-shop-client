/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getSortedRowModel,
  PaginationState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import useSyncScroll from '../hooks/useSyncScroll';

interface DataGridContexttValue<T> {
  table: Table<T>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading?: boolean;
  isError?: boolean;

  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
}

const DataGridContextt = createContext<DataGridContexttValue<any> | null>(null);

interface DataGridProviderProps<T> {
  children?: React.ReactNode;
  data?: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isError?: boolean;
}

export const DataGridProvider = <T,>({
  children,
  data = [],
  columns,
  isLoading,
  isError,
}: DataGridProviderProps<T>) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!),
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    pin: false,
    'drag-handle': false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode: 'onChange',
    enableRowSelection: true,
    manualPagination: true,
    state: {
      columnFilters,
      globalFilter,
      columnOrder,
      rowSelection,
      pagination,
      columnVisibility,
    },
  });

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  const contextValue = useMemo(
    () => ({
      table,
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
    }),
    [
      table,
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
    ],
  );

  return (
    <DataGridContextt.Provider value={contextValue}>
      {children}
    </DataGridContextt.Provider>
  );
};

export function useDataGrid() {
  const context = useContext(
    DataGridContextt as React.Context<DataGridContexttValue<any> | null>,
  );

  if (!context) {
    throw new Error('useDataGrid must be used within a DataGridProvider');
  }
  return context;
}

export default DataGridContextt;
