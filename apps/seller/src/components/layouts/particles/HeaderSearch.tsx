'use client';

import React, { useEffect } from 'react';
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@repo/ui/components/command';
import { Button } from '@repo/ui/components/button';
import { useAppContext } from '../../../contexts/app-context';

const HeaderSearch = () => {
  const { commandSearchOpen, setCommandSearchOpen } = useAppContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setCommandSearchOpen]);

  return (
    <>
      <Button
        variant="secondary"
        className="w-full cursor-text font-normal text-muted-foreground"
        onFocus={() => {
          setCommandSearchOpen(true);
        }}
      >
        <Search />
        Search or type a command
        <p className="ml-auto">
          Press{' '}
          <kbd className="pointer-events-none inline-flex items-center gap-1 select-none">
            <span>⌘</span>J
          </kbd>
        </p>
      </Button>
      <CommandDialog
        open={commandSearchOpen}
        onOpenChange={setCommandSearchOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default HeaderSearch;
