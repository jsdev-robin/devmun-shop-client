'use client';

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
import { GridProps } from '../types/grid-types';

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

const MunGrid = <T,>({
  data,
  columns,
  isError,
  isLoading,
  toolbar = {
    active: true,
    open: null,
  },
  isSplit,
  pin,
}: GridProps<T>) => {
  const sm = !useBreakpoint(breakpoints.sm);
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      isSplit={isSplit}
      pin={pin}
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
            {toolbar.active && sm && <Toolbar open={toolbar.open} />}
          </div>
          <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunGrid;
