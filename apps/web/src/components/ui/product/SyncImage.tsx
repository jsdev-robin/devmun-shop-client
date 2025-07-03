import React, { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface SyncImageProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

const SyncImage: React.FC<SyncImageProps> = ({
  className,
  onClick,
  ...props
}) => {
  const [rotation, setRotation] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRotation((prev) => prev + 360);
    onClick?.(e);
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        'rounded-full size-8 border border-border hover:shadow-2 absolute top-2 left-2 translate-y-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0 z-10 max-xl:touch:opacity-100 max-xl:touch:translate-y-0',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <RefreshCw
        className="transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </Button>
  );
};

export default SyncImage;
