"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import Heading from "@repo/ui/components/heading";
import { badgeVariants } from "@repo/ui/components/badge";
import Image from "next/image";

const tags = Array.from({ length: 100 }).map(
  (_, i, a) => `Searching.${a.length - i}`
);

const HeaderSearch = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="relative flex-1 z-50">
      <div className="relative w-full flex items-center">
        <Input
          type="search"
          className="h-12 rounded-tl-full rounded-bl-full border-2 border-r-0 border-foreground text-base placeholder:text-base px-4 dark:border-border"
          placeholder="Search for anything"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button
          className="w-12 h-12 border-2 border-foreground border-l-0 rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full block dark:border-border"
          variant="outline"
          size="icon"
        >
          <span
            className={cn(
              "bg-orange-500 inline-flex items-center justify-center w-10 h-10 rounded-full transition-all",
              hover
                ? "w-full h-full rounded-tl-none rounded-bl-none opacity-50"
                : null,
              focus
                ? "w-full h-full rounded-tl-none rounded-bl-none opacity-100"
                : null
            )}
          >
            <Search className="size-5 text-white" />
          </span>
        </Button>
      </div>
      {focus && (
        <div
          className="bg-popover border border-border shadow-4 absolute w-full h-full overflow-hidden min-h-80 max-h-[85vh] top-full z-50 rounded-lg mt-2"
          onMouseDown={(e) => e.preventDefault()}
        >
          {searchValue && searchValue.length !== 0 ? (
            <div className="w-full h-full py-4 overflow-y-auto">
              <div className="">
                {tags.map((tag) => (
                  <React.Fragment key={tag}>
                    <Link
                      href="/your/account"
                      className="block w-full p-4 font-medium hover:bg-accent"
                    >
                      {tag}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <ScrollArea className="w-full h-full py-4 overflow-y-auto">
              <div className="px-4">
                <Heading as="h6" className="mb-4">
                  Popular right now
                </Heading>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "rounded-full flex items-center gap-1 px-1 capitalize font-normal transition-all hover:opacity-85"
                    )}
                  >
                    <Image
                      src="/images/products/01.jpg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border"
                      priority
                    />
                    <span>womens clothes</span>
                  </Link>
                  <Link
                    href="/"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "rounded-full flex items-center gap-1 px-1 capitalize font-normal transition-all hover:opacity-85"
                    )}
                  >
                    <Image
                      src="/images/products/02.jpg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border"
                      priority
                    />
                    <span>womens clothes</span>
                  </Link>
                  <Link
                    href="/"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "rounded-full flex items-center gap-1 px-1 capitalize font-normal transition-all hover:opacity-85"
                    )}
                  >
                    <Image
                      src="/images/products/03.jpg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border"
                      priority
                    />
                    <span>womens clothes</span>
                  </Link>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
