import Heading from '@repo/ui/components/heading';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@repo/ui/components/text';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';

const specialItems = [
  {
    id: 1,
    imageSrc: '/images/products/56.jpg',
    title: 'Personalised Jewellery',
    discount: 'up to 30% off',
  },
  {
    id: 2,
    imageSrc: '/images/products/57.jpg',
    title: 'Home Improvement',
    discount: 'up to 20% off',
  },
  {
    id: 3,
    imageSrc: '/images/products/58.jpg',
    title: 'Trending: Cherry Red finds',
    discount: 'up to 20% off',
  },
  {
    id: 4,
    imageSrc: '/images/products/59.jpg',
    title: 'Downloadable Party Supplies',
    discount: 'up to 25% off',
  },
  {
    id: 5,
    imageSrc: '/images/products/60.jpg',
    title: 'Birthstone Jewellery',
    discount: 'up to 30% off',
  },
];

const HomeSpecialPrice = () => {
  return (
    <section aria-labelledby="special-prices-heading">
      <div className="container">
        <div className="space-y-6">
          <Heading as="h4" id="special-prices-heading">
            Shop extraordinary items at special prices
          </Heading>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {specialItems.map((item, i) => (
              <article
                key={item.id}
                className="relative focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-8 focus-within:ring-offset-background sm:mun-card"
                aria-label={item.title}
              >
                <Link
                  href="/"
                  className="absolute inset-0 w-full h-full z-10"
                  title={item.title}
                  aria-label={`View details for ${item.title}`}
                />
                <div className="space-y-2">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={600}
                    height={600}
                    blurDataURL={rgbDataURL(i)}
                    placeholder="blur"
                    loading="lazy"
                    className="w-full h-full aspect-square object-cover rounded-xl"
                  />
                  <div>
                    <Text weight="semibold">{item.title}</Text>
                    <Text weight="semibold" aria-hidden="true">
                      {item.discount}
                    </Text>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSpecialPrice;
