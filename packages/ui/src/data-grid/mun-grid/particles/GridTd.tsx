'use client';

import React, { CSSProperties } from 'react';
import { Cell, flexRender } from '@tanstack/react-table';
import { Td } from '../../../components/flex-table';
import { cn } from '../../../lib/utils';

const GridTd = <T,>({
  cell,
  className,
}: {
  cell: Cell<T, unknown>;
  className?: string;
}) => {
  const style: CSSProperties = {
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
  };

  return (
    <Td
      key={cell.id}
      className={cn('truncate h-full', className)}
      style={style}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Td>
  );
};

export default GridTd;
