'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { DataLayoutProvider } from './context/data-layout-context';
import MainGrid from './mun-grid/particles/MainGrid';
import ColumnDnd from './context/column-dnd';
import Toolbar from './toolbar/Index';
import GridRowNumber from './mun-grid/particles/GridRowNumber';

interface MunGridProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

const MunGrid = <T,>({
  data = [],
  columns,
  isError,
  isLoading,
}: MunGridProps<T>) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!),
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    pin: false,
    'drag-handle': false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    columnResizeMode: 'onChange',
    state: {
      columnOrder,
      sorting,
      columnVisibility,
      columnFilters,
    },
  });

  return (
    <DataLayoutProvider
      table={table}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
      isError={isError}
      isLoading={isLoading}
    >
      <ColumnDnd>
        <div>
          <div className="space-y-3 relative">
            <div className="flex bg-muted rounded-md overflow-hidden border border-border">
              <GridRowNumber />
              <div className="overflow-hidden flex-1">
                <MainGrid />
              </div>
              <Toolbar />
            </div>
          </div>
        </div>
      </ColumnDnd>
    </DataLayoutProvider>
  );
};

export default MunGrid;
