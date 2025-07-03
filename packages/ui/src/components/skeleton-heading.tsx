import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const skeletonVariants = cva('w-full animate-pulse rounded-md bg-accent', {
  variants: {
    as: {
      h1: 'h-16 md:h-20 lg:h-24',
      h2: 'h-12 md:h-16 lg:h-20',
      h3: 'h-10 md:h-12 lg:h-16',
      h4: 'h-8 md:h-10 lg:h-12',
      h5: 'h-6 md:h-8 lg:h-10',
      h6: 'h-5 md:h-6 lg:h-8',
    },
  },
  defaultVariants: {
    as: 'h1',
  },
});

const skeletonDisplayVariants = cva('w-full animate-pulse rounded-md bg-accent', {
  variants: {
    as: {
      h1: 'h-24 sm:h-28 md:h-32 lg:h-36',
      h2: 'h-20 sm:h-24 md:h-28 lg:h-32',
      h3: 'h-16 sm:h-20 md:h-24 lg:h-28',
      h4: 'h-12 sm:h-16 md:h-20 lg:h-24',
      h5: 'h-10 sm:h-12 md:h-16 lg:h-20',
      h6: 'h-8 sm:h-10 md:h-12 lg:h-16',
    },
  },
  defaultVariants: {
    as: 'h1',
  },
});

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'heading' | 'display';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SkeletonHeading: React.FC<SkeletonProps> = ({ type = 'heading', as = 'h1', className, ...rest }) => {
  const variantClasses = type === 'heading' ? skeletonVariants({ as }) : skeletonDisplayVariants({ as });

  return <div className={cn(variantClasses, className)} {...rest} />;
};

export default SkeletonHeading;
