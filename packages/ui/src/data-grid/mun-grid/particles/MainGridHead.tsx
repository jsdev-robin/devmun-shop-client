'use client';

import React from 'react';
import { useDataLayoutContext } from '../../context/data-layout-context';
import { FlexTable, Thead, Tr } from '../../../components/flex-table';
import GridTh from './GridTh';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

const MainGridHead = () => {
  const { table, columnOrder, headerRef } = useDataLayoutContext();

  return (
    <FlexTable ref={headerRef}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id} className="*:border-r *:border-border">
            <SortableContext
              items={columnOrder || []}
              strategy={horizontalListSortingStrategy}
            >
              {headerGroup.headers
                .filter((header) => !['rowNumber'].includes(header.column.id))
                .map((header) => (
                  <GridTh key={header.id} header={header} />
                ))}
            </SortableContext>
          </Tr>
        ))}
      </Thead>
    </FlexTable>
  );
};

export default MainGridHead;
