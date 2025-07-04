'use client';

import React from 'react';
import MainGridHead from './MainGridHead';
import MainGridBody from './MainGridBody';
import { useDataLayoutContext } from '../../context/data-layout-context';
import ColumnDnd from '../../context/column-dnd';

const MainGrid = () => {
  const { paneRef1, paneRef2 } = useDataLayoutContext();
  return (
    <ColumnDnd>
      <div
        className="w-full bg-muted border-b border-border overflow-y-scroll firefox:overflow-x-hidden not-firefox:[&::-webkit-scrollbar]:h-0 firefox:[scrollbar-color:transparent_transparent]"
        ref={paneRef1}
      >
        <MainGridHead />
      </div>
      <div
        className="h-[75svh] lg:h-[75vh] overflow-scroll bg-background"
        ref={paneRef2}
      >
        <MainGridBody />
      </div>
    </ColumnDnd>
  );
};

export default MainGrid;
