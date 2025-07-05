'use client';

import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { FlexTable, Tbody, Tr } from '../../components/flex-table';
import MunGridTd from './mun-grid-td';

const MunGridBody = () => {
  const { table, columnOrder } = useDataGrid();

  return (
    <FlexTable>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="*:border-r *:border-border h-10 data-[state=selected]:bg-blue-800/25"
          >
            {row
              .getVisibleCells()
              // .filter((cell) => !['rowNumber'].includes(cell.column.id))
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
    </FlexTable>
  );
};

export default MunGridBody;
