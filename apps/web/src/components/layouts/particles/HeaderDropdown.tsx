import React from 'react';
import { Button } from '@repo/ui/components/button';
import {
  CreditCard,
  Gift,
  LogOut,
  Mail,
  MapPinHouse,
  RotateCcw,
  ScanBarcode,
  ShoppingBag,
  User,
} from 'lucide-react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import Text from '@repo/ui/components/text';

const HeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-11">
          <Avatar>
            <AvatarImage src={undefined} className="object-cover" />
            <AvatarFallback>Robin Mind</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 max-h-[85vh] overflow-y-auto"
        align="end"
      >
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/your/account">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={undefined} className="object-cover" />
                <AvatarFallback>Ma</AvatarFallback>
              </Avatar>
              <div>
                <Text variant="body1" weight="medium">
                  Robin Mind
                </Text>
                <Text variant="body2">View your profile</Text>
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <User />
              <span>Personal Info</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <ShoppingBag />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <ScanBarcode />
              <span>Order Details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <MapPinHouse />
              <span>Addresses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <CreditCard />
              <span>Payment</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <Mail />
              <span>Email Newsletter</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <Gift />
              <span>Gift</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">
              <RotateCcw />
              <span>Returns</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
