"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/drawer";
import { Button } from "@repo/ui/components/button";
import { ChevronRight, EllipsisVertical } from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Toys & Games",
  "Beauty",
  "Sports",
  "Automotive",
  "Groceries",
  "Health",
  "Office Supplies",
  "Garden & Outdoors",
  "Music",
  "Movies & TV",
  "Pet Supplies",
  "Jewelry",
  "Shoes",
  "Bags & Luggage",
  "Furniture",
  "Baby Products",
  "Watches",
  "Tools & Hardware",
  "Cleaning Supplies",
  "Mobile Phones",
  "Computers",
  "Cameras",
  "Video Games",
  "Crafts & Sewing",
  "Travel Accessories",
  "Industrial & Scientific",
];

const HeaderCategoriesResponsive = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon">
          <EllipsisVertical />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Browse Categories</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="h-[65vh] overflow-y-auto">
          {categories.map((item, i) => (
            <Button key={i} variant="ghost" size="lg" className="w-full">
              {item}
              <ChevronRight className="ml-auto" />
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderCategoriesResponsive;
