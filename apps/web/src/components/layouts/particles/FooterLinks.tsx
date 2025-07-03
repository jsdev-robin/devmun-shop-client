"use client";

import React from "react";
import Heading from "@repo/ui/components/heading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainLogo from "@repo/ui/components/main-logo";
import { cn } from "@repo/ui/lib/utils";

const footerItems = [
  {
    heading: "Shop",
    links: [
      { label: "Gift cards", href: "/gift-cards" },
      { label: "MUN Registry", href: "/registry" },
      { label: "Sitemap", href: "/sitemap" },
      { label: "MUN blog", href: "/blog" },
      { label: "MUN United Kingdom", href: "/uk" },
      { label: "MUN Germany", href: "/de" },
      { label: "MUN Canada", href: "/ca" },
    ],
  },
  {
    heading: "Sell",
    links: [
      { label: "Sell on MUN", href: "/ecommerce/dashboard/sign-in" },
      { label: "Teams", href: "/teams" },
      { label: "Forums", href: "/forums" },
      { label: "Affiliates & Creators", href: "/affiliates" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "MUN, Inc.", href: "/about" },
      { label: "Policies", href: "/policies" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Impact", href: "/impact" },
      { label: "Legal imprint", href: "/legal-imprint" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "Privacy settings", href: "/privacy-settings" },
    ],
    socailLink: true,
  },
];

const FooterLinks = () => {
  const pathName = usePathname();

  return (
    <div className="grid lg:grid-cols-3">
      <div className="lg:col-span-1 bg-blue-900 flex items-center justify-center">
        <MainLogo />
      </div>
      <div className="lg:col-span-2 p-4 lg:p-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
          {footerItems.map((section, index) => (
            <article key={index} className="space-y-4">
              <Heading className="text-white" as="h6">
                {section.heading}
              </Heading>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-white text-sm transition-all font-normal hover:underline",
                        pathName === link.href && "underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
