'use client';

import React from 'react';
import Heading from '@repo/ui/components/heading';
import Text from '@repo/ui/components/text';
import Image from 'next/image';
import Link from 'next/link';
import ApiError from '@repo/ui/components/api-error';
import { Skeleton } from '@repo/ui/components/skeleton';
import SkeletonHeading from '@repo/ui/components/skeleton-heading';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';

const data = [
  {
    title: 'Party Decor',
    image: {
      src: '/images/products/45.jpg',
      alt: 'Colorful party decorations including balloons and streamers',
    },
  },
  {
    title: 'Party Games',
    image: {
      src: '/images/products/46.jpg',
      alt: 'Exciting party games setup with cards and board games',
    },
  },
  {
    title: 'Patches',
    image: {
      src: '/images/products/47.jpg',
      alt: 'A collection of embroidered patches with various designs',
    },
  },
  {
    title: 'Gender-Neutral Adult Sweatshirts',
    image: {
      src: '/images/products/48.jpg',
      alt: 'Comfortable gender-neutral sweatshirts in various colors',
    },
  },
  {
    title: 'Pendant Necklaces',
    image: {
      src: '/images/products/49.jpg',
      alt: 'Stylish pendant necklaces with unique designs',
    },
  },
  {
    title: 'Digital Prints',
    image: {
      src: '/images/products/50.jpg',
      alt: 'Artistic digital prints displayed in a modern frame',
    },
  },
];

const HomeLoveShop = () => {
  const isError = false;
  const isLoading = false;
  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="space-y-2">
            {isLoading ? (
              <SkeletonHeading as="h4" />
            ) : (
              <React.Fragment>
                <Heading as="h4">Categories you&apos;ll love to shop</Heading>
                <Text variant="xs" textColor="muted">
                  Based on your activity
                </Text>
              </React.Fragment>
            )}
          </div>
          <div className="flex gap-8 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {isError ? (
              <ApiError />
            ) : isLoading ? (
              [...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-36 shrink-0 h-44 md:h-60 md:w-auto"
                />
              ))
            ) : (
              <React.Fragment>
                {data.map((item, i) => (
                  <Link
                    href="/"
                    key={i}
                    className="w-36 shrink-0 rounded-xl md:w-auto transition-all group"
                  >
                    <div className="space-y-2">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={600}
                        height={600}
                        sizes="(max-width: 899px) 33vw, 17vw"
                        blurDataURL={rgbDataURL(i)}
                        placeholder="blur"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl block mx-auto transition-all group-hover:shadow-2 aspect-[0.8] group-hover:shadow-4"
                      />
                      <Text weight="semibold">{item.title}</Text>
                    </div>
                  </Link>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLoveShop;
