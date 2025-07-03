import React from 'react';
import { Button } from '@repo/ui/components/button';
import { HeartIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface AddToWishlistProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        'rounded-full size-8 border border-border hover:shadow-2 absolute top-2 right-2 translate-y-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0 z-10 max-xl:touch:opacity-100 max-xl:touch:translate-y-0',
        className,
      )}
      {...props}
    >
      <HeartIcon />
    </Button>
  );
};

export default AddToWishlist;
