'use client';

import React from 'react';

import { useDataLayoutContext } from '../../context/data-layout-context';
import { FlexTable, Tbody, Tr } from '../../../components/flex-table';
import GridTd from './GridTd';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

const MainGridBody = () => {
  const { table, columnOrder } = useDataLayoutContext();
  return (
    <FlexTable>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
          >
            {row.getVisibleCells().map((cell) => (
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
    </FlexTable>
  );
};

export default MainGridBody;
