'use client';

import React from 'react';
import MainLogo from '@repo/ui/components/main-logo';
import HeaderSearch from './particles/HeaderSearch';
import HeaderMenu from './particles/HeaderMenu';
import HeaderNotification from './particles/HeaderNotification';
import { Button } from '@repo/ui/components/button';
import { Search } from 'lucide-react';
import SidebarSheet from './particles/SidebarSheet';
import { useAppContext } from '../../contexts/app-context';

const Header = () => {
  const { setCommandSearchOpen } = useAppContext();

  return (
    <header className="py-2 border-b border-border bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-3">
          <div className="justify-self-start">
            <div className="flex items-center gap-2">
              <MainLogo />
              <SidebarSheet />
            </div>
          </div>
          <div className="justify-self-center w-full hidden lg:block">
            <HeaderSearch />
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
              <HeaderNotification />
              <HeaderMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
