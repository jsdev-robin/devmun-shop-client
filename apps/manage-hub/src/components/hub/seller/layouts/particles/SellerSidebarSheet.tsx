'use client';

import React from 'react';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { ChevronDown, Ellipsis } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavbarLinks } from './NavbarLinks';
import { cn } from '@repo/ui/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const SellerSidebarSheet = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Ellipsis />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Explore Menu</SheetTitle>
            <SheetDescription>
              Navigate through sections and discover features tailored for you.
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <div className="px-4 py-10 h-full overflow-y-auto">
          {NavbarLinks.map((item, i) =>
            item.submenu ? (
              <Collapsible key={i}>
                <CollapsibleTrigger
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'lg' }),
                    'w-full justify-start',
                  )}
                >
                  <item.icon />
                  {item.label}
                  <ChevronDown className="ml-auto" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-2">
                  <div className="ml-4 border-l-2 border-border">
                    {item.submenu.map((sub, j) => (
                      <Link
                        key={j}
                        href="/"
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'w-full justify-start',
                          pathname === sub.href && 'bg-muted',
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                key={i}
                href="/"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'w-full justify-start',
                  pathname === item.href && 'bg-muted',
                )}
              >
                <item.icon />
                {item.label}
              </Link>
            ),
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SellerSidebarSheet;
