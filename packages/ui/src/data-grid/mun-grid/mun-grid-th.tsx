'use client';

import React, { CSSProperties } from 'react';
import { Header } from '@tanstack/react-table';
import { Th } from '../../components/flex-table';
import GridHeaderSort from '../header/grid-header-sort';
import GridHeaderFilter from '../header/grid-header-filter';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../../lib/utils';
import { getPinStyles } from '../utils/getPinStyles';

const MunGridTh = <T,>({ header }: { header: Header<T, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: header.column.id,
  });
  const style: CSSProperties = {
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 10 : 0,
    width: header.column.getSize(),
    minWidth: header.column.getSize(),
    maxWidth: header.column.getSize(),
    ...getPinStyles(header.column),
  };

  return (
    <Th
      key={header.id}
      style={style}
      ref={setNodeRef}
      className={cn('p-0 truncate group relative', {
        'bg-card shadow-xl/30': isDragging,
      })}
    >
      {header.isPlaceholder ? null : (
        <>
          <div className="space-y-2 w-full">
            <div className="p-1.5 flex items-center justify-between gap-3">
              <GridHeaderSort header={header} />
            </div>
            <GridHeaderFilter column={header.column} />
          </div>
        </>
      )}
    </Th>
  );
};

export default MunGridTh;
