'use client';

import React from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { cn } from '../../lib/utils';

const ColumnSort = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <div
      className={cn(
        'flex items-center',
        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
      )}
      onClick={header.column.getToggleSortingHandler()}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
    >
      <span className="truncate capitalize">
        {flexRender(header.column.columnDef.header, header.getContext())}
      </span>
      {{
        asc: <ChevronUpIcon />,
        desc: <ChevronDownIcon />,
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default ColumnSort;
