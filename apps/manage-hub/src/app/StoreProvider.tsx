'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../lib/features/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
