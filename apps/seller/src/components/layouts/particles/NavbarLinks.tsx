import { ShoppingCart, Package, ClipboardList, Star, Percent, Store } from 'lucide-react';

export const NavbarLinks = [
  {
    label: 'Overview',
    href: '/seller/dashboard',
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    icon: Package,
    submenu: [
      { label: 'Overview', href: '/seller/dashboard/product/list' },
      { label: 'Add Product', href: '/seller/dashboard/product/create' },
    ],
  },
  {
    label: 'Orders',
    icon: ClipboardList,
    submenu: [
      { label: 'Overview', href: '/seller/dashboard/order/list' },
      {
        label: 'Purchase Orders',
        href: '/seller/dashboard/order/purchase-orders',
        badge: { content: 'New', className: 'bg-primary/25 text-primary' },
      },
      {
        label: 'Order Details',
        href: '/seller/dashboard/order/details/dfdfdf',
      },
    ],
  },
  {
    label: 'Reviews',
    href: '/seller/dashboard/review/list',
    icon: Star,
  },
  {
    label: 'Discounts',
    href: '/seller/dashboard/discounts',
    icon: Percent,
  },
  {
    label: 'Store',
    icon: Store,
    submenu: [
      { label: 'Overview', href: '/seller/dashboard/store' },
      { label: 'Payouts', href: '/' },
    ],
  },
];
