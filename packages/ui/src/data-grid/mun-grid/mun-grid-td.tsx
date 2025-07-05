'use client';

import React, { CSSProperties } from 'react';
import { Cell, flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Td } from '../../components/flex-table';
import { cn } from '../../lib/utils';
import { getPinStyles } from '../utils/getPinStyles';

const MunGridTd = <T,>({
  cell,
  className,
}: {
  cell: Cell<T, unknown>;
  className?: string;
}) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });
  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    zIndex: isDragging ? 1 : 0,
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    ...getPinStyles(cell.column),
  };

  return (
    <Td
      key={cell.id}
      className={cn('truncate h-full', className)}
      style={style}
      ref={setNodeRef}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Td>
  );
};

export default MunGridTd;
