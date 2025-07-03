'use client';

import React from 'react';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Badge } from '@repo/ui/components/badge';
import Text from '@repo/ui/components/text';
import Heading from '@repo/ui/components/heading';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';
import { munCard } from '../../ui/mun-shop';
import AddToWishlist from '../../ui/product/AddToWishlist';

const products = [
  {
    id: 1,
    imageSrc: '/images/gifts/07.jpg',
    videoSrc:
      'https://res.cloudinary.com/dft8nx292/video/upload/v1750653449/wo53hpgidlff5k2wlohq.mp4',
    price: 'USD 14.82',
    alt: 'A handcrafted wooden jewelry box',
  },
  {
    id: 2,
    imageSrc: '/images/gifts/08.jpg',
    price: 'USD 11.29',
    alt: 'A soft plush teddy bear',
  },
  {
    id: 3,
    imageSrc: '/images/gifts/10.jpg',
    videoSrc:
      'https://res.cloudinary.com/dft8nx292/video/upload/v1750653454/qziagd8thscm2f135adu.mp4',
    price: 'USD 18.65',
    alt: 'A handmade ceramic coffee mug',
  },
  {
    id: 4,
    imageSrc: '/images/gifts/10.jpg',
    price: 'USD 13.47',
    oldPrice: 'USD 16.99',
    alt: 'A vintage-style pocket watch',
  },
  {
    id: 5,
    imageSrc: '/images/gifts/11.jpg',
    price: 'USD 19.23',
    alt: 'A customized leather wallet',
  },
  {
    id: 6,
    imageSrc: '/images/gifts/12.jpg',
    price: 'USD 12.74',
    alt: 'A scented candle in a decorative jar',
  },
  {
    id: 7,
    imageSrc: '/images/gifts/13.jpg',
    price: 'USD 17.36',
    alt: 'A handcrafted wooden photo frame',
  },
];

const HomeAnyBudget = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="md:col-span-2">
            <Text textColor="muted">Editors’ Picks</Text>
            <Heading as="h4">Original Finds for Any Budget</Heading>
          </div>
          {products.map((item, i) => (
            <article
              className={cn(
                munCard({ focusRing: 'default' }),
                'relative overflow-hidden rounded-xl group',
                i === 2 && 'lg:col-span-2 lg:row-span-2',
              )}
              key={item.id}
            >
              <Link
                href="/"
                className="absolute inset-0 size-full z-10"
                aria-hidden="true"
              />
              <Image
                src={item.imageSrc}
                alt={item.alt}
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
                    <del className="text-muted-foreground">{item.oldPrice}</del>
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
      </div>
    </section>
  );
};

export default HomeAnyBudget;
