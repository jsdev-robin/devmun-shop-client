import React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";
import Heading from "./heading";

const MainLogo = ({
  className,
  asChild = false,
  href = "/",
}: {
  className?: string;
  asChild?: boolean;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn("inline-block text-primary font-bold", className)}
    >
      <Heading as="h4" asChild={asChild}>
        MUN
      </Heading>
    </Link>
  );
};

export default MainLogo;
