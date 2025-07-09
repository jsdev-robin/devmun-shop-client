'use client';

import React from 'react';
import MainLogo from '@repo/ui/components/main-logo';
import { useAppContext } from '../../../../contexts/app-context';
import SellerSidebarSheet from './particles/SellerSidebarSheet';
import SellerHeaderSearch from './particles/SellerHeaderSearch';
import { Button } from '@repo/ui/components/button';
import SellerHeaderNotification from './particles/SellerHeaderNotification';
import SellerHeaderMenu from './particles/SellerHeaderMenu';
import { Search } from 'lucide-react';

const SellerHeader = () => {
  const { setCommandSearchOpen } = useAppContext();

  return (
    <header className="py-2 border-b border-border bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-3">
          <div className="justify-self-start">
            <div className="flex items-center gap-2">
              <MainLogo />
              <SellerSidebarSheet />
            </div>
          </div>
          <div className="justify-self-center w-full hidden lg:block">
            <SellerHeaderSearch />
          </div>
          <div className="justify-self-end">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCommandSearchOpen(true);
                }}
                className="lg:hidden"
              >
                <Search />
              </Button>
              <SellerHeaderNotification />
              <SellerHeaderMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
