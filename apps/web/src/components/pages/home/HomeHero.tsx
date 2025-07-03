'use client';

import React from 'react';
import { Button } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import Image from 'next/image';
import Link from 'next/link';
import Text from '@repo/ui/components/text';
import { Skeleton } from '@repo/ui/components/skeleton';
import ApiError from '@repo/ui/components/api-error';

const HomeHero = () => {
  const isLoading = false;
  const isError = false;
  return (
    <section>
      <div className="container">
        <div className="lg:grid lg:gap-6 lg:grid-cols-3">
          {isError ? (
            <ApiError />
          ) : isLoading ? (
            <React.Fragment>
              <Skeleton className="rounded-xl h-[500px] sm:h-[400px] lg:col-span-2" />
              <Skeleton className="rounded-xl h-[400px] hidden lg:block lg:col-span-1" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="lg:col-span-2">
                <article className="bg-[#8c89f0] hover:shadow-4 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-backgroundbg-[#8c89f0] rounded-xl relative hover:shadow-4">
                  <Link
                    href="/"
                    className="absolute inset-0 w-full h-full z-10"
                  />
                  <div className="h-full flex flex-col sm:flex-row">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-balance text-center p-6">
                        <Heading
                          as="h2"
                          className="text-gray-900 font-merriweather"
                        >
                          Love can’t be late
                        </Heading>
                        <Text
                          variant="lg"
                          weight="semibold"
                          className="text-gray-900"
                        >
                          Find gifts that ship in 3 days or less.*
                        </Text>
                        <Button className="mt-6 bg-black text-white rounded-full h-11 text-base hidden sm:inline-flex">
                          Shop Valentine’s Day
                        </Button>
                        <Text
                          variant="xs"
                          className="text-gray-900 mt-4 w-4/5 mx-auto"
                        >
                          *Orders processed in up to 3 business days. Actual
                          delivery times will vary.
                        </Text>
                      </div>
                    </div>
                    <div className="grow relative h-[400px] clip-50 sm:clip-100">
                      <Image
                        src="/images/products/04.jpg"
                        alt="hero"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover rounded-xl"
                        priority
                      />
                      <Button className="mt-6 bg-black text-white rounded-full h-11 text-base absolute bottom-6 left-1/2 -translate-x-1/2 sm:hidden">
                        Shop Valentine’s Day
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
              <div className="hidden lg:block lg:col-span-1">
                <article className="overflow-hidden transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background rounded-xl bg-transparent p-0 gap-0 relative flex flex-col justify-end bg-[linear-gradient(#0e0e0e00_48%,#0e0e0eab_100%)] h-full hover:shadow-4">
                  <Link
                    href="/ecommerce"
                    className="absolute inset-0 w-full h-full z-10"
                  />
                  <Image
                    src="/images/products/05.jpg"
                    alt="hero"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-xl -z-10"
                    priority
                  />
                  <div className="absolute left-6 bottom-6 w-full">
                    <Heading as="h5" className="text-white">
                      Home Decor
                    </Heading>
                    <Text weight="bold" className="text-white">
                      Shop now
                    </Text>
                  </div>
                </article>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
