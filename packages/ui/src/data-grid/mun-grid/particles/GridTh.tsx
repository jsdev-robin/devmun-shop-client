'use client';

import React, { CSSProperties } from 'react';
import { Header } from '@tanstack/react-table';
import { Th } from '../../../components/flex-table';
import ColumnSort from '../../common/ColumnSort';

const GridTh = <T,>({ header }: { header: Header<T, unknown> }) => {
  const style: CSSProperties = {
    width: header.column.getSize(),
    minWidth: header.column.getSize(),
  };

  return (
    <Th key={header.id} className="p-0 truncate group relative" style={style}>
      {header.isPlaceholder ? null : (
        <>
          <div className="space-y-2 w-full">
            <div className="p-2 flex items-center justify-between gap-2">
              <ColumnSort header={header} />
            </div>
          </div>
        </>
      )}
    </Th>
  );
};

export default GridTh;
