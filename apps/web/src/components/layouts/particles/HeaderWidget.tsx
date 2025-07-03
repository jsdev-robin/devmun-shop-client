'use client';

import React from 'react';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import HeaderDropdown from './HeaderDropdown';

const HeaderWidget = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'lg' }),
          'rounded-full',
        )}
      >
        Sign in
      </Link>
      <Button variant="ghost" size="icon" className="rounded-full size-11">
        <User className="size-6" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full size-11">
        <Heart className="size-6" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full size-11">
        <ShoppingBag className="size-6" />
      </Button>
      <HeaderDropdown />
    </div>
  );
};

export default HeaderWidget;
