'use client';

import React from 'react';
import { Card } from '@repo/ui/components/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/carousel';
import Heading from '@repo/ui/components/heading';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Text from '@repo/ui/components/text';
import Rating from '@repo/ui/components/rating';
import { Badge } from '@repo/ui/components/badge';
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint';
import { useCountdown } from '@repo/ui/hooks/use-countdown';
import ApiError from '@repo/ui/components/api-error';
import { Skeleton } from '@repo/ui/components/skeleton';
import SkeletonHeading from '@repo/ui/components/skeleton-heading';
import ClockIcon from '@repo/ui/icons/Clock';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';
import Link from 'next/link';
import { breakpoints } from '@repo/ui/utils/breakpoints';
import AddToWishlist from '../../ui/product/AddToWishlist';

const products = [
  {
    title:
      'BOOK STAMP | Custom library Stamp | Embosser Stamp | From the Library of Stamp | Book Lover | Personalized Stamp | Book EMBOSSER',
    rating: 4.9,
    salePrice: 83245.39,
    originalPrice: 11.99,
    discountPercent: 30,
    freeDelivery: true,
    highlight: null,
    image: { src: '/images/products/30.jpg', alt: 'BOOK STAMP' },
  },
  {
    title:
      'Goose Soft Toy Sewing Pattern, instant download PDF format, step by step photo tutorial included',
    rating: 4.9,
    salePrice: 3.25,
    originalPrice: 4.39,
    discountPercent: 26,
    freeDelivery: false,
    highlight: null,
    image: {
      src: '/images/products/31.jpg',
      alt: 'Goose Soft Toy Sewing Pattern',
    },
  },
  {
    title:
      'Elegant Minimal Wedding Guest Book, Minimalist Custom Wedding Hardcover Photo Album, Rose Gold, Gold, Silver Foil, Beige Album - Jane',
    rating: 5.0,
    salePrice: 22.0,
    originalPrice: 29.34,
    discountPercent: 25,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: {
      src: '/images/products/32.jpg',
      alt: 'Elegant Minimal Wedding Guest Book',
    },
  },
  {
    title:
      'Personalized CHEF KNIFE Housewarming Kitchen Cooking BBQ Home Groomsmen Gift for Her Mom Women Dad Men Unique Birthday Custom Engraved',
    rating: 4.8,
    salePrice: 34.99,
    originalPrice: 46.65,
    discountPercent: 25,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/33.jpg', alt: 'Personalized CHEF KNIFE' },
  },
  {
    title:
      'Personalized Ring Box Engraved Monogram Custom Engraving Initials Wedding Ring box Engagement Ring Box Proposal Ring Box',
    rating: 4.9,
    salePrice: 18.75,
    originalPrice: 25.0,
    discountPercent: 25,
    freeDelivery: true,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/34.jpg', alt: 'Personalized Ring Box' },
  },
  {
    title:
      'Personalized Name Puzzle With Pegs | New Christmas Gifts for Kids Wooden Toys Baby Shower Custom Toddler Toys First Birthday 1st Gifts',
    rating: 4.8,
    salePrice: 2.99,
    originalPrice: 9.98,
    discountPercent: 70,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/35.jpg', alt: 'Personalized Name Puzzle' },
  },
  {
    title:
      'Personalised Dummy Clip, Silicone, Wooden Dummy Chain, Personalised Baby Gift, Baby Girl Gift, Baby Boy Gift, Personalised, Baby Shower',
    rating: 4.9,
    salePrice: 12.66,
    originalPrice: 16.88,
    discountPercent: 25,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/36.jpg', alt: 'Personalised Dummy Clip' },
  },
  {
    title:
      'Mini Custom Watercolor Pet Portrait, Cat Portraits from Photos,Cat Portraits From Photos, Pet Painting, Custom Tiny Paintings, Miniature',
    rating: 4.9,
    salePrice: 18.37,
    originalPrice: 26.25,
    discountPercent: 30,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: {
      src: '/images/products/37.jpg',
      alt: 'Mini Custom Watercolor Pet Portrait',
    },
  },
  {
    title:
      'First Birthday Name Puzzle Personalized Busy Board Baby Gift for Kids 1 year old Baby toys',
    rating: 4.8,
    salePrice: 34.86,
    originalPrice: 99.6,
    discountPercent: 65,
    freeDelivery: false,
    highlight: null,
    image: {
      src: '/images/products/38.jpg',
      alt: 'First Birthday Name Puzzle',
    },
  },
  {
    title:
      'Dainty Freshwater Pearl Bracelet, Real Pearl Beaded Bracelet, Silver Bridal Bracelet, Minimalist Bracelet, Bridesmaid Gift',
    rating: 4.8,
    salePrice: 20.45,
    originalPrice: 68.17,
    discountPercent: 70,
    freeDelivery: true,
    highlight: 'Biggest sale in 60+ days',
    image: {
      src: '/images/products/39.jpg',
      alt: 'Dainty Freshwater Pearl Bracelet',
    },
  },
  {
    title:
      'Custom Leather Keychain with Name | Handmade Personalized Gift for Him or Her',
    rating: 4.7,
    salePrice: 6.5,
    originalPrice: 12.99,
    discountPercent: 50,
    freeDelivery: false,
    highlight: null,
    image: { src: '/images/products/40.jpg', alt: 'Custom Leather Keychain' },
  },
  {
    title:
      'Engraved Wooden Watch | Anniversary Gift for Men | Personalized Timepiece',
    rating: 4.6,
    salePrice: 49.99,
    originalPrice: 89.99,
    discountPercent: 44,
    freeDelivery: true,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/41.jpg', alt: 'Engraved Wooden Watch' },
  },
  {
    title:
      'Modern Wall Art Printable Set of 3 | Minimal Abstract Digital Prints',
    rating: 4.9,
    salePrice: 5.99,
    originalPrice: 11.99,
    discountPercent: 50,
    freeDelivery: true,
    highlight: null,
    image: { src: '/images/products/42.jpg', alt: 'Modern Wall Art Printable' },
  },
  {
    title: 'Rustic Ceramic Coffee Mug | Handmade Pottery | Unique Glazed Cup',
    rating: 5.0,
    salePrice: 15.75,
    originalPrice: 22.5,
    discountPercent: 30,
    freeDelivery: false,
    highlight: 'Biggest sale in 60+ days',
    image: { src: '/images/products/43.jpg', alt: 'Rustic Ceramic Coffee Mug' },
  },
  {
    title: 'Baby Monthly Milestone Blanket | Soft Fleece Newborn Photo Prop',
    rating: 4.8,
    salePrice: 18.0,
    originalPrice: 36.0,
    discountPercent: 50,
    freeDelivery: true,
    highlight: null,
    image: {
      src: '/images/products/44.jpg',
      alt: 'Baby Monthly Milestone Blanket',
    },
  },
];

