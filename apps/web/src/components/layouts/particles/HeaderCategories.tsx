"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@repo/ui/components/menubar";
import { AlignJustify } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

const HeaderCategories = () => {
  return (
    <Menubar className="h-auto p-0 border-none">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant="ghost" size="lg" className="rounded-full">
            <AlignJustify />
            Categories
          </Button>
        </MenubarTrigger>
        <MenubarContent className="w-80 overflow-hidden p-0">
          <div className="max-h-[80vh] overflow-y-auto">
            {[
              "Accessories",
              "Art & Collectibles",
              "Baby",
              "Bags & Purses",
              "Bath & Beauty",
              "Books, Films & Music",
              "Clothing",
              "Craft Supplies & Tools",
              "Electronics & Accessories",
              "Gifts",
              "Home & Living",
              "Jewellery",
              "Paper & Party Supplies",
              "Pet Supplies",
              "Shoes",
              "Toys & Games",
              "Weddings",
            ].map((category, index) => (
              <React.Fragment key={index}>
                <MenubarItem
                  asChild
                  className="cursor-pointer px-4 rounded-none"
                >
                  <Link href={`/shop?={${category}}`}>{category}</Link>
                </MenubarItem>
              </React.Fragment>
            ))}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default HeaderCategories;
