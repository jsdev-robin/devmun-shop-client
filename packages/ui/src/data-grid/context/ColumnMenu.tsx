'use client';

import React, { useState } from 'react';
import {
  DotsVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import { Button } from '../../components/button';
import { Header } from '@tanstack/react-table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/popover';
import { Separator } from '../../components/separator';
import { PinIcon, PinOff } from 'lucide-react';
import { useDataLayoutContext } from '../context/data-layout-context';
import { cn } from '../../lib/utils';
import { Fab } from '../../components/fab';

const ColumnMenu = <T,>({
  header,
  className,
}: {
  header: Header<T, unknown>;
  className?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSorted = header.column.getIsSorted();
  const { isError, isLoading } = useDataLayoutContext();

  return header.column.getCanFilter() ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Fab
          size="xs"
          variant="ghost"
          disabled={isError || isLoading}
          className={cn(
            'hover:bg-card cursor-pointer data-[state=open]:opacity-100 data-[state=open]:bg-card',
            className,
          )}
        >
          <DotsVerticalIcon />
        </Fab>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 p-1.5">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'w-full justify-start',
            isSorted === 'asc' ? 'bg-accent' : '',
          )}
          onClick={() => {
            header.column.toggleSorting(false);
            setOpen(false);
          }}
          disabled={!header.column.getCanSort()}
        >
          <ArrowUpIcon />
          Sort ASC
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'w-full justify-start',
            isSorted === 'desc' ? 'bg-accent' : '',
          )}
          onClick={() => {
            header.column.toggleSorting(true);
            setOpen(false);
          }}
          disabled={!header.column.getCanSort()}
        >
          <ArrowDownIcon />
          Sort DESC
        </Button>
        {!header.isPlaceholder && header.column.getCanPin() && (
          <>
            <Separator className="my-1.5" />

            {header.column.getIsPinned() !== 'left' && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  header.column.pin('left');
                  setOpen(false);
                }}
              >
                <PinIcon className="rotate-45" />
                Pin to left
              </Button>
            )}
            {header.column.getIsPinned() && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  header.column.pin(false);
                  setOpen(false);
                }}
              >
                <PinOff />
                Unpin
              </Button>
            )}
            {header.column.getIsPinned() !== 'right' && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  header.column.pin('right');
                  setOpen(false);
                }}
              >
                <PinIcon className="-rotate-45" />
                Pin to right
              </Button>
            )}
          </>
        )}
        <Separator className="my-1.5" />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => {
            header.column.toggleVisibility(false);
            setOpen(false);
          }}
          disabled={!header.column.getCanHide()}
        >
          <EyeNoneIcon />
          Hide column
        </Button>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default ColumnMenu;
