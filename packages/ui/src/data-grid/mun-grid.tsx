'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataGridProvider } from './contexts/data-grid-contexts';
import ColumnDnd from './contexts/data-grid-column-dnd';
import MunGridMain from './mun-grid/mun-grid-main';

interface MunGridProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

const MunGrid = <T,>({
  data,
  columns,
  isError,
  isLoading,
}: MunGridProps<T>) => {
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
    >
      <ColumnDnd>
        <div className="space-y-3 relative">
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            <div className="overflow-hidden flex-1">
              <MunGridMain />
            </div>
          </div>
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunGrid;
