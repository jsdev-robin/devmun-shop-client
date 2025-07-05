/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
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
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  paneRef7: React.RefObject<HTMLDivElement | null>;
  headerRef: (node: HTMLElement | null) => void;
  cellRef: (node: HTMLElement | null) => void;
  split: boolean;
  setSplit: React.Dispatch<React.SetStateAction<boolean>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
}

const DataGridContextt = createContext<DataGridContexttValue<any> | null>(null);

interface DataGridProviderProps<T> {
  children?: React.ReactNode;
  data?: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isError?: boolean;
  isSplit?: boolean;
  getQuery?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

export const DataGridProvider = <T,>({
  children,
  data = [],
  columns,
  isLoading,
  isError,
  isSplit = false,
  getQuery,
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

  console.log(columnFilters);

  useEffect(() => {
    if (getQuery) {
      getQuery(columnFilters);
    }
  }, [columnFilters, getQuery]);

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

  const [split, setSplit] = useState<boolean>(isSplit);

  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const paneRef7 = useRef<HTMLDivElement>(null);
  const { ref: cellRef } = useElementDimensions({ h: '--cell-h' });
  const { ref: headerRef } = useElementDimensions({ h: '--header-h' });

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef4, paneRef6],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef5, paneRef7],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef2, paneRef3, paneRef6, paneRef7],
    axis: 'y',
  });

  const contextValue = useMemo(
    () => ({
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
      cellRef,
      headerRef,
      split,
      setSplit,
      globalFilter,
      setGlobalFilter,
    }),
    [
      columnOrder,
      setColumnOrder,
      isLoading,
      isError,
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
      cellRef,
      headerRef,
      split,
      setSplit,
      globalFilter,
      setGlobalFilter,
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
