'use client';

import React from 'react';
import { Button } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import Text from '@repo/ui/components/text';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { Play } from 'lucide-react';
import { Badge } from '@repo/ui/components/badge';
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';
import { munCard } from '../../ui/mun-shop';
import AddToWishlist from '../../ui/product/AddToWishlist';

const products = [
  {
    id: 1,
    src: '/images/gifts/01.jpg',
    price: 'USD 12.37',
  },
  {
    id: 2,
    src: '/images/gifts/02.jpg',
    price: 'USD 12.37',
  },
  {
    id: 3,
    src: '/images/gifts/03.jpg',
    videoSrc:
      'https://res.cloudinary.com/dft8nx292/video/upload/v1750653454/qziagd8thscm2f135adu.mp4',
    price: 'USD 12.37',
  },
  {
    id: 4,
    src: '/images/gifts/04.jpg',
    price: 'USD 12.37',
    oldPrice: 'USD 15.99',
  },
  {
    id: 5,
    src: '/images/gifts/05.jpg',
    videoSrc:
      'https://res.cloudinary.com/dft8nx292/video/upload/v1750653449/wo53hpgidlff5k2wlohq.mp4',
    price: 'USD 12.37',
  },
  {
    id: 6,
    src: '/images/gifts/06.jpg',
    price: 'USD 12.37',
  },
];

const HomeShopGift = () => {
  const isSm = useBreakpoint(640);

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="grid gap-4 items-center grid-cols-2 lg:grid-cols-4">
            <div className="col-span-full sm:col-span-1 lg:col-span-2">
              <div className="space-y-2">
                <Heading as="h4">The Linen Shop</Heading>
                <Text className="hidden sm:block md:w-3/5">
                  Treat yourself to these easy, breezy designs that make every
                  day feel like a holiday.
                </Text>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full hidden sm:flex"
                >
                  Shop these unique finds
                </Button>
              </div>
            </div>
            {products.map((item, i) => (
              <article
                key={item.id}
                className={cn(
                  munCard({ focusRing: 'default' }),
                  'relative overflow-hidden rounded-xl group',
                )}
              >
                <Link
                  href="/"
                  className="absolute inset-0 w-full h-full z-10"
                />
                <Image
                  src={item.src}
                  alt={''}
                  width={600}
                  height={600}
                  blurDataURL={rgbDataURL(i)}
                  placeholder="blur"
                  loading="lazy"
                  className={cn(
                    'w-full h-full object-cover rounded-xl aspect-square transition-all duration-500 group-hover:scale-105',
                    item.videoSrc ? 'group-hover:hidden' : null,
                  )}
                />

                {item.videoSrc && (
                  <video
                    onMouseEnter={(e) => {
                      e.currentTarget.muted = true;
                      e.currentTarget.play().catch((error) => {
                        console.warn('Video play was prevented:', error);
                      });
                    }}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    width="100%"
                    height="100%"
                    controls={false}
                    className="w-full h-full rounded-xl aspect-square object-cover hidden group-hover:block"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                    <source src={item.videoSrc} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <AddToWishlist />
                <div className="absolute bottom-2 left-2 translate-y-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0 z-10 max-xl:touch:opacity-100 max-xl:touch:translate-y-0">
                  <Badge
                    variant="secondary"
                    className="font-semibold border border-foreground"
                  >
                    {item.price}{' '}
                    {item.oldPrice && (
                      <del className="text-muted-foreground">
                        {item.oldPrice}
                      </del>
                    )}
                  </Badge>
                </div>

                {item.videoSrc && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute right-2 bottom-2 rounded-full size-7 z-20"
                  >
                    <Play />
                  </Button>
                )}
              </article>
            ))}
          </div>
          {isSm && (
            <div className="w-full flex items-center justify-center">
              <Button size="lg" variant="secondary" className="rounded-full">
                Shop these unique finds
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeShopGift;
