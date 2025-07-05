'use client';

import React from 'react';

import { useDataLayoutContext } from '../../context/data-layout-context';
import { FlexTable, Tbody, Tr } from '../../../components/flex-table';
import GridTd from './GridTd';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import GridLoadingSkeleton from './GridLoadingSkeleton';
import GridErrorSkeleton from './GridErrorSkeleton';
import GridNoData from './GridNoData';

const MainGridBody = () => {
  const { table, columnOrder, isError, isLoading } = useDataLayoutContext();

  return (
    <FlexTable>
      {isError ? (
        <GridErrorSkeleton />
      ) : isLoading ? (
        <GridLoadingSkeleton />
      ) : !isError && !isLoading && table.getRowModel().rows.length === 0 ? (
        <GridNoData />
      ) : (
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
            >
              {row
                .getVisibleCells()
                .filter((cell) => !['rowNumber'].includes(cell.column.id))
                .map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder || []}
                    strategy={horizontalListSortingStrategy}
                  >
                    <GridTd key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
            </Tr>
          ))}
        </Tbody>
      )}
    </FlexTable>
  );
};

export default MainGridBody;
