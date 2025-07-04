/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Table } from '@tanstack/react-table';
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useSyncScroll from '../hooks/useSyncScroll';
import { useElementDimensions } from '../hooks/useElementDimensions';

interface DataLayoutContextValue<T> {
  table: Table<T>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  paneRef7: React.RefObject<HTMLDivElement | null>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  split: boolean;
  setSplit: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  isError?: boolean;
  ref: (node: HTMLElement | null) => void;
  headerRef: (node: HTMLElement | null) => void;
}

const DataLayoutContext = createContext<DataLayoutContextValue<any> | null>(
  null,
);

interface DataLayoutProviderProps<T> {
  children?: React.ReactNode;
  table: Table<T>;
  columnOrder?: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  isSplit?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export const DataLayoutProvider = <T,>({
  children,
  table,
  columnOrder,
  setColumnOrder,
  globalFilter,
  setGlobalFilter,
  isSplit = false,
  isLoading,
  isError,
}: DataLayoutProviderProps<T>) => {
  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const paneRef7 = useRef<HTMLDivElement>(null);

  const [split, setSplit] = useState<boolean>(isSplit);
  const { ref } = useElementDimensions({ h: '--cell-h' });
  const { ref: headerRef } = useElementDimensions({ h: '--header-h' });

  useLayoutEffect(() => {
    setSplit(isSplit);
  }, [isSplit]);

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef4, paneRef6],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef5, paneRef7],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef2, paneRef3, paneRef6, paneRef7],
    axis: 'y',
  });

  const contextValue = useMemo(
    () => ({
      table,
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      paneRef7,
      columnOrder,
      setColumnOrder,
      globalFilter,
      setGlobalFilter,
      split,
      setSplit,
      isLoading,
      isError,
      ref,
      headerRef,
    }),
    [
      table,
      columnOrder,
      setColumnOrder,
      globalFilter,
      setGlobalFilter,
      split,
      setSplit,
      isLoading,
      isError,
      ref,
      headerRef,
    ],
  );

  return (
    <DataLayoutContext.Provider value={contextValue}>
      {children}
    </DataLayoutContext.Provider>
  );
};

export function useDataLayoutContext() {
  const context = useContext(
    DataLayoutContext as React.Context<DataLayoutContextValue<any> | null>,
  );

  if (!context) {
    throw new Error('useDataLayout must be used within a DataLayoutProvider');
  }
  return context;
}

export default DataLayoutContext;
