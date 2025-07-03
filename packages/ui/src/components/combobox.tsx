'use client';

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Button } from './button';
import { cn } from '../lib/utils';

interface ComboboxProps {
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options = [],
  onChange,
  defaultValue = '',
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(className)}
        >
          {value ? (
            options.find((option) => option.value === value)?.label
          ) : (
            <span className="text-muted-foreground font-normal">
              Select option...
            </span>
          )}
          <ChevronsUpDown className="text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          {options.length > 10 && (
            <CommandInput
              placeholder="Search option..."
              className="focus-within:ring-0 focus-within:border-none"
            />
          )}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    if (onChange) {
                      onChange(currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
