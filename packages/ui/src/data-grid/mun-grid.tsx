'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataGridProvider } from './contexts/data-grid-contexts';
import ColumnDnd from './contexts/data-grid-column-dnd';
import MunGridMain from './mun-grid/mun-grid-main';
import MunGridRowNumber from './mun-grid/mun-grid-row-number';
import { useBreakpoint } from '../hooks/use-breakpoint';
import { breakpoints } from '../utils/breakpoints';
import Toolbar from './toolbar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Pagination from './pagination';
import { PaginationState } from '@tanstack/react-table';
const MunGridSplitLeft = dynamic(
  () => import('./mun-grid/mun-grid-split-left'),
  {
    ssr: false,
  },
);
const MunGridSplitRight = dynamic(
  () => import('./mun-grid/mun-grid-split-right'),
  { ssr: false },
);

interface MunGridProps<T> {
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
}

const MunGrid = <T,>({
  data,
  columns,
  isError,
  isLoading,
  pagination = [20, 30, 40, 50, 60, 70, 80, 90, 100],
  setParams,
}: MunGridProps<T>) => {
  const sm = !useBreakpoint(breakpoints.sm);
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      setParams={setParams}
    >
      <ColumnDnd>
        <div className="space-y-3 relative">
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            <Suspense>
              <MunGridSplitLeft />
            </Suspense>
            {sm && <MunGridRowNumber />}
            <div className="overflow-hidden flex-1">
              <MunGridMain />
            </div>
            <Suspense>
              <MunGridSplitRight />
            </Suspense>
            {sm && <Toolbar />}
          </div>
          <Pagination pagination={pagination} />
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunGrid;
