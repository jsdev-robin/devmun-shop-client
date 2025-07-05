'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { FlexTable, Tbody, Tr } from '../../components/flex-table';
import MunGridTd from './mun-grid-td';
import MunGridError from './mun-grid-error';
import MunGridLoadingSkeleton from './mun-grid-loading-skeleton';
import MunGridNoData from './mun-grid-no-data';

const MunGridBody = () => {
  const { table, columnOrder, cellRef, split, isError, isLoading } =
    useDataGrid();

  return (
    <FlexTable>
      {isError ? (
        <MunGridError />
      ) : isLoading ? (
        <MunGridLoadingSkeleton />
      ) : !isError && !isLoading && table.getRowModel().rows.length === 0 ? (
        <MunGridNoData />
      ) : (
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              ref={cellRef}
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
            >
              {(split ? row.getCenterVisibleCells() : row.getVisibleCells())
                .filter((cell) => !['rowNumber'].includes(cell.column.id))
                .map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder || []}
                    strategy={horizontalListSortingStrategy}
                  >
                    <MunGridTd key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
            </Tr>
          ))}
        </Tbody>
      )}
    </FlexTable>
  );
};

export default MunGridBody;
