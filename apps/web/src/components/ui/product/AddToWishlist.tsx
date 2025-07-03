import React from 'react';
import { HeartIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { Fab } from '@repo/ui/components/fab';

const AddToWishlist = ({ className }: { className?: string }) => {
  return (
    <Fab
      variant="secondary"
      className={cn(
        'absolute top-2 right-2 translate-y-4 opacity-0 transition-all hover:shadow-4 group-hover:opacity-100 group-hover:shadow-2 group-hover:translate-y-0 z-10 max-xl:touch:opacity-100 max-xl:touch:translate-y-0',
        className,
      )}
    >
      <HeartIcon />
    </Fab>
  );
};

export default AddToWishlist;
