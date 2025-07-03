'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '../lib/utils';

interface DatePickerProps {
  onChange?: (value: Date | undefined) => void;
  value?: Date | string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (value) {
      const dateValue = typeof value === 'string' ? new Date(value) : value;
      setDate(dateValue);
    } else {
      setDate(undefined);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            if (onChange) onChange(value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
