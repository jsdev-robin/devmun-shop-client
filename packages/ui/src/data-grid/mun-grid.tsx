'use client';

import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { DataGridProvider } from './contexts/data-grid-contexts';
import ColumnDnd from './contexts/data-grid-column-dnd';
import MunGridMain from './mun-grid/mun-grid-main';
import MunGridRowNumber from './mun-grid/mun-grid-row-number';
import { useBreakpoint } from '../hooks/use-breakpoint';
import { breakpoints } from '../utils/breakpoints';
import Toolbar from './toolbar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
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
  data?: T[];
  columns: ColumnDef<T>[];
  isError: boolean;
  isLoading: boolean;
  getQuery?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

const MunGrid = <T,>({
  data,
  columns,
  isError,
  isLoading,
  getQuery,
}: MunGridProps<T>) => {
  const sm = !useBreakpoint(breakpoints.sm);
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      getQuery={getQuery}
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
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunGrid;
