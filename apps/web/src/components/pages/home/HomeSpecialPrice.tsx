import Heading from '@repo/ui/components/heading';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@repo/ui/components/text';
import { rgbDataURL } from '@repo/ui/lib/rgbDataURL';
import { cn } from '@repo/ui/lib/utils';
import { ui } from '../../ui';

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
    <>
      <section>
        <div className="container">
          <div className="space-y-6">
            <Heading as="h4">
              Shop extraordinary items at special prices
            </Heading>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {specialItems.map((item, i) => (
                <article
                  key={item.id}
                  className={cn(ui({ focusRing: 'default' }), 'sm:mun-card')}
                >
                  <Link href="/" className="block w-full">
                    <div className="space-y-2">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        width={300}
                        height={300}
                        blurDataURL={rgbDataURL(i)}
                        placeholder="blur"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl block mx-auto"
                      />
                      <div>
                        <Text weight="semibold">{item.title}</Text>
                        <Text weight="semibold">{item.discount}</Text>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSpecialPrice;
