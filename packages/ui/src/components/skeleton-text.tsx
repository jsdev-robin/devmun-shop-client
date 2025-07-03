import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const skeletonTextVariants = cva('w-full animate-pulse rounded-md bg-accent', {
  variants: {
    variant: {
      xs: 'h-3',
      sm: 'h-[14px]',
      base: 'h-4',
      lg: 'h-5',
      xl: 'h-6',
      '2xl': 'h-7',
      '3xl': 'h-8',
      '4xl': 'h-9',
      '5xl': 'h-10',
      '6xl': 'h-11',
      '7xl': 'h-12',
      '8xl': 'h-14',
      '9xl': 'h-16',
      body1: 'h-4',
      body2: 'h-[14px]',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
});

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonTextVariants> {
  as?: 'p' | 'span' | 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ variant = 'body1', className, ...rest }) => {
  return <div className={cn(skeletonTextVariants({ variant }), className)} {...rest} />;
};

export default SkeletonText;
