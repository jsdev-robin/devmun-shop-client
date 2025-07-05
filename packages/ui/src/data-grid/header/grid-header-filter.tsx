'use client';

import React from 'react';
import { Column } from '@tanstack/react-table';
import { Input } from '../../components/input';

const GridHeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  return column.getCanFilter() ? (
    <div className="p-1.5 border-t border-border w-full">
      <Input />
    </div>
  ) : null;
};

export default GridHeaderFilter;
