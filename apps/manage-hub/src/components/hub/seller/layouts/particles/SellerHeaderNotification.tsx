import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@repo/ui/components/button';

const SellerHeaderNotification = () => {
  return (
    <Button variant="ghost" size="icon" className="relative z-[99999]">
      <Bell />
      <span className="flex absolute top-0 end-0 -mt-0.5 -me-1">
        <span className="animate-ping absolute inline-flex size-full rounded-full bg-red-600" />
        <span className="relative inline-flex items-center justify-center text-xs bg-red-500 rounded-full size-4.5">
          9
        </span>
      </span>
    </Button>
  );
};

export default SellerHeaderNotification;
