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
import { useElementDimensions } from '../hooks/useElementDimensions';
import { getAllLeafColumnIds } from '../../lib/getAllLeafColumnIds';

interface DataGridContexttValue<T> {
  table: Table<T>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading?: boolean;
  isError?: boolean;

  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  headerRef: (node: HTMLElement | null) => void;
  cellRef: (node: HTMLElement | null) => void;
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
    getAllLeafColumnIds(columns),
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
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
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
    defaultColumn: {
      minSize: 180,
    },
  });

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const { ref: cellRef } = useElementDimensions({ h: '--cell-h' });
  const { ref: headerRef } = useElementDimensions({ h: '--header-h' });

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  const contextValue = useMemo(
    () => ({
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      cellRef,
      headerRef,
    }),
    [
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      cellRef,
      headerRef,
    ],
  );

  return (
    <DataGridContextt.Provider
      value={{
        ...contextValue,
        table,
      }}
    >
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
