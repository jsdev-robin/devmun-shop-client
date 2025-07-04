'use client';

import React, { CSSProperties } from 'react';
import { Cell, flexRender } from '@tanstack/react-table';
import { Td } from '../../../components/flex-table';

const GridTd = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const style: CSSProperties = {
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
  };

  return (
    <Td key={cell.id} className="truncate h-full" style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Td>
  );
};

export default GridTd;