const HomeBigDeals = () => {
  const isXlAndAbove = !useBreakpoint(breakpoints.xl);
  const isLgAndAbove = !useBreakpoint(breakpoints.lg);
  const isMdAndAbove = !useBreakpoint(breakpoints.md);
  const isSmAndAbove = !useBreakpoint(breakpoints.sm);
  const slidesToScroll = !isSmAndAbove
    ? 1
    : !isMdAndAbove
      ? 2
      : !isLgAndAbove
        ? 2
        : !isXlAndAbove
          ? 3
          : 4;

  const isLoading = false;
  const isError = false;

  const { formatTimeLeft, isFinished } = useCountdown({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  return isFinished ? null : (
    <section>
      <div className="container">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll,
            containScroll: 'keepSnaps',
          }}
          className="space-y-6"
        >
          <div className="flex items-center flex-wrap justify-between gap-4">
            {isLoading ? (
              <SkeletonHeading as="h4" />
            ) : (
              <div className="flex items-center flex-wrap gap-4">
                <Heading as="h4">Today&apos;s big deals</Heading>
                <div className="flex items-center text-muted-foreground gap-2">
                  <ClockIcon />
                  Fresh deals in{' '}
                  {isFinished ? (
                    <Text className="text-red-500">Deal expired!</Text>
                  ) : (
                    <>Ends in: {formatTimeLeft()}</>
                  )}
                </div>
              </div>
            )}
            {!isLoading && (
              <div className="items-center gap-4 hidden md:flex">
                <CarouselPrevious
                  className={cn(
                    "static [&_svg:not([class*='size-'])]:size-6 size-10 !shadow-4 -translate-y-0",
                  )}
                  disabled={isLoading || isError}
                />
                <CarouselNext
                  className={cn(
                    "static [&_svg:not([class*='size-'])]:size-6 size-10 !shadow-4 -translate-y-0",
                  )}
                  disabled={isLoading || isError}
                />
              </div>
            )}
          </div>
          <CarouselContent>
            {isError ? (
              <div className="flex items-center justify-center w-full">
                <ApiError />
              </div>
            ) : isLoading ? (
              [...Array(5)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-[calc(100%-100px)]  sm:basis-[calc(50%-16px)] md:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(25%-16px)] min-w-[calc(100%-100px)] sm:min-w-[calc(50%-16px)] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-16px)] xl:min-w-[calc(25%-16px)]"
                >
                  <Skeleton key={index} className="w-full h-90 rounded-xl" />
                </CarouselItem>
              ))
            ) : (
              <React.Fragment>
                {products.map((item, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-4 basis-[calc(100%-100px)]  sm:basis-[calc(50%-16px)] md:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(25%-16px)] min-w-[calc(100%-100px)] sm:min-w-[calc(50%-16px)] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-16px)] xl:min-w-[calc(25%-16px)]"
                  >
                    <div className="pb-4 h-full">
                      <Card className="p-0 relative overflow-hidden gap-0 flex flex-col h-full rounded-xl hover:shadow-4 group">
                        <Link
                          href="/listing/343/453453"
                          className="absolute inset-0 w-full h-full z-10"
                        />
                        <div className="w-full aspect-square relative">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={600}
                            height={600}
                            blurDataURL={rgbDataURL(i, {
                              enableAnimation: true,
                            })}
                            placeholder="blur"
                            loading="lazy"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>

                        <div className="p-2 flex flex-col flex-grow gap-1.5">
                          <div className="flex items-center justify-between gap-4">
                            <Text variant="sm" className="truncate">
                              {item.title}
                            </Text>
                            <Rating value={item.rating} displayMode="compact" />
                          </div>

                          <div className="flex items-center flex-wrap gap-2">
                            <Heading as="h6" className="text-green-700">
                              USD {item.salePrice.toFixed(2)}
                            </Heading>
                            <div className="flex items-center flex-wrap gap-2">
                              {item.originalPrice && (
                                <del className="text-muted-foreground text-sm">
                                  USD {item.originalPrice.toFixed(2)}
                                </del>
                              )}
                              {item.discountPercent && (
                                <Badge variant="offer" className="rounded-full">
                                  {item.discountPercent}% off
                                </Badge>
                              )}
                            </div>
                          </div>

                          {item.highlight && (
                            <Text variant="sm" weight="semibold">
                              {item.highlight}
                            </Text>
                          )}
                          {item.freeDelivery && (
                            <Text variant="sm">Free delivery</Text>
                          )}
                        </div>

                        <AddToWishlist />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </React.Fragment>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default HomeBigDeals;
