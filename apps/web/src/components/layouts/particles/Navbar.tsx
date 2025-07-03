import React from 'react';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import { buttonVariants } from '@repo/ui/components/button';
import { Book, Gift, PackagePlus, Percent, Shirt, ThumbsUp } from 'lucide-react';

const menuItems = [
  { label: 'Sales', href: '/', icon: Percent },
  { label: 'Best sellers', href: '/featured/hub?sales=seller_deal', icon: ThumbsUp },
  { label: 'New Arrivals', href: '/featured/hub?sales=seller_deal', icon: PackagePlus },
  { label: 'Books', href: '/featured/hub?sales=seller_deal', icon: Book },
  { label: 'Cloths', href: '/featured/hub?sales=seller_deal', icon: Shirt },
  { label: 'Gift', href: '/featured/hub?sales=seller_deal', icon: Gift },
];

const Navbar = () => {
  return (
    <nav className="border-b-2 py-2 hidden lg:block">
      <div className="container">
        <div className="flex items-center justify-center gap-2">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} className={cn(buttonVariants({ variant: 'ghost' }), 'rounded-full')}>
              <Icon />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
