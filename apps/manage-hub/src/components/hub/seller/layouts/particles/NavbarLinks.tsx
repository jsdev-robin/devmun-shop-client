import {
  ShoppingCart,
  Package,
  ClipboardList,
  Star,
  Percent,
  Store,
} from 'lucide-react';

export const NavbarLinks = [
  {
    label: 'Overview',
    href: '/',
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    icon: Package,
    submenu: [
      { label: 'Overview', href: '/seller/product/list' },
      { label: 'Add Product', href: '/seller/product/create' },
    ],
  },
  {
    label: 'Orders',
    icon: ClipboardList,
    submenu: [
      { label: 'Overview', href: '/order/list' },
      {
        label: 'Purchase Orders',
        href: '/order/purchase-orders',
        badge: { content: 'New', className: 'bg-primary/25 text-primary' },
      },
      {
        label: 'Order Details',
        href: '/order/details/dfdfdf',
      },
    ],
  },
  {
    label: 'Reviews',
    href: '/review/list',
    icon: Star,
  },
  {
    label: 'Discounts',
    href: '/discounts',
    icon: Percent,
  },
  {
    label: 'Store',
    icon: Store,
    submenu: [
      { label: 'Overview', href: '/store' },
      { label: 'Payouts', href: '/' },
    ],
  },
];
