'use client';

import React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@repo/ui/components/navigation-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import { NavbarLinks } from './particles/NavbarLinks';

const SellerNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b py-2 bg-muted/50 hidden lg:block">
      <div className="container">
        <div className="flex items-center gap-2">
          {NavbarLinks.map((item, i) => (
            <NavigationMenu key={i}>
              <NavigationMenuList>
                {item.submenu ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-52 gap-4">
                        <li>
                          {item.submenu?.map((sub, j) => (
                            <NavigationMenuLink
                              asChild
                              key={j}
                              active={pathname === sub.href}
                            >
                              <Link href={sub.href}>{sub.label}</Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent',
                        pathname === item.href && 'bg-muted',
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;
