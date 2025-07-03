import React from 'react';
import { Button } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@repo/ui/components/text';
import { cn } from '@repo/ui/lib/utils';
import ApiError from '@repo/ui/components/api-error';
import { Skeleton } from '@repo/ui/components/skeleton';
import { Card } from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import SkeletonText from '@repo/ui/components/skeleton-text';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';
import { munCard } from '../../ui/mun-shop';
import { HeartIcon } from 'lucide-react';

const featuredItems = [
  {
    title: 'Birthday Gift Card and Money Holders Holders Holders',
    image: { src: '/images/products/16.jpg', alt: 'Maritime Living' },
  },
  {
    title: 'Pop-up and Confetti Birthday Cards',
    image: {
      src: '/images/products/17.jpg',
      alt: 'Pop-up and Confetti Birthday Cards',
    },
  },
  {
    title: 'Camera Straps',
    image: { src: '/images/products/18.jpg', alt: 'Camera Straps' },
  },
];

const productCards = [
  {
    image: { src: '/images/products/19.jpg', alt: 'Product 19' },
    price: '21.90',
    originalPrice: '29.00',
  },
  {
    image: { src: '/images/products/20.jpg', alt: 'Product 20' },
    price: '18.50',
  },
  {
    image: { src: '/images/products/21.jpg', alt: 'Product 21' },
    price: '26.75',
    originalPrice: '33.50',
  },
  {
    image: { src: '/images/products/22.jpg', alt: 'Product 22' },
    price: '15.40',
  },
  {
    image: { src: '/images/products/23.jpg', alt: 'Product 23' },
    price: '31.20',
    originalPrice: '38.00',
  },
  {
    image: { src: '/images/products/24.jpg', alt: 'Product 24' },
    price: '22.10',
  },
];

const specialCards = [
  {
    title: 'Personalised Gifts',
    image: { src: '/images/products/25.jpg', alt: 'Personalised Gifts' },
  },
  {
    title: 'Gifts for Him',
    image: { src: '/images/products/26.jpg', alt: 'Gifts for Him' },
  },
  {
    title: 'Gifts for Her',
    image: { src: '/images/products/27.jpg', alt: 'Gifts for Her' },
  },
  {
    title: 'Gifts for Kids',
    image: { src: '/images/products/28.jpg', alt: 'Gifts for Kids' },
  },
  {
    title: 'Outdoor Decor',
    image: { src: '/images/products/29.jpg', alt: 'Outdoor Decor' },
  },
];

const HomeMunSpecial = () => {
  const isLoading = false;
  const isError = false;
  return (
    <section>
      <div className="container">
        <div className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
            {!isLoading && (
              <div className="col-span-full xl:col-span-1">
                <div className="flex items-center justify-between gap-4 flex-wrap xl:flex-none">
                  <Heading as="h4">Mun-special gifts for birthdays</Heading>
                  <Button
                    className="rounded-full"
                    variant="secondary"
                    size="lg"
                  >
                    Get inspired
                  </Button>
                </div>
              </div>
            )}
            {isError ? (
              <ApiError className="col-span-full" />
            ) : isLoading ? (
              [...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-44 rounded-xl lg:h-56"
                />
              ))
            ) : (
              <React.Fragment>
                {featuredItems.map(({ image, title }, i) => (
                  <Card
                    className={cn(
                      munCard({ focusRing: 'default', overlay: 'default' }),
                      'rounded-xl',
                    )}
                    key={i}
                  >
                    <Link
                      href="/"
                      className="absolute inset-0 w-full h-full z-10"
                      title={title}
                    />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={600}
                      sizes="(max-width: 639px) 100vw, (max-width: 899px) 60vw, (max-width: 1199px) 55vw, 40vw"
                      blurDataURL={rgbDataURL(i)}
                      placeholder="blur"
                      loading="lazy"
                      className="w-full h-full rounded-xl object-cover -z-10"
                    />
                    <div className="absolute bottom-0 left-0 p-2 w-full">
                      <Text weight="medium" className="text-white line-clamp-2">
                        {title}
                      </Text>
                    </div>
                  </Card>
                ))}
              </React.Fragment>
            )}
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {isError ? (
              <ApiError />
            ) : isLoading ? (
              [...Array(6)].map((_, index) => (
                <Skeleton key={index} className="w-full h-36 rounded-xl" />
              ))
            ) : (
              <React.Fragment>
                {productCards.map(({ image, price, originalPrice }, i) => (
                  <Card className="rounded-xl p-0 relative h-36 group" key={i}>
                    <Link
                      href="/"
                      className="absolute inset-0 w-full h-full z-10"
                    />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={600}
                      sizes="(max-width: 639px) 50vw, (max-width: 899px) 25vw, (max-width: 1199px) 20vw, 16vw"
                      blurDataURL={rgbDataURL(i)}
                      placeholder="blur"
                      loading="lazy"
                      className="max-w-full h-full rounded-xl object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        variant="secondary"
                        className="font-semibold border border-foreground"
                      >
                        USD {price}{' '}
                        {originalPrice && (
                          <del className="font-normal">USD {originalPrice}</del>
                        )}
                      </Badge>
                    </div>
                    <Button
                      variant="secondary"
                      size="icon"
                      className={cn(
                        'rounded-full size-8 border border-border hover:shadow-2 absolute top-2 right-2 translate-y-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0 z-10 max-xl:touch:opacity-100 max-xl:touch:translate-y-0',
                      )}
                    >
                      <HeartIcon />
                    </Button>
                  </Card>
                ))}
              </React.Fragment>
            )}
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <SkeletonText />
            ) : (
              <Text weight="semibold">Gifts as special as they are</Text>
            )}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {isError ? (
                <ApiError />
              ) : isLoading ? (
                [...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-24 rounded-xl" />
                ))
              ) : (
                <React.Fragment>
                  {specialCards.map((item, i) => (
                    <Link
                      key={i}
                      href="/"
                      className={cn(
                        'bg-card rounded-xl border shadow-sm p-2 hover:shadow-4',
                        munCard({ focusRing: 'default' }),
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={90}
                          height={90}
                          blurDataURL={rgbDataURL(i)}
                          placeholder="blur"
                          loading="lazy"
                          sizes="(max-width: 479px) 75px, (max-width: 639px) 102px, 90px"
                          className="rounded-xl object-cover aspect-square size-16 md:size-22"
                        />
                        <div className="flex-1">
                          <Text variant="sm" weight="semibold">
                            {item.title}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMunSpecial;
